<script lang="ts">
    import { stackSetting } from '../stores/gameSettings'
    let numMoves: number
    $: numMoves = 2** $stackSetting - 1
</script>

<div id="settings">
  <h3>Game settings</h3>
    <label for="disk-number">Number of disks:</label>
    <input
      bind:value={$stackSetting}
      name="disk-number"
      type="number"
      min="2"
      max="50"
      id="num-disk-selector"
    />
    <p>Minimum number of moves to beat: {numMoves}</p>
</div>

<style>
    #settings {
        margin: 5px;
        padding: 5px;
        border: 2px solid var(--secondary-bg);
    }
</style>
