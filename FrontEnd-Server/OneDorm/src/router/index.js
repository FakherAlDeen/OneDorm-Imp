import { createRouter, createWebHistory } from 'vue-router'
import { UserStore } from '../stores/UserStore'
import VueCookies from 'vue-cookies'


const isAuthenticated = async (to, from,next)=>{
  console.log (UserStore().UserID);
  if (!VueCookies.get('Token')){
    next('Login');
  }else {
    const TokenData = JSON.parse(atob(VueCookies.get('Token').split('.')[1]));
    UserStore().UserToken = VueCookies.get('Token');
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
      path:'/CreateBlog',
      name: 'CreateBlog',
      beforeEnter: isAuthenticated,
      component: () => import('../views/CreateBlog.vue')
    },
    {
      path:'/EditPost/:QuestionId',
      name: 'EditPost',
      beforeEnter: isAuthenticated,
      component: () => import('../views/EditPost.vue')
      ,
      meta: {
        watchParam: 'QuestionId' //
      }
    },
    {
      path:'/EditBlog/:BlogId',
      name: 'EditBlog',
      beforeEnter: isAuthenticated,
      component: () => import('../views/EditBlog.vue')
      ,
      meta: {
        watchParam: 'BlogId' //
      }
    },
    {
      path:'/Post/:QuestionId',
      name: 'Post',
      beforeEnter: isAuthenticated,
      component: () => import('../views/PostPage.vue'),
      meta: {
        watchParam: 'QuestionId' //
      }
    },
    {
      path:'/Blog/:BlogId',
      name: 'Blog',
      beforeEnter: isAuthenticated,
      component: () => import('../views/BlogPage.vue')
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
      ,
      meta: {
        watchParam: 'SearchVal' //
      }
    }
    ,
    {
      path:'/Profile',
      name: 'Profile',
      beforeEnter: isAuthenticated,
      component: () => import('../views/UserProfile.vue')
    }
    ,
    {
      path:'/Admin',
      name: 'Admin',
      beforeEnter: isAuthenticated,
      component: () => import('../views/AdminPanel.vue')
    },
    {
      path:'/Hashtag/:HashVal',
      name: 'Hashtag',
      beforeEnter: isAuthenticated,
      component: () => import('../views/HashtagsPage.vue')
      ,
      meta: {
        watchParam: 'HashVal' //
      }
    },
    {
      path:'/UserProfile/:UserId',
      name: 'UserProfile',
      beforeEnter: isAuthenticated,
      component: () => import('../views/ProfilePage.vue')
      ,
      meta: {
        watchParam: 'UserId' //
      }
    },
    {
      path:'/MyPosts',
      name: 'MyPosts',
      beforeEnter: isAuthenticated,
      component: () => import('../views/MyPostsPage.vue')
    }
  ]
})

export default router
