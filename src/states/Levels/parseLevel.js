var fs = require('fs');

function readLines(input, func) {
  var remaining = '';

  var index;
  var lineCount = 0;

  input.on('data', function(data) {
    remaining += data;
    let totalLines = ((remaining.match(/\n[^/]/g) || []).length);
    index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      index = remaining.indexOf('\n');
      if (!func(line, lineCount++, totalLines)) {
        lineCount--;
      }
    }
  });

  input.on('end', function() {
    // if (remaining.length > 0) {
    //   func(remaining, index);
    // }
  });
}

let items = [];

function valuesOf(str, char) {
  let result = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      result.push(i);
    }
  }

  return result;
}

function func(data, index, totalLines) {
  data = data.trim();
  
  if (data.indexOf('/') !== -1) return false;
  console.log(data, index);
  for (let c = 0; c < data.length; c++) {
    if (data[c] === '-' || data[c] === '|') continue;

    items.push({
      x: `${c}`,
      y: `${totalLines - index}`,
      type: data[c],
    });
  }

  return true;
}

var input = fs.createReadStream('levelmap');

readLines(input, func);

setTimeout(() => {
  fs.writeFileSync('./level.json', JSON.stringify(items.reverse()));
}, 500);
