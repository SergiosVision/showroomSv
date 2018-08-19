<template>
  <section>
    <ul class="list-group">
      <router-link v-for="(item, index) in menuList"
                   :key="index"
                   :to="item.url"
                   tag="li"
      >
        <a>{{ item.text }}</a>
      </router-link>
    </ul>
    <router-view></router-view>
  </section>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        computed: {
            ...mapGetters('menu', {
                menuList: 'items'
            })
        }
    }
</script>

<style>

</style>