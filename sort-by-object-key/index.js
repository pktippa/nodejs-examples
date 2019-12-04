const assert = require('assert')
const obj = {
x:0,
  b:2,
  a: 1,
  m: 2
};

const orderObj = (input) => {
  const ordrd= {}; 
  Object.keys(input).sort().forEach(function(key) { 
    ordrd[key]= input[key];
  }); 
  return ordrd;
}

const output = orderObj(obj);
console.log(JSON.stringify(output))
assert.deepEqual(Object.keys(output),['a', 'b', 'm', 'x']);