<script lang="ts">
    import { afterUpdate, onDestroy } from 'svelte'

    import Disk from './Disk.svelte'
    import type IDisk from '../interfaces/Disk'
    export let disks: Array<IDisk>
    let diskEls: Array<HTMLDivElement> = []

    afterUpdate(async () => {
        const reversed = diskEls.reverse()
        const firstEl = reversed.splice(0, 1)[0]
        firstEl.style.zIndex = "0"
        reversed
            .reduce((prev, cur, i) => {
                prev.style.marginTop = `-${cur.offsetHeight * 0.35}px`
                cur.style.zIndex = String(i+1)
                return cur
            }, firstEl)
    })

</script>


{#each disks as disk, i}
    <Disk bind:diskEl={diskEls[i]} {...disk} />
{/each}