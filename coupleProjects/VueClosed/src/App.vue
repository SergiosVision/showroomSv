<template>
  <v-app>
    <v-navigation-drawer temporary absolute v-model="sideNav">
        <v-list>
          <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
            <v-list-tile-action>
              <v-icon>{{item.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              {{item.title}}
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              Logout
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="red lighten-1">
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav"
      class="hidden-sm-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">SergiosMeetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <div class="darkBg">
        <router-view></router-view>
      </div>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
        sideNav: false,
    }
  },
  computed: {
      menuItems () {
          let menuItems = [
              {icon: 'face', title: 'Sign up', link: '/signup'},
              {icon: 'lock_open', title: 'Sign in', link: '/signin'},
          ]
          if (this.userIsAuthenticated) {
              menuItems = [
                  {icon: 'supervisor_account', title: 'View Meetups', link: '/meetups'},
                  {icon: 'room', title: 'Organize Meetup', link: '/meetup/add'},
                  {icon: 'person', title: 'Profile', link: '/profile'},
              ]
          }
          return menuItems
      },
      userIsAuthenticated () {
          return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
  },
  methods: {
      onLogout () {
          this.$store.dispatch('logout')
          this.$router.push('/')
      }
  },
  name: 'App'
}
</script>


<style>
  main {
    height: 100%;
    /*background: linear-gradient(to top, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url("https://firebasestorage.googleapis.com/v0/b/sergiosmeetupapp.appspot.com/o/images%2Fbackground.jpg?alt=media&token=61fc00ce-a14f-4169-b842-03f0e408b3db") no-repeat;*/
    background: url("https://firebasestorage.googleapis.com/v0/b/sergiosmeetupapp.appspot.com/o/images%2Fbackground.jpg?alt=media&token=61fc00ce-a14f-4169-b842-03f0e408b3db") no-repeat;
    background-position: center center;
    width: 100%;
    background-size: cover;
  }
  textarea {
    resize: none!important;
  }

  .darkBg {
    background-color: rgba(255,255,255,.8);
    height: 100%;
  }
</style>