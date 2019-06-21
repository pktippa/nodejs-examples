function formula(a, b, callback) {
  if(a == -1) {
    callback(0);
  } else {
    var x = a * b;
    callback(x);
  }
}

function formulaSync(a, b) {
    return new Promise(function(resolve, reject) {
        formula(a, b, function(x) {
            if(x==0) reject(false);
            else  resolve(x);
        })
    })
}

async function test() {
  try {
    var x = await formulaSync(10, 5);
    console.log('10 * 5 = ', x);
    var y = await formulaSync(-1, 5);
    console.log('-1 * 5 = ', y);
  } catch (error) {
    console.log('Error ', error);
  }    
}

test();