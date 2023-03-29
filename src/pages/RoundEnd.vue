<template>
  <div v-if="game" class="flex flex-col max-h-full h-full justify-between overflow-hidden">
      <div class="flex justify-between">
          <div class="flex-grow">
              <div class="text-xl font-bold leading-none">{{ game.currentTeam.currentPlayer.name }}</div>
              <p class="text-[10px] opacity-50">{{ game.currentTeam.name }}</p>
          </div>

          <div class="text-right">
              <div class="text-xl font-bold leading-none">{{ game.guestedWords.length }}</div>
              <p class="text-[10px] opacity-50">Word</p>
          </div>
      </div>

      <div class="my-5 flex-grow overflow-y-auto bg-gray-900 bg-opacity-50 rounded-lg">
          <div
              v-for="(guessed, word) in game.roundWords"
              class="m-2 leading-none capitalize rounded-md px-4 py-4 bg-green-500 bg-opacity-40 cursor-pointer"
              :class="{ 'opacity-30': !guessed }"
              @click="game.roundWords[word] = !guessed"
          >{{ word }}</div>
      </div>

      <button class="btn" @click="router.push('/scoreboard')">Scoreboard</button>
  </div>
</template>

<script setup>
import { useStore } from "@/store";
import { router } from "@/router";

const { game } = useStore();

if (!game.value) {
    router.push('/');
}
</script>
