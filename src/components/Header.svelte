<header>
    <div class="title">
      <h1>Tower of Hanoi</h1>
      <h2>A classic game of wit</h2>
    </div>
    <div id="stats">
      <h2>Moves: <span id="moves">0</span></h2>
      <h2>Time: <span id="time">0</span></h2>
    </div>
</header>

<style lang="scss">
    header {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
    .title {
        grid-column: span 2;
        text-align: center;
    }
    #stats {
        border: 2px solid var(--secondary-bg);
        padding: 5px;
    }
</style>