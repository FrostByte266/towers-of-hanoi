import { range, getRandomColor } from './helpers.js'

/**
 * Creates a single disk in a stack
 * @param  { Number } stackPos The position in the stack, starting from bottom to top
 * @return { SVGSVGElement } - The disk SVG element
 */
function createDisk(stackPos, totalDisks) {
  const scale = 100 - stackPos * 10
  const svgNS = "http://www.w3.org/2000/svg"
  const svg = document.createElementNS(svgNS, "svg")
  const path = document.createElementNS(svgNS, "path")
  path.setAttribute(
    "d",
    "M2,50 A50,10 0 0,0 98,50 A50,10 0 0,0 2,50 L2,75 A50,10,0 0,0 98,75 L98,50"
  )
  svg.appendChild(path)
  svg.setAttributeMulti({
    // This method is added to the prototype in `helpers.js`
    fill: getRandomColor(),
    stroke: "black",
    preserveAspectRatio: "none",
    viewBox: "1.99999 42.8 96 39.4",
  })
  svg.dataset.stackPos = totalDisks - stackPos
  svg.style.transform = `scale(${scale * 0.01})`
  svg.style.marginBottom = `-${scale * (stackPos * 0.5)}px`
  svg.style.zIndex = stackPos

  return svg
}

/**
 * Creates a full stack
 * @param  { Number } numDisks The number of disks to be placed in the stack
 * @param  { HTMLElement } targetEl The element the stack will be mounted to
 */
export function createStack(numDisks, targetEl) {
  range(numDisks, 0, -1).reduce((mount, diskPos) => {
    mount.appendChild(createDisk(diskPos, numDisks))
    return targetEl
  }, targetEl)
}
