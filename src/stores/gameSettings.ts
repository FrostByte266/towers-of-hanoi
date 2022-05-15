import { writable } from "svelte/store"

export const stackSetting = writable(3)
export const gameInNonDefaultState = writable(false)