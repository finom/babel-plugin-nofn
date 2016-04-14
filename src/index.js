import 'better-log/install';
import template from "babel-template";
import generate from 'babel-generator';

/*
for(var keys = Object.keys(object), i = 0, l = keys.length, key, value; (key = keys[i],value = object[key]), i < l; i++) {
  doSomething(value, key);
}*/
/*
keys, i, l
key, value, object
*/

const build = template(`
	for(
		let VAR_KEYS = Object.keys(VAR_OBJECT),
			VAR_I = 0,
			VAR_L = VAR_KEYS.length,
			VAR_KEY,
			VAR_VALUE;

		(	VAR_KEY = VAR_KEYS[VAR_I],
			VAR_VALUE = VAR_OBJECT[VAR_KEY]
		),
		VAR_I < VAR_L;

		VAR_I++
	) {}
`);


module.exports = function ({ types: t }) {
	return {
		inherits: require("babel-plugin-transform-es2015-block-scoping"),
		visitor: {
			CallExpression(path) {
				 let declaration = path.get("declaration"),
				 	{object, property} = path.node.callee;

					if(object && property && object.name === 'nofn' && property.name == 'each') {
						let [objectArg, callbackArg] = path.node.arguments;

						let [valueArg, keyArg] = callbackArg.params;

						let data = {
							hidden: {
								VAR_KEYS: 'keys',
								VAR_I: 'i',
								VAR_L: 'l',
							},
							normal: {
								VAR_KEY: keyArg.name,
								VAR_VALUE: valueArg.name,
								VAR_OBJECT: objectArg.name,
								BODY: [callbackArg.body.body[0]]//t.blockStatement(callbackArg.body.body)
							}
						};

						for(let i in data.hidden) if(data.hidden.hasOwnProperty(i)) {
							data.hidden[i] = path.scope.generateUidIdentifier(data.hidden[i])
						}

						for(let i in data.normal) if(data.normal.hasOwnProperty(i)) {
							data.normal[i] = t.identifier(data.normal[i])
						}

						let loop = build(Object.assign({}, data.hidden, data.normal));
						loop.body.body = [...callbackArg.body.body];
						path.insertAfter(loop);
						path.remove();
					}


			}
		}
	};
};
