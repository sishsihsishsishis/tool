<template>
    <span>
    <template v-for="i in 5" :key="i" >
    <img v-if="i>score" src="./assets/star-gray.svg"  class="logo" alt="logo" />
    <img v-else src="./assets/star-golden.svg"  class="logo" alt="logo" />
    <!-- <img :src="i>score?'./assets/star-golden.svg':'./assets/star-gray.svg'"  class="logo" alt="logo" /> -->
    </template>
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{ score: number }>()
</script>
<style scoped>
.logo
{
    width:2em;
    margin:0.3em
}
</style>