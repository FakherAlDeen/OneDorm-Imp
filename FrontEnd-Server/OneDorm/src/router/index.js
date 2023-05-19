import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { UserStore } from '../stores/UserStore'
import VueCookies from 'vue-cookies'


const isAuthenticated = async (to, from,next)=>{
  console.log (UserStore().UserID);
  if (!VueCookies.get('Token')){
    next('Login');
  }else {
    const TokenData = JSON.parse(atob(VueCookies.get('Token').split('.')[1]));
    UserStore().Token = VueCookies.get('Token');
    UserStore().UserID = TokenData.UserId;
    await UserStore().GetUser(TokenData.UserId);
    next ();
  }
} 
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/Signup',
      name: 'Signup',
      
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path:'/CreatePost',
      name: 'CreatePost',
      beforeEnter: isAuthenticated,
      component: () => import('../views/CreatePost.vue')
    },
    {
      path:'/Post/:QuestionId',
      // path:'/Post:PostID',
      name: 'Post',
      beforeEnter: isAuthenticated,
      component: () => import('../views/Post.vue')
    },
    {
      path:'/NewsFeed',
      // path:'/Post:PostID',
      name: 'NewsFeed',
      beforeEnter: isAuthenticated,
      component: () => import('../views/newsfeed.vue')
    }
  ]
})

export default router
