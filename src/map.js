
import template from "babel-template";

//syntax nofn.map(source, target, func)
const build = template(`
	for(
		let TARGET = ARR,
			INDEX = 0,
			VALUE,
			L = TARGET.length,
            RESULT = [];
		(
			VALUE = TARGET[INDEX]
		),
		INDEX < L;
		INDEX++
	) ASSIGNEE.push(BODY);

`);

export default function map({path, types: t}) {
	let [arrArg, assigneeArg, callbackArg] = path.node.arguments;
	let [valueArg, indexArg] = callbackArg.params;
	const callbackBody = callbackArg.body.body;
	
	let resultId = path.scope.generateUidIdentifier("result");
	
	/* super dirty hach which get rids of return when using arrow function without body */
	if(callbackBody.length === 1 && !callbackBody[0].loc && callbackBody[0].type === 'ReturnStatement') {
		callbackBody[0] = callbackBody[0].argument;
	}

 	return {
		build,
		nodes: {
			BODY: callbackArg.body,
			ARR: arrArg,
			ASSIGNEE: assigneeArg,
			INDEX: indexArg || path.scope.generateUidIdentifier('index'),
			VALUE: valueArg || path.scope.generateUidIdentifier('value')
		},
		vars: ['TARGET', 'L']
	};
};
