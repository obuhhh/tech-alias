<template>
  <div v-if="game" class="flex flex-col h-full justify-between">
      <div class="flex justify-between">
          <div class="flex-grow">
              <div class="text-xl font-bold leading-none">{{ game.currentTeam.currentPlayer.name }}</div>
              <p class="text-[10px] opacity-50">{{ game.currentTeam.name }}</p>
          </div>

          <div v-if="game.state.round || game.state.roundEnd" class="text-right">
              <div class="text-xl font-bold leading-none">{{ game.guestedWords.length }}</div>
              <p class="text-[10px] opacity-50">Word</p>
          </div>

          <div class="text-right ml-6">
              <div class="text-xl font-bold leading-none">{{ game.timer }}</div>
              <p class="text-[10px] opacity-50">Time</p>
          </div>
      </div>

      <div>
          <div
              class="text-center text-xs mb-2 text-green-500 transition-opacity duration-1000 ease-in-out"
              :class="game.state.roundEnd ? 'opacity-100' : 'opacity-0'"
          >Last word</div>
          <div
              v-if="game.state.round || game.state.roundEnd"
              class="border mx-4 px-4 py-8 rounded-lg bg-gray-700 text-lg font-bold leading-none text-center capitalize transition-colors duration-1000 ease-in-out"
              :class="game.state.roundEnd ? 'border-green-500' : 'border-transparent'"
          >{{ game.currentWord }}</div>
          <div class="text-center text-sm opacity-50 mt-2">Round {{ game.currentTeam.round }}</div>
      </div>

      <button v-if="game.state.idle" class="btn w-full" @click="game.startRound(onRoundEnded)">start</button>
      <div v-else-if="game.state.round || game.state.roundEnd" class="flex">
          <button class="btn btn--secondary w-1/3 mr-2" @click="game.wordNotGuessed()">Skip</button>
          <button class="btn flex-grow ml-2" @click="game.wordGuessed()">Next</button>
      </div>
  </div>
</template>

<script setup>
import { useStore } from "@/store";
import { router } from "@/router";

const { game } = useStore();

if (!game.value) {
    router.push('/');
} else {
    game.value.prepareRound();
}
function onRoundEnded () {
    router.push('/round-end');
}
</script>
