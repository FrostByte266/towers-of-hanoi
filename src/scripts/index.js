import { createStack } from './tower.js'

import "../styles/style.css" // Styles linked by webpack via imports

createStack(3, document.querySelector('div[data-towerNumber="0"]'))


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

  if (baloon.classList.contains('showing')) {
    baloon.classList.remove('showing')
  } else {
    baloon.classList.add('showing')
  }

})