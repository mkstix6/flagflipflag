'use strict'

// import the data
const countries = require('./flagdata3.js')
const Isotope = require('isotope-layout')
const hexToHsl = require('hex-to-hsl')

function removeFirstCharacter (hex) {
  return hex.substr(1)
}

// Object from file : flagdata.js
const makeFlag = (x) => {
  let colors = x.colors
  let name = x.name
  let image = x.url

  colors = colors.map(x => {
    x.hsl = hexToHsl(x.hex)
    x.hue = hexToHsl(x.hex)[0]
    x.light = hexToHsl(x.hex)[2]
    x.huebucket = () => {
      if (x.light > 80) {
        return 'w'
      } else if (x.light < 20) {
        return 'b'
      } else {
        return Math.round(((hexToHsl(x.hex)[0] + 55) % 360) / 60)
      }
    }
    x.huetxtcolor = parseInt(removeFirstCharacter(x.hex), 16) > 12000000 ? 'black' : 'white'
    return x
  })

  return {
    get flagMarkup () {
      return `<div class="flag ${
          colors.reduce((prev, color) => {
            return color.percent > 3 ? `${prev} huebucket${color.huebucket()}` : `${prev}`
          }, ``)
      }">
      <div class="flag__name">${name}</div>
      <img class="flag__image" width="20" src="${image}">
      <div class="flag__colors">
        ${
          colors.reduce((prev, color) => {
            return color.percent > 3 ? `${prev}<div class="flag__color colorswatch huebucket huebucket${color.huebucket()}" data-filter="huebucket${color.huebucket()}" data-category="huebucket${color.huebucket()}" data-huebucket="huebucket${color.huebucket()}" style="padding:0.2em;color:${color.huetxtcolor};background-color: ${color.hex};"><span class="hideit">${color.percent} | ${color.huebucket()} </span><span class="hideit percent${color.huebucket()}">${1 / color.percent}</span><span class="hideit ${color.name}">${color.name}</span></div>` : `${prev}`
          }, ``)
        }
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

var elem = document.querySelector('.flags')
var iso = new Isotope(elem, {
  // options
  sortAscending: true,
  itemSelector: '.flag',
  layoutMode: 'fitRows',
  getSortData: {
    percentw: '.percentw',
    percent1: '.percent1',
    percent2: '.percent2',
    percent3: '.percent3',
    percent4: '.percent4',
    percent5: '.percent5',
    percent6: '.percent6',
    percentb: '.percentb'
  }
})

// iso.sortBy('country')

// bind filter button click
var filtersElem = document.querySelector('.filters-button-group')
filtersElem.addEventListener('click', function (event) {
  // only work with buttons
  // if (!matchesSelector(event.target, 'button')) {
  //   return
  // }
  var filterValue = event.target.getAttribute('data-filter')
  // use matching filter function
  iso.arrange({ filter: filterValue })
})

// bind sort button click
var sortByGroup = document.querySelector('.filters-button-group')
sortByGroup.addEventListener('click', function (event) {
  // only button clicks
  // if ( !matchesSelector( event.target, '.button' ) ) {
    // return;
  // }
  var sortValue = event.target.getAttribute('data-sort-by')
  console.log(sortValue)
  iso.arrange({ sortBy: sortValue })
})
