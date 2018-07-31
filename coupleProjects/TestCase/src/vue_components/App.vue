<template>
  <div class="sv-viewWrapper">
    <header-app></header-app>
    <main>
      <router-view></router-view>
    </main>
    <filter-app v-if="$route.path === '/'"></filter-app>
  </div>
</template>

<script>
  import Header from './MainComponents/Header';
  import { mapMutations, mapGetters } from 'vuex';
  import Vue from 'vue';
  import { store } from '../store';
  export default {
    components: {
        'header-app': Header
    },

  }
</script>

<style>

</style>
