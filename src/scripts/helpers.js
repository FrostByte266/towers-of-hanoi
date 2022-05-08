/**
 * A python like range function
 * @param  { Number } [start=0] The number to start from, default 0
 * @param  { Number } stop Will go up to, but not including, this number
 * @param  { Number } [step=1] The increment each time, default 1
 */
export function range(start = 0, stop, step = 1) {
  // see: https://stackoverflow.com/a/8273091
  if (typeof stop == "undefined") {
    // one param defined
    stop = start
    start = 0
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

export function formatTimer(seconds) {
  const time = new Date(null)
  time.setSeconds(seconds)
  return time
    .toISOString()
    .substring(11, 19) // Capture only the H:M:S portion
    .split(':')
    .map((t, i) => t + ['h', 'm', 's'].at(i)) // Add hour, minute, or second prefixes
    .join(' ')
    .replace(/(00)+[hms]/g, "") // Remove h,m, or s portions that are zero
}

export function getMinMoves(numDisks) {
  return (2**numDisks) - 1
}

// Assign a helper function to set many attributes at once
/**
 * Assigns many attributes at once
 * @param  { {String: any} } attrs
 */
function setAttributeMulti(attrs) {
  Object.entries(attrs).forEach(([key, value]) => this.setAttribute(key, value))
}

SVGElement.prototype.setAttributeMulti = setAttributeMulti
