import template from "babel-template";

const build = template(`
	let RESULT = OBJECT1;
	for(
		let SOURCE = OBJECT2,
			KEYS = Object.keys(SOURCE),
			L = KEYS.length,
			I = 0,
			KEY;
		I < L;
		I++
	) {
		KEY = KEYS[I];
		RESULT[KEY] = SOURCE[KEY];
	}
`);

export default function each({path, types: t}) { // t.thisExpression()
	let [object1Arg, object2Arg] = path.node.arguments;
	return {
		build,
		nodes: {
			//BODY: [...callbackArg.body.body],
			OBJECT1: object1Arg || t.objectExpression([]),
			OBJECT2: object2Arg || t.objectExpression([])
		},
		vars: {},
		hiddenVars: {
			KEYS: 'keys',
			KEY: 'key',
			I: 'i',
			L: 'l',
			RESULT: 'result',
			SOURCE: 'source',
		}
	};
};
