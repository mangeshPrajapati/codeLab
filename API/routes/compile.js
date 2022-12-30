const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();
//To accept data in json format
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Code compile
const { createCodeFile } = require("../createCodeFile"),
  { removeCodeFile } = require("../removeCodeFile"),
  {
    executeJava,
    executePython,
    executeCorCPP,
    executeJavaScript,
    executeGo,
    executeCsharp,
  } = require("../executeCode");

// Total languages supported
const supportedLanguages = ["java", "cpp", "py", "c", "js", "go", "cs"];
const compilerVersions = [
  "11.0.15",
  "11.2.0",
  "3.11.0",
  "11.2.0",
  "16.13.2",
  "1.18.3",
  "6.12.0.140",
];

app.post("/compile", async (req, res) => {
  let output = "";
  var language = req.body.language;
  const code = req.body.code;
  const input = req.body.input;
  if(language == "python")
  {
    language = 'py'
  }
  else if(language == "javascript")
  {
    language = "js"
  }


  if (code === undefined || code.trim() === "")
    output = "No code specified to execute.";
  if (!supportedLanguages.includes(language))
    output = `Language ${language} is not supported. Please refer to docs to know the supported languages.`;

  if (output === "") {
    const codeFile = createCodeFile(language, code);

    console.log(codeFile, code, input);

    switch (language) {
      case "java":
        output = await executeJava(codeFile, input);
        break;
      case "py":
        output = await executePython(codeFile, input);
        break;
      case "cpp":
        output = await executeCorCPP(codeFile, input);
        break;
      case "c":
        output = await executeCorCPP(codeFile, input);
        break;
      case "js":
        output = await executeJavaScript(codeFile, input);
        break;
      case "go":
        output = await executeGo(codeFile, input);
        break;
      case "cs":
        output = await executeCsharp(codeFile, input);
        break;
    }

    removeCodeFile(codeFile.split(".")[0], language);
  }
  console.log(output)
  res.send(output);

});

module.exports = app; 