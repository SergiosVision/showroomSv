import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/Meetups/Meetups'
import CreateMeetup from '@/components/Meetups/CreateMeetup'
import Profile from '@/components/User/Profile'
import SignUp from '@/components/User/SignUp'
import SignIn from '@/components/User/SignIn'
import Meetup from '@/components/Meetups/Meetup'
import AuthGuard from './auth-guard'
import PageNotFound from '@/components/404.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
        path: '/meetup/add',
        name: 'CreateMeetup',
        component: CreateMeetup,
        beforeEnter: AuthGuard
    },
    {
        path: '/meetups/:id',
        name: 'Meetup',
        props: true,
        component: Meetup
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
        path: '/signin',
        name: 'SignIn',
        component: SignIn
    },
    {
        path: '*',
        name: 'NotFound',
        component: PageNotFound
    },
    {
      path: '/meetups/:id/*',
      name: 'NotFound',
      component: PageNotFound
    },
  ],
  mode: 'history'
})
