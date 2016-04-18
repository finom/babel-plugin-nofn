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

	return {
		build,
		nodes: {
			BODY: [...callbackArg.body.body],
			OBJECT: objectArg,
			KEY: keyArg || path.scope.generateUidIdentifier('key'),
			VALUE: valueArg || path.scope.generateUidIdentifier('value')
		},
		vars: ['TARGET', 'KEYS', 'I', 'L']
	};
};
