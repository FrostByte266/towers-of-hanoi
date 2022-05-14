<script lang="ts">
  export let color: String
  export let scale: Number
  export let stackPos: Number
  $: scalePercentage = `${scale * 100}%`
</script>

<div
  data-stack-pos="0"
  data-disk-size="0"
  data-scale="0.5"
  class="disk"
  style:width={scalePercentage}
  style:height={scalePercentage}
  style:zIndex={stackPos}
>
  <svg stroke="black" preserveAspectRatio="none" viewBox="1.99999 42.8 96 39.4"
    ><path
      d="M2,50 A50,10 0 0,0 98,50 A50,10 0 0,0 2,50 L2,75 A50,10,0 0,0 98,75 L98,50"
      fill={color}
    /><text x="45" y="75"><tspan>{stackPos}</tspan></text></svg
  >
</div>
