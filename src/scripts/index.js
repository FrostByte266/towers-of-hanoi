import { createStack, moveDisk } from './tower.js'

import "../styles/style.css" // Styles linked by webpack via imports

document.getElementById('towers').addEventListener('click', e => {
  const baloon = document.getElementById('baloon')
  // Return if anything other than a disk was clicked
  // If a disk is clicked, e.target will be SVG path, parent will be SVG el
  if (e.target.parentNode.tagName !== 'svg') return
  // Only show move dialog if clicking the top most disk
  else if (e.target.parentNode.dataset.stackPos != 0) {
    // Hide the popup
    baloon.classList.remove('showing')
    return
  }
  
  const svg = e.target.parentNode
  const clickedDiskRect = svg.getBoundingClientRect()

  baloon.style.left = 10 + (clickedDiskRect.left + clickedDiskRect.width) + 'px'
  baloon.style.top = (clickedDiskRect.top + clickedDiskRect.height*0.5) + 'px'

  baloon.dataset.originTower = e.target.parentNode.parentNode.dataset.towerNumber

  if (baloon.classList.contains('showing')) {
    baloon.classList.remove('showing')
  } else {
    baloon.classList.add('showing')
  }

})

document.getElementById('settings-form').addEventListener('submit', e => {
  e.preventDefault()
  const data = new FormData(e.target)
  const numDisks = Number(data.get('disk-number'))
  e.target.parentNode.classList.add('hidden')
  createStack(numDisks, document.querySelector('div[data-tower-number="0"]'))
})

document.getElementById('baloon').addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') return
  moveDisk(e.target.parentNode.dataset.originTower, e.target.dataset.selectTower)
  e.target.parentNode.classList.remove('showing')

})