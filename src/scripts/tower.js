import { range } from "./helpers.js"
import { DiskMovedEvent } from "./events.js"
import colorScale from './colors.js'
import linspace from 'compute-linspace'

/**
 * Creates a single disk in a stack
 * @param  { Number } stackPos The position in the stack, starting from bottom to top
 * @return { SVGSVGElement } - The disk SVG element
 */
function createDisk(stackPos, totalDisks, color, scale) {
  const svgNS = "http://www.w3.org/2000/svg"
  const svg = document.createElementNS(svgNS, "svg")
  const path = document.createElementNS(svgNS, "path")
  const text = document.createElementNS(svgNS, "text")
  const tSpan = document.createElementNS(svgNS, "tspan")
  const wrapper = document.createElement('div')
  // `setAttributeMulti` is set to SVG element prototype in `helpers.js`
  path.setAttributeMulti({
    d: "M2,50 A50,10 0 0,0 98,50 A50,10 0 0,0 2,50 L2,75 A50,10,0 0,0 98,75 L98,50",
    fill: color
  })
  svg.appendChild(path)
  text.setAttributeMulti({
    x: "45",
    y: "75",
  })
  tSpan.textContent = (totalDisks - stackPos) + 1
  text.appendChild(tSpan)
  svg.appendChild(text)

  svg.setAttributeMulti({
    stroke: "black",
    preserveAspectRatio: "none",
    viewBox: "1.99999 42.8 96 39.4",
  })
  wrapper.dataset.stackPos = totalDisks - stackPos
  wrapper.dataset.diskSize = totalDisks - stackPos
  const scalePercent = scale * 0.01
  wrapper.dataset.scale = scalePercent
  // wrapper.style.transform = `scale(${scalePercent})`
  wrapper.style.width = `${scale}%`
  wrapper.style.height = `${scale}%`
  wrapper.style.zIndex = stackPos
  wrapper.classList.add('disk')

  // wrapper.classList.add('disk')
  wrapper.appendChild(svg)

  return wrapper
}

/**
 * Creates a full stack
 * @param  { Number } numDisks The number of disks to be placed in the stack
 * @param  { HTMLElement } targetEl The element the stack will be mounted to
 * @return { Promise<void> }
 */
export function createStack(numDisks, targetEl) {
  return new Promise((resolve, reject) => {
    const scale = colorScale.colors(numDisks) // Creates equidistant colors from a gradient
    const space = linspace(100, 50, numDisks)
    console.log(space)
    range(numDisks, 0, -1).reduce((mount, diskPos) => {
      mount.appendChild(createDisk(diskPos, numDisks, scale[diskPos - 1], space[diskPos - 1]))
      return targetEl
    }, targetEl)
    offsetTower(targetEl)
    resolve()
  })

}
/**
 * @param  { HTMLDivElement } tower
 */
function offsetTower(tower) {
  clearOffsets(tower)
  const reversed = Array.from(tower.children).reverse()
  const firstEl = reversed.splice(0, 1)[0]
  reversed
    .reduce((prev, cur) => {
      prev.style.marginTop = `-${cur.offsetHeight * 0.35}px`
      return cur
    }, firstEl)
}

function clearOffsets(tower) {
  Array.from(tower.children).forEach(disk => {
    disk.style.marginTop = null
  })
}

/**
 * Goes through all towers and re-orders all disks
 */
function reorderTowers() {
  const towers = document.querySelectorAll("div[data-tower-number]")
  Array.from(towers)
    .map(tower => tower.childNodes)
    .forEach(disks => {
      disks.forEach((disk, i) => {
        disk.dataset.stackPos = i
      })
    })
}

function canMoveToTower(disk, tower) {
  const diskSize = Number(disk.dataset.diskSize)
  if (tower.children.length === 0) {
    return true
  } else {
    return diskSize < getTopDiskSize(tower)
  }
}

function getTopDiskSize(tower) {
  return Number(tower.firstChild.dataset.diskSize)
}

export function filterAvailableMoves(baloon, disk) {
  const buttons = Array.from(baloon.children)
  buttons.forEach(button => {
    const targetTower = document.querySelector(
      `div[data-tower-number="${button.value}"`
    )
    button.disabled = !canMoveToTower(disk, targetTower)
  })
}

/**
 * Moves disk from source to target tower
 * @param  { Number } sourceTower The target to remove the disk from
 * @param  { Number } targetTower The target to place the disk on top of
 */
export function moveDisk(sourceTower, targetTower) {
  const source = document.querySelector(
    `div[data-tower-number="${sourceTower}"]`
  )
  const target = document.querySelector(
    `div[data-tower-number="${targetTower}"]`
  )

  const topDisk = source.firstChild
  topDisk.remove()
  if (target.children.length === 0) {
    target.appendChild(topDisk)
  } else {
    target.firstChild.before(topDisk)
  }

  new DiskMovedEvent(source, target, topDisk).emit()
  
  offsetTower(target)
  offsetTower(source)
  reorderTowers()
}
