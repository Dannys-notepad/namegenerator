//const db = require('../data/names.db.json')

const shuffle = (names) => {
  let name
  let nameArray = []
  
  let randomize = () => { 
    let rand = Math.floor(Math.random() * names.length)
    return rand
  }

  for(let i = 0; i < names.length * 100; i++){
    name = names[randomize()]
    if(!nameArray.includes(name)){
      nameArray.push(name)
    }
  }
  return nameArray
}

const generateMaleNames = (names, numberOfNames, format) => {
  let n = names
  let result = []
  for(let i = 0; i < numberOfNames; i++){
    if(format === 'sml'){
      result.push(`${n[i]} ${n[++i]} ${n[i+2]}`)
    }else{
      result.push(`${n[i]} ${n[++i]}`)
    }
  }
  return result
}

const generateFemaleNames = (names, names1, numberOfNames, format) => {
  let n = names
  let result = []
  for(let i = 0; i < numberOfNames; i++){
    if(format === 'sml'){
      result.push(`${n[i]} ${names1[i]} ${n[i+2]}`)
    }else{
      result.push(`${names1[i]} ${n[i]}`)
    }
  }
  return result
}

module.exports = {
  shuffle,
  generateMaleNames,
  generateFemaleNames
}