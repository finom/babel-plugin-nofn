import template from "babel-template";

const build = template(`
	for(
		let TARGET = ARR,
			INDEX = 0,
			VALUE,
			L = TARGET.length;
		(
			VALUE = TARGET[INDEX]
		),
		INDEX < L;
		INDEX++
	) BODY;
`);

export default function forEach({path, types: t}) {
	let [arrArg, callbackArg] = path.node.arguments;
	let [valueArg, indexArg] = callbackArg.params;
	const callbackBody = callbackArg.body.body;


	/* super dirty hach which get rids of return when using arrow function without body */
	if(callbackBody.length === 1 && !callbackBody[0].loc && callbackBody[0].type === 'ReturnStatement') {
		callbackBody[0] = callbackBody[0].argument;
	}

 	return {
		build,
		nodes: {
			BODY: callbackArg.body,
			ARR: arrArg,
			INDEX: indexArg || path.scope.generateUidIdentifier('index'),
			VALUE: valueArg || path.scope.generateUidIdentifier('value')
		},
		vars: ['TARGET', 'L']
	};
};
