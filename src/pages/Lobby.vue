<template>
  <div class="h-full flex flex-col">
      <textarea
          class="rounded px-3 py-1 h-[200px] block w-full bg-gray-700 outline-none flex-shrink-0" v-model="names"
          placeholder="Enter team names separated by comma"
      />

      <div class="flex justify-between w-[150px] mx-auto items-center mt-10">
          <button class="btn" :disabled="count <= 1" @click="count--"> - </button>
          <div class="text-center">
              <div class="mx-5 text-xl font-bold leading-none">{{ count }}</div>
              <p class="text-[8px] opacity-50">Teams</p>
          </div>
          <button class="btn" :disabled="count >= names.split(',').length" @click="count++"> + </button>
      </div>

      <div class="flex justify-between w-[150px] mx-auto items-center mt-10">
          <button class="btn" :disabled="timer <= 1" @click="timer -= 10"> - </button>
          <div class="text-center">
              <div class="mx-5 text-xl font-bold leading-none">{{ timer }}</div>
              <p class="text-[8px] opacity-50">Timer</p>
          </div>
          <button class="btn" @click="timer += 10"> + </button>
      </div>

      <div v-if="game" class="mt-auto overflow-y-auto">
          <div v-for="team in game.teams" class="border-b border-gray-700 pb-2">
              <div class="mt-2">
                  <div class="text-lg font-bold relative">
                      <input type="text" class="w-full bg-transparent outline-none focus:bg-gray-700" v-model="team.name">
                      <IconPencil fill="white" class="absolute right-0 top-0 pointer-events-none my-1.5 mr-2" width="10"/>
                  </div>
                  <div class="text-[10px] opacity-50">{{ team.players.map(p => p.name).join(', ') }}</div>
              </div>
          </div>
      </div>

      <button :disabled="count < 2 || !timer || names.split(',').length <= 2" class="btn w-full mt-10" @click="startGame">init</button>
  </div>
</template>

<script setup>
import {ref, watch} from "vue";
import { useStore } from "@/store";
import IconPencil from "@/assets/IconPencil.vue";
import { router } from "@/router";

const { game, initGame } = useStore();
const names = ref(localStorage.getItem('names') || '');
const count = ref(1);
const timer = ref(90);

function startGame() {
    localStorage.setItem('names', names.value)
    game.value.roundTime = timer.value
    router.push('/round');
}

watch(() => [...names.value, count.value], () => {
    localStorage.setItem('names', names.value)
    initGame(count.value, names.value, timer.value);
}, {immediate: true});

window.addEventListener('beforeunload', function (e) {
    console.log(game.value.state.idle)
    if (game.value && !game.value.state.idle) {
        e.preventDefault();
        e.returnValue = ''
    }
})

</script>
