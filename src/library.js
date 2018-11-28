/* ------ LOGIC ------ */

const getNeighbour = function(inputArray, index) {
  let neighbours = [];
  if (index < 0) { return neighbours }
  neighbours.push(inputArray[index - 1]);
  neighbours.push(inputArray[index + 1]);

  return neighbours.filter((x) => x!==undefined);
}

const getHorizontalNeighbours = function(inputArray, arrayIndex, subArrayIndex) {
  return getNeighbour(inputArray[arrayIndex], subArrayIndex);
}

const getVerticalNeighbours = function(inputArray, arrayIndex, subArrayIndex) {
  let neighbours = [];
  let topNeighbours = inputArray[arrayIndex - 1];
  let bottomNeighbours = inputArray[arrayIndex + 1];

  if (inputArray[0] === undefined) { return neighbours }
  if (topNeighbours !== undefined) {
    neighbours.push(topNeighbours[subArrayIndex]);
  }

  if (bottomNeighbours !== undefined) {
    neighbours.push(bottomNeighbours[subArrayIndex]);
  }

  return neighbours;
}

const getAllNeighbours = function(inputArray, arrayIndex, subArrayIndex) {
  let neighbours = [];
  if (arrayIndex < 0 || subArrayIndex < 0 || inputArray.length < 2) {
    return neighbours;
  }

  // horizontal neighbours
  neighbours.push(getNeighbour(inputArray[arrayIndex], subArrayIndex)); 

  // top diagonal neighbours
  if (inputArray[arrayIndex - 1] !== undefined) {
    neighbours.push(getNeighbour(inputArray[arrayIndex - 1], subArrayIndex)); 
  }

  // bottom diagonal neighbours
  if (inputArray[arrayIndex + 1] !== undefined) {
    neighbours.push(getNeighbour(inputArray[arrayIndex + 1], subArrayIndex)); 
  }

  //vertical neighbours
  neighbours.push(getVerticalNeighbours(inputArray, arrayIndex, subArrayIndex));
  return neighbours.toString().split(',').map(x=>+x).sort();
}

const countAliveNeighboursOfCell = function(inputArray, arrayIndex, subArrayIndex){
  return getAllNeighbours(inputArray, arrayIndex, subArrayIndex).filter(x=> x).length;
}

const isAlive = function(aliveNeighbours, currentState) {
  if(aliveNeighbours < 2 || aliveNeighbours > 3) { return 0 }
  if(aliveNeighbours === 3) { return 1 }
  return currentState;
}

const daysIteration = function(inputArray) {
  let result = inputArray.map(x=>x.slice());

  inputArray.map( (elemOfArray, count)=>{
      inputArray[count].map( (elem, index)=>{

          let totalAlive = countAliveNeighboursOfCell(inputArray, count, index);
          let state =  isAlive(totalAlive, inputArray[count][index]);
          result[count][index] = state;

          });
      });

  return result;
}

/* ------- VISUAL -------- */

const repeat = function(symbol, length) {
  return new Array(length).fill(symbol).join('');
}

const generateDeads = function(length) {
  return new Array(length).fill(0);
}

const generateLine = (length) => repeat("-", length);

const joinWithPipes = function(input) {
  let output = [];
  if (input[0] !== undefined) { output.push('|') }

  for (value of input) {
    output.push(" " + value + " |");
  }

  return output;
}

const createBoard = function(data) {
  let result = [];
  let lengthOfData = data.length;
  if (lengthOfData === 0 || data[0].length === 0) { return result }
  result.push(generateLine(lengthOfData * 4 + 1));

  for (let index = 0; index < lengthOfData; index++) {
    result.push(joinWithPipes(data[index]).join(""));
    result.push(generateLine(lengthOfData * 4 + 1));
  }

  return result.join("\n");
}

const fillBoard = function(length) {
  let board = [];
  for (let count = 0; count < length; count++) {
    board.push(generateDeads(length));
  }
  return board;
}

const toggleState = function(inputArray, arrayIndex, subArrayIndex) {
  let result = inputArray.slice();
  let currentState = result[arrayIndex][subArrayIndex];
  currentState = 1 - currentState;
  result[arrayIndex][subArrayIndex] = currentState;
  return result;
}

/* ------- EXPORTS ------- */

module.exports = {
  repeat,
  createBoard,
  joinWithPipes,
  generateDeads,
  fillBoard,
  getNeighbour,
  getHorizontalNeighbours,
  getVerticalNeighbours,
  getAllNeighbours,
  countAliveNeighboursOfCell,
  isAlive,
  toggleState,
  daysIteration
};
