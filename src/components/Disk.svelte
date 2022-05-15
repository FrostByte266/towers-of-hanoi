<script lang="ts">
  export let color: string | number
  export let scale: number
  export let stackPos: number
  export let diskEl: HTMLDivElement
  let scalePercentage: string;
  $: scalePercentage = `${scale * 100}%`
</script>

<div
  bind:this={diskEl}
  class="disk"
  style:width={scalePercentage}
  style:height={scalePercentage}
  style:zIndex={stackPos}
>
  <svg stroke="black" preserveAspectRatio="none" viewBox="1.99999 42.8 96 39.4"
    ><path
      d="M2,50 A50,10 0 0,0 98,50 A50,10 0 0,0 2,50 L2,75 A50,10,0 0,0 98,75 L98,50"
      fill={String(color)}
    /><text x="45" y="75"><tspan>{stackPos}</tspan></text></svg
  >
</div>

<style lang="scss">
  .disk {
	margin: 0 auto;
	position: relative;
  }
</style>
