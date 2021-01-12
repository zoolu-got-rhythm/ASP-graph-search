const { spawn, fork } = require('child_process');

var myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

// expected input data format shape 2d arr argument = [a,b,c],[d,e,f],[g,h,i] x*x rows pref or x*y rows should work aswell
let inputDataFormat = myArgs[0]; 
console.log(inputDataFormat)
let rows = inputDataFormat.split(/],\s?/); 
rows = rows.map((rowArr) => {
    let row = []; 
    for (const capturedGroupInfoArr of rowArr.matchAll(/([a-z]\d?)/g)){
        let letter = capturedGroupInfoArr[1]; 
        row.push(letter);
    }
    return row; 
}); 

let getNeighbouringLetterNodeEdgesFrom2dArr = (specificLetterIn2dArr, LettersArr2d) => {
    // rowI =  get index of row of letter
    // colI = get index of element in row of letter
    let rowI, colI; 
    for(let i = 0; i < LettersArr2d.length; i++){
        for(let j = 0; j < LettersArr2d[i].length; j++){
            if(LettersArr2d[i][j] === specificLetterIn2dArr){
                rowI = j; 
                colI = i; 
                break; 
            }
        }

        if(rowI)
            break; 
    }

    const rowStartI = rowI - 1 >= 0 ? rowI - 1 : rowI; 
    const rowEndI = rowI + 1 < LettersArr2d.length  ? rowI + 1 : rowI; 

    const columnStartI = colI - 1 >= 0 ? colI - 1 : colI; 
    const columnEndI = colI + 1 < LettersArr2d.length  ? colI + 1 : colI; 

    let neighbouringLetterNodes = []
    for(let i = rowStartI; i <= rowEndI; i++){
        for(let j = columnStartI; j <= columnEndI; j++){
            if(LettersArr2d[i][j] !== specificLetterIn2dArr)
                neighbouringLetterNodes.push(LettersArr2d[i][j]); 
        }
    }

    return neighbouringLetterNodes.map((neighbouringLetterNode) => {
        return "edge(" + specificLetterIn2dArr + "," + neighbouringLetterNode + ")"; 
    }); 
}

let allLetterNodesFlattendArr = rows.flat(); 
// console.log(allLetterNodesFlattendArr); 
// console.log(rows); 


let allLetterNodeFactsAsString = ""; 
allLetterNodesFlattendArr.forEach((letterNode) => {
    let nodeFactWithFullStop = "node(" + letterNode + ")" + ".\n"; 
    allLetterNodeFactsAsString += nodeFactWithFullStop; 
}); 

console.log(allLetterNodeFactsAsString); 

const allPossibleEdges = 
    allLetterNodesFlattendArr.map(letterNode => getNeighbouringLetterNodeEdgesFrom2dArr(letterNode, rows)).flat();

let allPossibleEdgesAsString = ""; 
allPossibleEdges.forEach((edgeFact) => {
    let edgeFactWithFullStop = edgeFact + ".\n"; 
    allPossibleEdgesAsString += edgeFactWithFullStop; 
});     
// console.log(getNeighbouringLetterNodeEdgesFrom2dArr("a", rows)); 
console.log(allPossibleEdgesAsString); 


// this function is written in a combination of old and new js syntax
function getTravelCostASPFactsArr(nOfNodes){
    return (function generateTravelLengthAndCost(x,y,travelLength){
        if(x==travelLength){
            return [`travel_cost(${x},${y}).`]; 
        }else{
            return [`travel_cost(${x},${y}).`].concat(generateTravelLengthAndCost(x+1, x+y+1, travelLength));
        } 
    }(1,1,nOfNodes)); 
}




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

