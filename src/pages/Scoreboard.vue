<template>
  <div v-if="game" class="h-full overflow-hidden flex flex-col">
      <div class="flex-grow overflow-y-auto">
          <div
              v-for="team in game.teams"
              class="border-b border-gray-700 p-3"
              :class="{ 'bg-gray-500 bg-opacity-10': team === game.currentTeam }"
          >
              <div>
                  <div class="flex justify-between">
                      <div class="">
                          <div class="text-xl">{{ team.name }}</div>
                          <div class="text-[10px] opacity-50">Round {{ team.round }}</div>
                      </div>
                      <div class="text-right">
                          <div class="font-bold text-xl mr-1">{{ team.score }}</div>
                          <div class="text-[10px] opacity-50">Words</div>
                      </div>
                  </div>

                  <div class="flex flex-wrap mt-3">
                      <div
                          v-for="player in [...team.players].sort((a, b) => b.score - a.score)"
                          class="text-[12px] leading-none flex items-center pl-1.5 pr-1 py-0.5 -mx-0.5 rounded-full"
                          :class="{
                              'bg-green-500 bg-opacity-20': player === game.currentTeam.currentPlayer,
                              'opacity-60': player !== game.currentTeam.currentPlayer
                          }"
                      >
                          <span>{{ player.name }}</span>
                          <span
                              class="text-[10px] mt-0.5 py-0.5 px-1 bg-gray-900 border border-gray-700 rounded-full"
                              :class="{ 'bg-opacity-0 border-0 font-bold': player === game.currentTeam.currentPlayer }"
                          >{{ player.score }}</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <button class="btn w-full mt-4" @click="router.push('/round')">Next team</button>
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
