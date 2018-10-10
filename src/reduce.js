
import template from "babel-template";

const build = template(`
	for(
		let TARGET = ARR,
			INDEX = 1,
			FUNC = FUNCEXP,
			INITIALIZE = INITIALIZE_VALUE,
			VALUE = TARGET[INDEX],
			L = TARGET.length,
			RESULT = INITIALIZE === void 0 ? TARGET[0] : FUNC(INITIALIZE, TARGET[0]);
		(
			VALUE = TARGET[INDEX]
		),
		INDEX < L;
		INDEX++
	) {
		RESULT = FUNC(RESULT, VALUE, INDEX);
	}

`);

export default function reduce({ path, types: t }) {

	let [arrArg, callbackArg, initializeValueArg] = path.node.arguments;
	let [valueArg, indexArg] = callbackArg.params;

	//const callbackBody = callbackArg.body.body;


 	return {
		build,
		nodes: {
			FUNC: path.scope.generateUidIdentifier('func'),
			FUNCEXP: callbackArg,
			ARR: arrArg,
			RESULT: path.scope.generateUidIdentifier('result'),
			INITIALIZE: path.scope.generateUidIdentifier("initialize"),
			INITIALIZE_VALUE: initializeValueArg || t.unaryExpression("void", t.numericLiteral(0)),
			INDEX: indexArg || path.scope.generateUidIdentifier('index'),
			VALUE: valueArg || path.scope.generateUidIdentifier('value')
		},
		vars: ['TARGET', 'L']
	};
};
