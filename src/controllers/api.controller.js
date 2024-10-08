const db = require('../data/names.db.json')
const { shuffle, generateMaleNames, generateFemaleNames } = require('../utils/generateNames.js')
const { xmlResponse, txtResponse } = require('../utils/resType.js')


const generate = async (req, res) => {
  let query = await req.query
  let type = 'application/json'
  let response
  let statusCode = 200
  
  let maleNames = shuffle(db[0].maleNames)
  let femaleNames = shuffle(db[0].femaleNames)
  
  if(query.mode === 'auto'){
    response = {maleNames: generateMaleNames(maleNames, 10, 'fl'), femaleNames: generateFemaleNames(maleNames, femaleNames, 5, 'fl')}
  }else if(query.mode === 'custom'){
    let limit, format, restype, gender
    let generatedNames
    
    if(query.limit !== undefined && parseInt(query.limit)){
      limit = +query.limit
      if(limit > 100 || limit < 1){
        response = {msg: 'Limit can not be greater than 100 or lesser than 1'}
        statusCode = 400
      }
    }else{
      response = {msg: 'the limit parameter takes only interger values and must be defined, check API documentation for more info'}
      statusCode = 400
    }
    
    if(query.format !== undefined && !parseInt(format)){
      format = query.format
      if(format !== 'fl' && format !== 'sml'){
        response = {msg: 'name format can not be set to other options other than fl or sml'}
        statusCode = 400
      }
    }else{
      response = {msg: 'the format parameter takes only string values and must be defined, check API documentation for more info'}
      statusCode = 400
    }
    
    if(query.gender !== undefined && !parseInt(query.gender)){
      gender = query.gender
      if(gender === 'male'){
        generatedNames = generateMaleNames(maleNames, limit*2, format)
      }else if(gender === 'female'){
        generatedNames = generateFemaleNames(maleNames, femaleNames, limit, format)
      }else if(gender === 'both'){
        generatedNames = {maleNames: generateMaleNames(maleNames, limit*2, format), femaleNames: generateFemaleNames(maleNames, femaleNames, limit, format)}
      }else{
        response = {msg: 'gender values can only be set to male, female or both'}
        statusCode = 400
      }
    }else{
      response = {msg: 'the gender parameter takes only string values and must be defined, check API documentation for more info'}
      statusCode = 400
    }
    

    if(query.restype !== undefined && !parseInt(query.restype)){
      restype = query.restype
      if(restype === 'xml'){
        response = xmlResponse(generatedNames, gender)
        type = 'application/xml'
      }else if (restype === 'json'){
        response = {names: generatedNames}
      }else if(restype === 'plaintext'){
        response = txtResponse(generatedNames, gender)
        type = 'text/plain'
      }else{
        response = {msg: 'restype can not be set to other values other than xml, json or plaintext'}
      }
    }else{
      response = {msg: 'the restype parameter takes only string values and must be defined, check API documentation for more info'}
      statusCode = 400
    }
    
  }else{
    response = {msg: 'The option specified is not recognized, the valid options are auto and custom, check the API documentation for more info'}
    statusCode = 400
  }
  res.setHeader('Content-Type', type).status(statusCode).send(response)
}

module.exports = generate
