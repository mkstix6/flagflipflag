'use strict'

// import the data
import countries from './flagdata3.js'

function removeFirstCharacter (hex) {
  return hex.substr(1)
}

// Object from file : flagdata.js
const makeFlag = (x) => {
  let colors = x.colors
  let name = x.name
  let image = x.url
  return {
    get flagMarkup () {
      return `<div class="flag">
      <div class="flag__name">${name}</div>
      <img class="flag__image" width="20" src="${image}">
      <div class="flag__colors">
        ${colors.reduce((prev, color) => {
          let txtcolor
          console.log(parseInt(removeFirstCharacter(color.hex), 16))
          if (parseInt(removeFirstCharacter(color.hex), 16) > 12000000) {
            txtcolor = `black`
          } else {
            txtcolor = `white`
          }
          return `${prev}<div class="flag__color colorswatch" style="padding:0.2em;color:${txtcolor};background-color: ${color.hex};">${color.percent}</div>`
        }, ``
      )}
      </div>
    </div>`
    }
  }
}
// width:${Math.sqrt((color.percent * 100 / Math.PI))}px;height:${Math.sqrt((color.percent * 100 / Math.PI))}px;

// get the json type object into an array of data objects
const countriesArray = Object.values(countries)
// make full objects from the data objects
const flags = countriesArray.map(x => {
  return makeFlag(x)
})
// make a div.flags
let flagsDiv = document.createElement('div')
flagsDiv.classList.add('flags')
// fill div.flags with .flag elements from their objects
flags.map(x => flagsDiv.insertAdjacentHTML('beforeend', x.flagMarkup))
// add all .flags with .flag elements to the DOM
document.body.appendChild(flagsDiv)
