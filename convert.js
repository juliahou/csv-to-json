const fs = require('fs')
const path = require('path')

const convert = (file) => {
  if (!file) return console.log("No file specified")
  var csv = fs.readFileSync(file, 'utf8')

  const parse = (str, write) => {
    var json = '[\n'
    var lines = str.split('\n')
    var categories = lines[0].split(',')

    // parse csv string and create json string
    for (i = 1; i < lines.length; i++) {
      if (i != 0) {
        json += ',\n'
      }
      json += '{\n'
      var data = lines[i].split(',')
      for (j = 0; j < categories.length; j++) {
        if (j != 0) {
          json += ',\n'
        }
        json += '"' + categories[j] + '"' + ': ' + '"' + data[j] + '"'
      }
      json += '}'
    }
    write(json)
  }

  parse(csv, (json) => {
    fs.writeFileSync(path.join(__dirname, 'customer-data.json'), json)
  })
}

convert(process.argv[2])
