import JSConfetti from "js-confetti"

export const towers = document.querySelectorAll("div[data-tower-number]")

export const playField = document.getElementById("towers")

export const baloon = document.getElementById("baloon")

export const settingsForm = document.getElementById("settings-form")

export const moves = document.getElementById("moves")

export const time = document.getElementById("time")

export const scorePopup = document.getElementById("game-end-screen")

export const gameEndMoves = document.getElementById("end-screen-moves")
export const gameEndTime = document.getElementById("end-screen-time")

export const confetti = new JSConfetti()
