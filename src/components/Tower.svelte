<script lang="ts">
    import Disk from './Disk.svelte'
    import type IDisk from '../interfaces/Disk'
    export let disks: Array<IDisk>
    export const diskEls: Array<HTMLDivElement> = []
</script>


{#each disks as disk, i}
    <Disk bind:diskEl={diskEls[i]} {...disk} />
{/each}