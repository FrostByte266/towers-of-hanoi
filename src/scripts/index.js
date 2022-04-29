import "../styles/style.css" // Styles linked by webpack via imports

SVGSVGElement.prototype.setAttributeMulti = function (attrs) { // Assign a helper function to set many attributes at once
  Object.entries(attrs).forEach(([key, value]) => this.setAttribute(key, value))
}

function createDisk(color, scale) {
  const svgNS = "http://www.w3.org/2000/svg"
  const svg = document.createElementNS(svgNS, "svg")
  const path = document.createElementNS(svgNS, "path")
  path.setAttribute(
    "d",
    "M2,50 A50,10 0 0,0 98,50 A50,10 0 0,0 2,50 L2,75 A50,10,0 0,0 98,75 L98,50"
  )
  svg.appendChild(path)
  svg.setAttributeMulti({
    fill: color,
    stroke: "black",
    preserveAspectRatio: "none",
    viewBox: "0 0 204 86.69",
  })
  svg.style.width = `${scale}%`
  svg.style.transform = `translateX(${100 - scale}%)`

  return svg
}

function getRandomColor() {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i=0; i<6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

for (let i = 4; i > 1; i--) { // Create our stack
  document
    .querySelector('div[data-towerNumber="0"]')
    .appendChild(createDisk(getRandomColor(), 100 - i * 10, 100 - i * 10))
}
