<template>
    <div class="h-full flex flex-col">
        <Header/>

        <div class="p-4 overflow-hidden flex-grow">
            <router-view :key="route.fullPath" />
        </div>
    </div>
</template>

<script setup>
import { router } from "@/router";
import {computed} from "vue";
import Header from "@/components/Header.vue";

const route = computed(() => router.currentRoute.value)
</script>

<style scoped>
</style>
