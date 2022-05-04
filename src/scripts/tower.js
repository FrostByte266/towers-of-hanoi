import { range } from "./helpers.js"
import { DiskMovedEvent } from "./events.js"
import colorScale from './colors.js'

/**
 * Creates a single disk in a stack
 * @param  { Number } stackPos The position in the stack, starting from bottom to top
 * @return { SVGSVGElement } - The disk SVG element
 */
function createDisk(stackPos, totalDisks, color) {
  const scale = 100 - stackPos * 10
  const svgNS = "http://www.w3.org/2000/svg"
  const svg = document.createElementNS(svgNS, "svg")
  const path = document.createElementNS(svgNS, "path")
  const text = document.createElementNS(svgNS, "text")
  const tSpan = document.createElementNS(svgNS, "tspan")
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
  svg.dataset.stackPos = totalDisks - stackPos
  svg.dataset.diskSize = totalDisks - stackPos
  svg.style.transform = `scale(${scale * 0.01})`
  svg.style.marginTop = `-20%`
  svg.style.zIndex = stackPos
  svg.classList.add('disk')

  return svg
}

/**
 * Creates a full stack
 * @param  { Number } numDisks The number of disks to be placed in the stack
 * @param  { HTMLElement } targetEl The element the stack will be mounted to
 */
export function createStack(numDisks, targetEl) {
  const scale = colorScale.colors(numDisks) // Creates equidistant colors from a gradient
  range(numDisks, 0, -1).reduce((mount, diskPos) => {
    mount.appendChild(createDisk(diskPos, numDisks, scale[diskPos - 1]))
    return targetEl
  }, targetEl)
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
  reorderTowers()
}
