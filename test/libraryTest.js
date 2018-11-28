let assert = require('assert');

let {
  getNeighbour,
  getHorizontalNeighbours,
  getVerticalNeighbours,
  getAllNeighbours,
  countAliveNeighboursOfCell,
  isAlive,

  repeat,
  createBoard,
  joinWithPipes,
  generateDeads,
  toggleState,
  fillBoard,
  daysIteration
} = require('../src/library.js');

describe('repeat', function() {

  it('should work for zero input', function() {
    assert.equal(repeat('*', 0), '');
  });

  it('should work for positive integers', function() {
    assert.equal(repeat('*', 4), '****');
    assert.equal(repeat('*', 1), '*');
  });

});


describe('generateDeads', function() {

  it('should work for array of length 0', function() {
    assert.deepEqual(generateDeads(0), []);
  });

  it('should work for positive numbers', function() {
    assert.deepEqual(generateDeads(1), [0]);
    assert.deepEqual(generateDeads(3), [0, 0, 0]);
  });

});

describe('fillBoard', function() {

  it('should work for array of length 0', function() {
    assert.deepEqual(fillBoard(0), []);
  });

  it('should work for length as positive number', function() {
    assert.deepEqual(fillBoard(1), [ [0] ]);
    assert.deepEqual(fillBoard(3), [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0] ]);
  });

});

describe('joinWithPipes', function() {

  it('should return empty array for empty array', function() {
    assert.deepEqual(joinWithPipes([]), []);

  });

  it('should add pipes to the string', function() {
    assert.deepEqual(joinWithPipes([0]), ["|", " 0 |"]);
    assert.deepEqual(joinWithPipes([0, 0]), ["|", " 0 |", " 0 |"]);
  });

});

describe('createBoard', function() {

  it('should return empty array for empty array', function() {
    assert.deepEqual(createBoard([]), []);
  });

  it('should return empty array for array of empty arrays', function() {
    assert.deepEqual(createBoard([ [] ]), []);
    assert.deepEqual(createBoard([ [],[] ]), []);
  });
   
});

describe('getNeighbour', function() {

  it('should return empty array for empty array', function() {
    assert.deepEqual(getNeighbour([]), []);
  });

  it('should return one neighbour for edge index', function() {
    assert.deepEqual(getNeighbour([1, 2, 3, 4], 0), [2]);
    assert.deepEqual(getNeighbour([1, 2, 3, 4], 3), [3]);
  });

  it('should return empty array for invalid index', function() {
    assert.deepEqual(getNeighbour([1, 2, 3, 4], 7), []);
    assert.deepEqual(getNeighbour([1, 2, 3, 4], -1), []);
  });

  it('should return two neighbours for non-edge index', function() {
    assert.deepEqual(getNeighbour([1, 2, 3, 4], 2), [2, 4]);
  });

});

const arrayOfArray = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9] ];

const deadAndAlives = [
  [1,0,1],
  [0,0,1],
  [0,0,1] ];

describe('getHorizontalNeighbours', function() {

  it('should work for edge indexes', function() {
    assert.deepEqual(getHorizontalNeighbours(arrayOfArray, 0, 0), [2]);
    assert.deepEqual(getHorizontalNeighbours(arrayOfArray, 2, 2), [8]);
  });

  it('should work for non-edge indexes', function() {
    assert.deepEqual(getHorizontalNeighbours(arrayOfArray, 0, 1), [1, 3]);
    assert.deepEqual(getHorizontalNeighbours(arrayOfArray, 1, 1), [4, 6]);
  });

});

describe('getVerticalNeighbours', function() {

  it('should return an empty array for an empty array', function() {
    assert.deepEqual(getVerticalNeighbours([], 0, 0), []);
  });

  it('should return one neighbour for edge index', function() {
    assert.deepEqual(getVerticalNeighbours(arrayOfArray, 0, 0), [4]);
    assert.deepEqual(getVerticalNeighbours(arrayOfArray, 0, 1), [5]);
    assert.deepEqual(getVerticalNeighbours(arrayOfArray, 2, 0), [4]);
    assert.deepEqual(getVerticalNeighbours(arrayOfArray, 2, 2), [6]);
  });

  it('should return two neighbours for non-edge index', function() {
    assert.deepEqual(getVerticalNeighbours(arrayOfArray, 1, 1), [2, 8]);
  });

});

describe('getAllNeighbours', function() {

  it('should return empty array for empty array', function() {
    assert.deepEqual(getAllNeighbours([], 0, 0), []);
    assert.deepEqual(getAllNeighbours([], 1, 1), []);
  });

  it('should return empty array for array of one element', function(){
    assert.deepEqual(getAllNeighbours([[1]], 0, 0), []);
  });

  it('should return 3 neighbours for corner cells', function() {
    assert.deepEqual(getAllNeighbours(arrayOfArray, 0, 0), [2, 4, 5]);
    assert.deepEqual(getAllNeighbours(arrayOfArray, 2, 0), [4, 5, 8]);
    assert.deepEqual(getAllNeighbours(arrayOfArray, 2, 2), [5, 6, 8]);
    assert.deepEqual(getAllNeighbours(arrayOfArray, 0, 2), [2, 5, 6]);
    assert.deepEqual(getAllNeighbours([ [0,0], [0,0] ], 0, 0), [0, 0, 0]);
    assert.deepEqual(getAllNeighbours([ [0,1], [0,1] ], 0, 0), [0, 1, 1]);

  });

  it('should return 5 neighbours for cells in sides', function() {
    assert.deepEqual(getAllNeighbours(arrayOfArray, 0, 1), [1, 3, 4, 5, 6]);
    assert.deepEqual(getAllNeighbours(arrayOfArray, 1, 0), [1, 2, 5, 7, 8]);
    assert.deepEqual(getAllNeighbours(arrayOfArray, 1, 2), [2, 3, 5, 8, 9]);
    assert.deepEqual(getAllNeighbours(arrayOfArray, 2, 1), [4, 5, 6, 7, 9]);
  });

  it('should return all 8 neighbours for cells in middle', function() {
    assert.deepEqual(getAllNeighbours(arrayOfArray, 1, 1), [1, 2, 3, 4, 6, 7, 8, 9]);
  });


});

describe('countAliveNeighboursOfCell', function(){

  it('should return 0 for an empty array', function(){
    assert.equal(countAliveNeighboursOfCell([], 0,0), 0);
  });

  it('should return 0 for an array containing only falsy values', function(){
    assert.equal(countAliveNeighboursOfCell([0], 0,0), 0);
    assert.equal(countAliveNeighboursOfCell([""], 0,0), 0);
    assert.equal(countAliveNeighboursOfCell([false], 0,0), 0);
    assert.equal(countAliveNeighboursOfCell([0,0,0], 0,0), 0);
  });

  it('should return 1 if have one alive neighbour', function(){
    assert.equal(countAliveNeighboursOfCell([ [0,1], [0,0] ], 0,0), 1);
    assert.equal(countAliveNeighboursOfCell([ [0,0], [1,0] ], 0,0), 1);
  });

  it('should return the number of alive members', function(){
    assert.equal(countAliveNeighboursOfCell(deadAndAlives , 1,1), 4);
    assert.equal(countAliveNeighboursOfCell(deadAndAlives , 1,2), 2);
  });

});

describe('isAlive', function(){

  it('should return 0 if alive neighbour is less than 2', function(){
    assert.deepEqual(isAlive(1,1), 0);
    assert.deepEqual(isAlive(1,0), 0);
  });
 
  it('should return 0 if alive neighbour is greater than 3', function(){
    assert.deepEqual(isAlive(4, 1), 0);
    assert.deepEqual(isAlive(4, 0), 0);
  });
  
  it('should return 1 if alive neighbour is 2 and current state is 1', function(){
    assert.deepEqual(isAlive(2,1), 1);
    assert.deepEqual(isAlive(2,0), 0);
  });

  it('should return 1 if alive neighbour is 3, at any state', function(){
    assert.deepEqual(isAlive(3,1), 1);
    assert.deepEqual(isAlive(3,0), 1);
  });

});

describe('toggleState', function(){

  it('should toggle the state of that cordinate ', function(){
    assert.deepEqual(toggleState([[0]],0,0), [[1]]);
    assert.deepEqual(toggleState([[1]],0,0), [[0]]);
    assert.deepEqual(toggleState( [[1], [0]], 0, 0), [[0], [0]]);
  });

});

describe('daysIteration',function(){
  it('should return empty array for empty array',function(){
    assert.deepEqual(daysIteration([]),[]);
    assert.deepEqual(daysIteration([[]]),[[]]);
  });
  it('should return 0 for single dead cell',function(){
    assert.deepEqual(daysIteration([[0]]),[[0]]);
  });
  it('should return 0 for a single alive cell',function(){
    assert.deepEqual(daysIteration([[1]]),[[0]]);
  });
  it('should return array for possible iteration',function(){
    assert.deepEqual(daysIteration([[1,0],[1,1],[1,0],[1,1]]),[[1,1],[1,1],[0,0],[1,1]]);
  });
  it('should return same state for still life',function(){
    assert.deepEqual(daysIteration([[1,1,0],[1,1,0],[0,0,0]]),[[1,1,0],[1,1,0],[0,0,0]]);
    assert.deepEqual(daysIteration([[0,1,0],[0,1,0],[0,1,0]]),[[0,0,0],[1,1,1],[0,0,0]]);
  });

});


