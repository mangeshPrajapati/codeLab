const { executeJava } = require('./java.js');
const { executePython } = require('./python.js');
const { executeCorCPP } = require('./c_or_cpp.js');
const { executeJavaScript } = require('./javascript.js');


module.exports = {
  executeJava,
  executePython,
  executeCorCPP,
  executeJavaScript
};
