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

	return {
		build,
		nodes: {
			BODY: [...callbackArg.body.body],
			ARR: arrArg,
			INDEX: indexArg || path.scope.generateUidIdentifier('index'),
			VALUE: valueArg || path.scope.generateUidIdentifier('value')
		},
		vars: ['TARGET', 'L']
	};
};
