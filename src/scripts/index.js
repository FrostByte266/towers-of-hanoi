import { createStack, moveDisk, filterAvailableMoves } from "./tower.js"
import {
  playField,
  baloon,
  settingsForm,
  towers,
  time,
  moves,
  scorePopup,
  gameEndMoves,
  gameEndTime,
  confetti,
} from "./domElements.js"
import { formatTimer } from "./helpers.js"
import { DuckTimer as Timer } from "duck-timer"
import { GameStartEvent, GameEndEvent } from "./events.js"
import colorScale from "./colors.js"

import "../styles/style.scss" // Styles linked by webpack via imports

const gameTimer = new Timer({ interval: 1000 })

gameTimer.onInterval(({ seconds }) => (time.innerText = formatTimer(seconds)))

playField.addEventListener("click", e => {
  // Return if anything other than a disk was clicked
  // If a disk is clicked, e.target will be SVG path, parent will be SVG el
  if (e.target.parentNode.parentNode.tagName !== "DIV") return
  // Only show move dialog if clicking the top most disk
  else if (e.target.parentNode.parentNode.dataset.stackPos != 0) {
    // Hide the popup
    baloon.classList.remove("showing")
    return
  }

  const svg = e.target.parentNode
  const clickedDiskRect = svg.getBoundingClientRect()

  baloon.style.left = 10 + (clickedDiskRect.left + clickedDiskRect.width) + "px"
  baloon.style.top = clickedDiskRect.top + clickedDiskRect.height * 0.5 + "px"

  baloon.dataset.originTower =
    e.target.parentNode.parentNode.parentNode.dataset.towerNumber
  const targetDisk = e.target.parentNode.parentNode

  filterAvailableMoves(baloon, targetDisk)

  if (baloon.classList.contains("showing")) {
    baloon.classList.remove("showing")
  } else {
    baloon.classList.add("showing")
  }
})

playField.addEventListener("disk-moved", e => {
  moves.innerText = Number(moves.innerText) + 1

  const disks = e.destination.children
  if (
    e.destination.dataset.towerNumber != 0 &&
    disks.length == playField.dataset.numDisks
  ) {
    new GameEndEvent().emit()
  }
})

settingsForm.addEventListener("submit", e => {
  e.preventDefault()
  const data = new FormData(e.target)
  const numDisks = Number(data.get("disk-number"))
  new GameStartEvent(numDisks).emit()
})

baloon.addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON") return
  console.log(e.target.parentNode)
  moveDisk(e.target.parentNode.dataset.originTower, e.target.value)
  e.target.parentNode.classList.remove("showing")
})

document.body.addEventListener("game-start", e => {
  settingsForm.parentNode.classList.add("hidden")
  createStack(e.numDisks, towers[0])
  playField.dataset.numDisks = e.numDisks
  gameTimer.start()
})

document.body.addEventListener("game-end", async e => {
  console.log("Game over")
  gameEndMoves.innerText = moves.innerText
  gameEndTime.innerText = time.innerText
  gameTimer.stop()
  scorePopup.showModal()
  Array(5)
    .fill(
      async () =>
        await confetti.addConfetti({
          confettiColors: colorScale.colors(50),
          confettiNumber: 1000,
        })
    )
    .reduce((prev, next) => prev.then(next), Promise.resolve())
})
