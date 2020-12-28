const { spawn } = require('child_process');

const nodesTestString = "on(a,1) on(b,2) on(d,3) on(c,4)"; 

const extractWords = (inputStr) => {
    // console.log(inputStr);
    let foundWord = ""; 
    for (const capturedGroupInfoArr of inputStr.matchAll(/on\((\D\d?),\d/g)){
        let letter = capturedGroupInfoArr[1]; 
        foundWord += letter; 
    } 
    return foundWord;
}

// start clingo process (child process?)
const clingo = spawn('clingo', ['./graph-traversal-experiment.lp', 0]);

clingo.stdout.on('data', (data) => {
    // data is an object of some type that represents stdout from child process (clingo)
    // using `` string literal syntax seems to cast/transfer object into string type
    console.log(extractWords(`${data}`)); 
});

clingo.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

clingo.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

