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
			CallExpression: {
				exit(path) {
					 let {object, property} = path.node.callee;

						if(object && property && object.name === 'nofn' && transformers[property.name]) {
							let {vars, nodes, build} = transformers[property.name]({path, types: t});

							for(let v of vars) {
								nodes[v] = path.scope.generateUidIdentifier(v.toLowerCase());
							}

							let loop = build(nodes);

							switch(path.parentPath.type) {
								case 'CallExpression':
									let _path = path;
									 while(_path.parentPath.type != 'BlockStatement' && _path.parentPath.type != 'Program') {
										_path = _path.parentPath;
									 }

									_path.insertBefore(loop);

									path.replaceWith(nodes.RESULT || t.identifier('undefined'));

									break;
								case 'AssignmentExpression':
									path.parentPath.insertBefore(loop);
									path.replaceWith(nodes.RESULT || t.identifier('undefined'));
									break;
								case 'VariableDeclarator':
									path.parentPath.parentPath.insertBefore(loop);
									path.replaceWith(nodes.RESULT || t.identifier('undefined'));
									break;
								default:
									path.insertAfter(loop);
									path.remove();
							}
						}
				}
			}

		}
	};
};
