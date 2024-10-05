const js2xmlparser = require('js2xmlparser')

const xmlResponse = (names, gender) => { 
  let xml
  if(gender !== 'both'){
    xml = js2xmlparser.parse('names', {
      "male-names":{
        name: names
      }
    },{
      declaration:{
        include: true,
        encoding: 'UTF-8'
      },
      format: {
        doubleQuotes: true,
        indent: ' '
      }
    })
  }else{
    xml = js2xmlparser.parse('names', {
      "male-names":{
        name: names.maleNames
      },
      "female-names":{
        name: names.femaleNames
      }
    },{
      declaration:{
        include: true,
        encoding: 'UTF-8'
      },
      format: {
        doubleQuotes: true,
        indent: ' '
      }
    })
  }
  return xml
}

let currencyTxt = (cur) => {
  const curren = cur.map((c) => {
    return `${c.id} : ${c.name} : ${c.abbrev} :${c.symbol} : ${c.imgurl}`
  }).join('\n')
}

module.exports = {
  xmlResponse
}