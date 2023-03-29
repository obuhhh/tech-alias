<template>
  <div class="p-3 bg-gray-700 border-b border-gray-600 flex">
      <button class="btn btn--small btn--secondary mr-4" @click="saveGame">Save</button>
      <button class="btn btn--small btn--secondary" @click="load">Load</button>
  </div>
</template>

<script setup>
import { useSave } from "@/composables";
import { router } from "@/router";
import { useStore } from "@/store"

const { saveGame, loadGame } = useSave()
const { game } = useStore()

function load () {
    if (!confirm('Are you sure you want to load a game? This will overwrite the current game.')) return

    loadGame()
    if (game.value.currentTeam) {
        router.push('/scoreboard')
    } else {
        router.push('/round')
    }
}

</script>

<style scoped>

</style>
