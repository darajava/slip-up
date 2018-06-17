var fs = require('fs');

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

let coin1 = [];
let coin2 = [];
let bomb1 = [];
let bomb2 = [];

function valuesOf(str, char) {
  let result = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      result.push(i);
    }
  }

  return result;
}

function func(data) {
  if (data.indexOf('//') !== -1) return;
  
  coin1.push(valuesOf(data.split('|')[0], 'x'));
  coin2.push(valuesOf(data.split('|')[1], 'x'));
  bomb1.push(valuesOf(data.split('|')[0], 'c'));
  bomb2.push(valuesOf(data.split('|')[1], 'c'));
}

var input = fs.createReadStream('levelmap');
readLines(input, func);
setTimeout(() => {
  console.log('this.coins1 = ' + JSON.stringify(coin1.reverse()) + ';');  
  console.log('this.coins2 = ' + JSON.stringify(coin2.reverse()) + ';');  
  console.log('this.bombs1 = ' + JSON.stringify(bomb1.reverse()) + ';');  
  console.log('this.bombs2 = ' + JSON.stringify(bomb2.reverse()) + ';');  
}, 500);
