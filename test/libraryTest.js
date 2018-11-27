let assert = require('assert');
let { repeat,
  createBoard,
  joinWithPipes,
  generateDeads,
  fillBoard } = require('../src/library.js');
describe('repeat',function(){

  it('should work for zero input',function(){
    assert.equal(repeat('*',0),'');
  });

  it('should work for positive integers',function(){
    assert.equal(repeat('*',4),'****');
    assert.equal(repeat('*',1),'*');
  });
});


describe('generateDeads',function(){

  it('should work for array of length 0',function(){
    assert.deepEqual(generateDeads(0),[]);
  });

  it('should work for positive numbers',function(){
    assert.deepEqual(generateDeads(1),['D']);
    assert.deepEqual(generateDeads(3),['D','D','D']);
  });

});

describe('fillBoard',function(){

  it('should work for array of length 0',function(){
    assert.deepEqual(fillBoard(0),[]);
  });
  it('should work for length as positive number',function(){

    assert.deepEqual(fillBoard(1),[['D']]);
    assert.deepEqual(fillBoard(3),[['D','D','D'],['D','D','D'],['D','D','D']]);
  });

});

describe('joinWithPipes',function(){

  it('should return empty array for empty array',function(){
    assert.deepEqual(joinWithPipes([]), []);

  });
  it('should add pipes to the string', function(){
    assert.deepEqual(joinWithPipes(["D"]), ["|", " D |"]);
    assert.deepEqual(joinWithPipes(["D", "D"]), ["|", " D |", " D |"]);
  });
});

describe('createBoard',function(){
  it('should return empty array for empty array',function(){
    assert.deepEqual(createBoard([]), []);
  });
  it('should return same input for array containing undefined' ,function(){
    assert.deepEqual(createBoard([[]]), []);
  });

});
