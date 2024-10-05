
const xmlResponse = (names, gender) => { 
  let xml, xmLM, xmLF
  if(gender !== 'both'){
    xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <names>
        ${names.map((n) => `
          <name>
            <fullname>${n}</fullname>
          </name>
        `).join('')}
      </names>
    `
  }else{
    let nameArray = [names]
    let nam = nameArray.forEach((n) => {
      xmLM += `
        <fullname>${n.maleNames}</fullname> \n
      `
      xmLF += `
        <fullname>${n.femaleNames}</fullname> \n
      `
    })
    xml = `
      <?xml version="1.0" encoding="UTF-8"?>
      <names>
        <maleNames>
          ${xmLM}
        </maleNames>
        <femaleNames>
          ${xmLF}
        </femaleNames>
      </names>
    `
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