<svelte:options accessors={true} />

<script lang="ts">
  import { afterUpdate } from "svelte"
  import chroma from "chroma-js"
  import linspace from "@stdlib/array-base-linspace"
  import type { ProxyComponent } from "svelte-hmr/runtime"

  import Tower from "./Tower.svelte"
  import type IDisk from "../interfaces/Disk"

  import zip from "../util/arrayZip"

  const stackSize = 3

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

  let towerDisks: Array<Array<IDisk>> = [createInitialTower(stackSize), [], []]
  const towerElements: Array<Array<HTMLDivElement>> = []

  afterUpdate(async () => {
    towerElements.forEach(tower => {
      const reversed = tower.reverse()
      const firstEl = reversed.splice(0, 1)[0]
      console.log("First el is", firstEl)
      firstEl.style.zIndex = String(0)
      reversed.reduce((prev, cur, i) => {
        prev.style.marginTop = `-${cur.offsetHeight * 0.35}px`
        cur.style.zIndex = String(i + 1)
        return cur
      }, firstEl)
    })
  })
  // towerDisks[1].push(towerDisks[0].shift())
  // towerDisks[1].push(towerDisks[0].shift())
</script>

<main>
  {#each towerDisks as disks, i}
    <div class="tower">
      <Tower bind:diskEls={towerElements[i]} {disks} />
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
