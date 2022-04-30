export function range(start, stop, step) {
  // see: https://stackoverflow.com/a/8273091
  if (typeof stop == "undefined") {
    // one param defined
    stop = start
    start = 0
  }

  if (typeof step == "undefined") {
    step = 1
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return []
  }

  const result = []
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i)
  }

  return result
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF"
  return "#" + Array(6).fill().map(() => letters[Math.floor(Math.random() * letters.length)]).join('')
}

// Assign a helper function to set many attributes at once
SVGSVGElement.prototype.setAttributeMulti = function (attrs) {
  Object.entries(attrs).forEach(([key, value]) => this.setAttribute(key, value))
}
