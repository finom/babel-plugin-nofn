import 'better-log/install';

//import generate from 'babel-generator';
import forOwn from './forown';
import assign from './assign';
import forEach from './foreach';
import slice from './slice';
const transformers = {
	forOwn,
	assign,
	forEach,
	slice
};




module.exports = function ({ types: t }) {
	return {
		inherits: require("babel-plugin-transform-es2015-block-scoping"),
		visitor: {
			CallExpression(path) {
				 let {object, property} = path.node.callee;

					if(object && property && object.name === 'nofn' && transformers[property.name]) {
						let {vars, hiddenVars, nodes, build} = transformers[property.name]({path, types: t});

						for(let i in hiddenVars) if(hiddenVars.hasOwnProperty(i)) {
							hiddenVars[i] = path.scope.generateUidIdentifier(hiddenVars[i])
						}

						for(let i in vars) if(vars.hasOwnProperty(i)) {
							vars[i] = typeof vars[i] == 'string' ? t.identifier(vars[i]) : vars[i];
						}

						let data = Object.assign({}, nodes, hiddenVars, vars);

						let loop = build(data);
						switch(path.parentPath.type) {
							case 'CallExpression':
								let _path = path;
								 while(_path.parentPath.type != 'BlockStatement' && _path.parentPath.type != 'Program') {
									_path = _path.parentPath;
								 }

								_path.insertBefore(loop);

								path.replaceWith(data.RESULT || t.identifier('undefined'));

								break;
							case 'AssignmentExpression':
								path.parentPath.insertBefore(loop);
								path.replaceWith(data.RESULT || t.identifier('undefined'));
								break;
							case 'VariableDeclarator':
								path.parentPath.parentPath.insertBefore(loop);
								path.replaceWith(data.RESULT || t.identifier('undefined'));
								break;
							default:
								path.insertAfter(loop);
								path.remove();
						}

						//console.log(declaration);
						/*if(path.parent.type === 'CallExpression') {console.log('voila');
							//console.log(declaration.parent);
							let index = path.parent.arguments.indexOf(path.node);//console.log(path.parent);
							path.parent.arguments[index] = declaration.parentPath.scope.generateUidIdentifier('result');
						}*/
					}
			}
		}
	};
};
