import { createRouter, createWebHistory } from 'vue-router'
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
      beforeEnter: isAuthenticated,
      component: () => import('../views/newsfeed.vue')
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
      name: 'Post',
      beforeEnter: isAuthenticated,
      component: () => import('../views/PostPage.vue')
    },
    {
      path:'/NewsFeed',
      name: 'NewsFeed',
      beforeEnter: isAuthenticated,
      component: () => import('../views/newsfeed.vue')
    },
    {
      path:'/Search/:SearchVal',
      name: 'Search',
      beforeEnter: isAuthenticated,
      component: () => import('../views/SearchResult.vue')
    }
    ,
    {
      path:'/Profile',
      name: 'Profile',
      beforeEnter: isAuthenticated,
      component: () => import('../views/UserProfile.vue')
    }
  ]
})

export default router
