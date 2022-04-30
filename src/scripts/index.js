import { range, getRandomColor } from './helpers.js'

import "../styles/style.css" // Styles linked by webpack via imports


function createDisk(stackPos) {
  const scale = 100 - stackPos * 10
  const svgNS = "http://www.w3.org/2000/svg"
  const svg = document.createElementNS(svgNS, "svg")
  const path = document.createElementNS(svgNS, "path")
  path.setAttribute(
    "d",
    "M2,50 A50,10 0 0,0 98,50 A50,10 0 0,0 2,50 L2,75 A50,10,0 0,0 98,75 L98,50"
  )
  svg.appendChild(path)
  svg.setAttributeMulti({ // This method is added to the prototype in `helpers.js`
    fill: getRandomColor(),
    stroke: "black",
    preserveAspectRatio: "none",
    viewBox: "1.99999 42.8 96 39.4",
  })
  svg.dataset.stackPos = stackPos
  svg.style.transform = `scale(${scale*0.01})`
  svg.style.marginBottom = `-${scale*(stackPos * .5)}px`
  svg.style.zIndex = stackPos

  return svg
}

function createStack(numDisks, targetEl) {
  range(numDisks, 0, -1).reduce((mount, diskPos) => {
    mount.appendChild(createDisk(diskPos))
    return targetEl
  }, targetEl)
}

createStack(3, document.querySelector('div[data-towerNumber="0"]'))
