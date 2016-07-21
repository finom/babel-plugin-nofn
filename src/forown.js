import template from "babel-template";

const build = template(`
	for(
		let TARGET = OBJECT,
			KEYS = Object.keys(TARGET),
			I = 0,
			KEY,
			VALUE,
			L = KEYS.length;
		(
			KEY = KEYS[I],
			VALUE = TARGET[KEY]
		),
		I < L;
		I++
	) BODY;
`);

export default function forOwn({path, types: t}) {
	let [objectArg, callbackArg] = path.node.arguments;
	let [valueArg, keyArg] = callbackArg.params;
	const callbackBody = callbackArg.body.body;


	/* super dirty hach which get rids of return when using arrow function without body */
	if(callbackBody.length === 1 && !callbackBody[0].loc && callbackBody[0].type === 'ReturnStatement') {
		callbackBody[0] = callbackBody[0].argument;
	}
	
	return {
		build,
		nodes: {
			BODY: callbackArg.body,
			OBJECT: objectArg,
			KEY: keyArg || path.scope.generateUidIdentifier('key'),
			VALUE: valueArg || path.scope.generateUidIdentifier('value')
		},
		vars: ['TARGET', 'KEYS', 'I', 'L']
	};
};
