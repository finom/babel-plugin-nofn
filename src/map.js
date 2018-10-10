import template from "babel-template";

const build = template(`
	for(
		let TARGET = ARR,
			INDEX = 0,
			VALUE,
			L = TARGET.length,
			RESULT = [],
			FUNC = FUNCEXP;
		(
			VALUE = TARGET[INDEX]
		),
		INDEX < L;
		INDEX++
	) {
		RESULT.push(FUNC(VALUE, INDEX));
	}
`);

export default function map({path, types: t}) {

	let [arrArg, callbackArg] = path.node.arguments;
	let [valueArg, indexArg] = callbackArg.params;
	const callbackBody = callbackArg.body.body;


 	return {
		build,
		nodes: {
			FUNC: path.scope.generateUidIdentifier('func'),
			FUNCEXP: callbackArg,
			ARR: arrArg,
			RESULT: path.scope.generateUidIdentifier('result'),
			INDEX: indexArg || path.scope.generateUidIdentifier('index'),
			VALUE: valueArg || path.scope.generateUidIdentifier('value')
		},
		vars: ['TARGET', 'L']
	};
};
