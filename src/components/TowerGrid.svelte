<svelte:options accessors={true} />

<script lang="ts">
  import { afterUpdate, onDestroy } from "svelte"
  import chroma, { random } from "chroma-js"
  import linspace from "@stdlib/array-base-linspace"

  import Tower from "./Tower.svelte"
  import type IDisk from "../interfaces/Disk"

  import { stackSetting } from '../stores/gameSettings'

  import zip from "../util/arrayZip"

  let stackSize = 3
  stackSetting.subscribe(newValue => {
    console.log(`Stacksize changed to ${newValue}`)
    stackSize = newValue
  })

  function createInitialTower(size: number): Array<IDisk> {
    const props = zip(
      chroma.scale(["#F8CB2E", "#EE5007", "#B22727"]).colors(size),
      linspace(100, 50, size)
    ).reverse()

    return props.map(([color, scale], i) => ({
      color,
      scale: scale / 100,
      stackPos: i + 1,
    }))
  }
  
  let towerDisks: Array<Array<IDisk>>
  $: towerDisks = [createInitialTower(stackSize), [], []]


  
</script>

<main>
  {#each towerDisks as disks, i}
    <div class="tower">
      {#key towerDisks}
        <Tower {disks} />
      {/key}
    </div>
    <h1>Tower #{i + 1}</h1>
  {/each}
</main>

<style lang="scss">
  main {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 90% 10%;
    height: 100%;
  }

  h1 {
    text-align: center;
  }

  .tower {
    max-height: 100%;
    align-self: end;
    // bottom: 5px;
    counter-increment: tower-counter 1;
    grid-row: 1;
    overflow: scroll;
  }
</style>
