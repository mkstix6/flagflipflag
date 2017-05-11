'use strict'

// import the data
import countries from './flagdata.js'

// set some constants
const IMAGESDIR = '/images/flags/'

// Factory function to create individual flag objects
const makeFlag = (x) => {
  let colors = x.colors
  let name = x.name
  let image = x.image
  let flagMarkup
  return {
    get flagMarkup () {
      return `<div class="flag">
      <div class="flag__name">${name}</div>
      <img class="flag__image" width="20" src="${IMAGESDIR}${image}">
      <div class="flag__colors">
        ${colors.reduce((prev, color) => `${prev}<div class="flag__color colorswatch" style="background-color: ${color}"></div>`, '')}
      </div>
    </div>`
    }
  }
}

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
