const repeat = function(symbol,length) {
  return new Array(length).fill(symbol).join('');
}

const generateLine = (length)=>repeat("-", length);

const createBoard = function(data){
  let result = [];
  let lengthOfData = data.length;
  if(lengthOfData === 0 || data[0].length === 0){
    return result;
  }
  result.push( generateLine(lengthOfData*4+1) );
  for(let index=0; index<lengthOfData; index++) {
    result.push(joinWithPipes(data[index]).join(""));
    result.push( generateLine(lengthOfData*4+1));
  }  
  return result.join("\n");
}

const joinWithPipes = function(input) {
  let output = [];
  if(input[0] !== undefined){
    output.push('|');
  }
  for(value of input) {
    output.push(" " +value + " |");
  } 
  return output;
}

const generateDeads = function(length) {
  return new Array(length).fill('D');
}

const fillBoard = function(length) {
  let board = [];
  for(let count=0; count<length; count++) {
    board.push(generateDeads(length));
  }
  return board;
}



module.exports = {
  repeat,
  createBoard,
  joinWithPipes,
  generateDeads,
  fillBoard,
};
