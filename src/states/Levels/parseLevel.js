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

let game1 = [];
let game2 = [];

function func(data) {
  game1.push(data.split('|')[0].indexOf('x'));
  game2.push(data.split('|')[1].indexOf('x'));
}

var input = fs.createReadStream('levelmap');
readLines(input, func);
setTimeout(() => {
  console.log('this.coins1 = ' + JSON.stringify(game1.reverse()) + ';');  
  console.log('this.coins2 = ' + JSON.stringify(game2.reverse()) + ';');  
}, 100);
