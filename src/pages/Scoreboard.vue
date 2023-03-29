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

                  <div class="flex flex-wrap mt-3 opacity-60">
                      <div
                          v-for="player in [...team.players].sort((a, b) => b.score - a.score)"
                          class="text-[12px] leading-none flex items-center mr-2 mb-1"
                      >
                          <span>{{ player.name }}</span>
                          <span class="text-[10px] p-0.5 bg-gray-900 border border-gray-700 rounded-full">{{ player.score }}</span>
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
