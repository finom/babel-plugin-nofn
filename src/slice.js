import template from "babel-template";

const build = template(`
	let SOURCE = ARR;
	let RESULT = Array(SOURCE.length);
	for(
		let L = SOURCE.length,
			J = 0,
			I = START || 0,
			_END = END || L;
		I < _END;
	) {
		RESULT[J++] = SOURCE[I++];
	}
`);

export default function forOwn({path, types: t}) {
	let [sourceArg, startArg, endArg] = path.node.arguments;

	return {
		build,
		nodes: {
			ARR: sourceArg,
			START: startArg || t.nullLiteral(),
			END: endArg || t.nullLiteral()
		},
		vars: ['I', 'L', 'J', 'RESULT', 'SOURCE', '_END']
	};
};
