<template>
    <div class="p-4 h-full flex flex-col overflow-hidden">
        <router-view :key="route.fullPath"/>
    </div>
</template>

<script setup>
import { router } from "@/router";
import {computed} from "vue";

const route = computed(() => router.currentRoute.value)
</script>

<style scoped>
</style>
