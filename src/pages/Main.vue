<template>
  <div class="container" v-if="allPostsShow">
    <h2>НОВОСТИ</h2>
    <div class="timeTitle">
      <p style="color: silver">
        {{ date }}
      </p>
    </div>

    <div class="myBTN">
      <div class="myBTN_addTsk">
        <my-button class="btn" @click="createdPost">
          Создать новость
        </my-button>
        <p style="opacity: 0.6">запись в FireBase</p>
      </div>
      <div class="sorted" v-show="allPostsShow">
        <my-select v-model="selectedSort" :options="sortOptions"></my-select>
      </div>
    </div>

    <div class="addpost_form" v-show="visibleDialog">
      <my-dialog v-model:show="visibleDialog">
        <post-form @create="addPost" />
      </my-dialog>
    </div>
    <div class="addpost_form" v-show="showUpdateNews">
      <my-dialog v-model:show="showUpdateNews">
        <form-update @updatePost="updatePost" :myPost="myPost" />
      </my-dialog>
    </div>

    <div class="postCont">
      <div v-if="!isPostLoading">
        <div class="allNews">
          <div class="searching">
            <my-input
              class="searchInput"
              type="text"
              name="search"
              id="search"
              style="padding: 0px; margin: 10px 0px"
              placeholder="Поиск по заголовку..'Sunt aut'"
              v-model.trim="searchQuery"
            />
          </div>
          <post-list
            :totalPages="totalPages"
            :page="page"
            :posts="sortedAndSearchedPosts"
            :myPosts="myPosts"
            :usering="users"
            :countPosts="this.posts.length"
            :arhive="arhive"
            @showing="showPost"
            @remove="removePost"
            @showingMy="showMyPost"
            @removeMy="removeMyPost"
            @upgradeMy="upgradeMyPost"
            @clearArh="clearArhi"
            @chenchPage="chenchPage"
          />
        </div>
      </div>
      <div v-else class="count">
        <h3 v-show="posts.length === 0">Новостей нет, загружаю!</h3>
        <my-loader></my-loader>
      </div>
    </div>
  </div>
  <div class="container" v-else>
    <div class="thisNews">
      <post-item-id
        v-if="itemIdOne"
        :usering="users"
        :posting="showNews"
        :commenting="comments"
        @closeNews="closeNewshow"
      />
      <post-item-id-my
        v-else
        :postingMy="showNewsMy"
        @closeNews="closeNewshow"
      />
    </div>
  </div>
</template>

<script>
import postItemId from '@/components/postItemId.vue'
import PostItemIdMy from '@/components/postItemIdMy.vue'
import postForm from '@/components/postForm.vue'
import postList from '@/components/postList.vue'
import axios from 'axios'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import { initializeApp } from 'firebase/app'
import ArhivePostItem from '@/components/arhivePostItem.vue'
import FormUpdate from '@/components/formUpdate.vue'

export default {
  name: 'home-page',
  components: {
    postItemId,
    postForm,
    postList,
    PostItemIdMy,
    ArhivePostItem,
    FormUpdate,
  },
  data() {
    return {
      date: 'Загружаю время',
      page: 1,
      totalPages: 0,
      limit: 2,
      arrayPage: [],
      users: [],
      posts: [],
      myPosts: [],
      myPost: Object,
      comments: [],
      comm: [],
      arhive: [],
      countObj: 0,
      countPosts: 0,
      showNews: Object,
      showNewsMy: Object,
      searchQuery: '',
      allPostsShow: true,
      itemIdOne: false,
      visibleDialog: false,
      visibleDialogNews: false,
      showUpdateNews: false,
      isPostLoading: false,
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'По заголовку' },
        { value: 'body', name: 'По описанию' },
      ],
    }
  },
  methods: {
    async addPost(post) {
      if (this.myPosts) {
        this.countObj = Object.keys(this.myPosts).length
      } else {
        this.countObj = 0
      }
      let newId = this.countObj + this.posts.length + 1
      const regData = {
        id: newId,
        name: post.name,
        email: post.email,
        title: post.title,
        body: post.body,
      }
      await this.$store.dispatch('register', regData)
      this.visibleDialog = false
    },

    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id)
    },
    showPost(post) {
      this.showNews = post
      this.allPostsShow = false
      this.itemIdOne = true
      window.scrollTo(0, 0)
    },
    closeNewshowMy() {
      this.showNewsMy = ''
      this.allPostsShow = true
      window.scrollTo(0, 0)
    },
    async removeMyPost(myPost) {
      const app = initializeApp({
        apiKey: 'AIzaSyBR72w8SfdXJKEZVaUlEGc3DPPzYg-aXrk',
        authDomain: 'news-vf.firebaseapp.com',
        databaseURL: 'https://news-vf-default-rtdb.firebaseio.com',
        projectId: 'news-vf',
        storageBucket: 'news-vf.appspot.com',
        messagingSenderId: '972542800946',
        appId: '1:972542800946:web:f01a06eae96951773f382b',
        measurementId: 'G-KE43EED5K1',
      })
      const db = getDatabase(app)
      const id = myPost.id
      await set(ref(db, '/news/' + `${id}`), null)
      await set(ref(db, '/arhive/' + `${id}` + `${myPost.avtor}`), {
        id: id,
        avtor: myPost.avtor,
        email: myPost.email,
        title: myPost.title,
        body: myPost.body,
      })

      console.log(id, this.arhive)
    },
    clearArhi() {
      setTimeout(() => {
        const app = initializeApp({
          apiKey: 'AIzaSyBR72w8SfdXJKEZVaUlEGc3DPPzYg-aXrk',
          authDomain: 'news-vf.firebaseapp.com',
          databaseURL: 'https://news-vf-default-rtdb.firebaseio.com',
          projectId: 'news-vf',
          storageBucket: 'news-vf.appspot.com',
          messagingSenderId: '972542800946',
          appId: '1:972542800946:web:f01a06eae96951773f382b',
          measurementId: 'G-KE43EED5K1',
        })
        const db = getDatabase(app)
        set(ref(db, '/arhive/'), null)
        console.log('post')
      }, 600)
    },
    upgradeMyPost(myPost) {
      this.myPost = myPost
      this.showUpdateNews = true
      console.log(myPost)
    },
    async updatePost(updatePost) {
      const app = initializeApp({
        apiKey: 'AIzaSyBR72w8SfdXJKEZVaUlEGc3DPPzYg-aXrk',
        authDomain: 'news-vf.firebaseapp.com',
        databaseURL: 'https://news-vf-default-rtdb.firebaseio.com',
        projectId: 'news-vf',
        storageBucket: 'news-vf.appspot.com',
        messagingSenderId: '972542800946',
        appId: '1:972542800946:web:f01a06eae96951773f382b',
        measurementId: 'G-KE43EED5K1',
      })
      const db = getDatabase(app)
      let id = updatePost.id
      await set(ref(db, '/news/' + `${id}`), {
        id: updatePost.id,
        avtor: updatePost.avtor,
        email: updatePost.email,
        title: updatePost.title,
        body: updatePost.body,
      })
      console.log(updatePost)
      this.showUpdateNews = false
    },

    showMyPost(myPost) {
      this.showNewsMy = myPost
      this.allPostsShow = false
      this.itemIdOne = false
      window.scrollTo(0, 0)
    },
    closeNewshow() {
      this.showNews = ''
      this.allPostsShow = true
      window.scrollTo(0, 0)
    },

    createdPost() {
      this.visibleDialog = true
    },
    chenchPage(pageCount) {
      this.page = pageCount
      console.log(pageCount)
    },
    async fetchPost() {
      try {
        this.isPostLoading = true
        setTimeout(async () => {
          const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts',
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
          )
          const respComment = await axios.get(
            'https://jsonplaceholder.typicode.com/comments'
          )
          const respUsers = await axios.get(
            'https://jsonplaceholder.typicode.com/users'
          )
          this.totalPages = Math.ceil(
            response.headers['x-total-count'] / this.limit
          )
          const app = initializeApp({
            apiKey: 'AIzaSyBR72w8SfdXJKEZVaUlEGc3DPPzYg-aXrk',
            authDomain: 'news-vf.firebaseapp.com',
            databaseURL: 'https://news-vf-default-rtdb.firebaseio.com',
            projectId: 'news-vf',
            storageBucket: 'news-vf.appspot.com',
            messagingSenderId: '972542800946',
            appId: '1:972542800946:web:f01a06eae96951773f382b',
            measurementId: 'G-KE43EED5K1',
          })
          const db = getDatabase(app)
          const starCountRef = ref(db, '/news/')
          onValue(starCountRef, (snapshot) => {
            this.myPosts = snapshot.val()
          })
          const starCountRefAr = ref(db, '/arhive/')
          onValue(starCountRefAr, (snapshot) => {
            this.arhive = snapshot.val()
          })
          this.posts = response.data
          this.users = respUsers.data
          this.comments = respComment.data
          this.isPostLoading = false
          if (this.myPosts) {
            this.countObj = Object.keys(this.myPosts).length
          } else {
            this.countObj = 0
          }
        }, 600)
      } catch (e) {
        alert('Не удалось загрузить данные с сервера')
      }
    },
  },
  mounted() {
    this.fetchPost()
    setInterval(() => {
      this.date =
        new Date().toLocaleTimeString() + ' ' + new Date().toLocaleDateString()
    }, 1000)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((a, b) =>
        a[this.selectedSort]?.localeCompare(b[this.selectedSort])
      )
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((p) =>
        p.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
  },
  watch: {
    page() {
      this.fetchPost()
    },
  },
}
</script>

<style scoped>
li {
  list-style-type: none;
}
ul {
  margin-left: 0;
  padding-left: 0;
}
h2 {
  align-self: center;
}

.timeTitle {
  display: block;
  position: absolute;
  right: 20px;
  top: 20px;
}
.dotsActions {
  display: flex;
  width: auto;
  height: 30px;
  background-color: whitesmoke;
  color: seagreen;
  justify-content: flex-end;
  align-items: center;
  text-decoration: underline;
  cursor: pointer;
}
.activePage:active,
.activePage:hover,
.activePage:focus {
  border: 2px solid seagreen;
}
.pageContainer > .pages:nth-of-type(n + 10) {
  display: none;
}

.container {
  background-color: whitesmoke;
  display: flex;
  padding: 60px 20px;
  margin-bottom: 40px;
  border-radius: 5px;
  flex-direction: column;
  align-items: stretch;
}
.count {
  position: relative;
  margin-top: 10px;
  width: 100%;
  display: flex;
  color: black;
  flex-direction: column;
  align-items: center;
}
hr {
  width: 25vw;
}
.searchInput {
  width: 300px;
  background-color: transparent;
  background-size: contain;
  background-position: 90%;
  background-image: url(https://cdn-icons-png.flaticon.com/512/751/751463.png);
  background-repeat: no-repeat;
  border-radius: 0px;
}
.searching {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.addpost_form {
  word-wrap: break-word;
  margin-top: 30px;
  text-align: left;
  width: auto;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.myBTN {
  width: 100%;
  display: flex;
  padding: 0px;
  margin: 10px 0px;
  flex-direction: row;
  justify-content: space-between;
  border: 0px;
  border-radius: 5px;
  box-shadow: none;
}
.myBTN_addTsk {
  width: 200px;
  display: flex;
  margin: 10px 0px;
  flex-direction: column;
  align-items: center;
  border: 0px;
  box-shadow: none;
}
.sorted {
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.openNew {
  margin-bottom: 100px;
  margin-top: 100px;
  text-align: center;
}

.btn {
  border: 1px solid black;
  width: 200px;
  height: 40px;
  color: black;
  background-color: whitesmoke;
}
@media (max-width: 640px) {
  .addpost_form {
    word-wrap: break-word;
    margin-top: 30px;
    text-align: left;
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .dialog__content {
    margin: auto;
    background: whitesmoke;
    border-radius: 5px;
    display: flex;
    padding: 20px;
    z-index: 1000;
    flex-direction: column;
    align-items: center;
  }
  .myBTN {
    width: 100%;
    display: flex;
    padding: 20px 0px;
    margin: 10px 0px;
    flex-direction: column;
    align-items: center;
    border: 2px solid seagreen;
    border-radius: 5px;
    box-shadow: 0px 0px 3px darkorchid;
  }
  .btn {
    width: 200px;
    height: 40px;
    color: black;
    background-color: whitesmoke;
    border: 1px solid seagreen;
    border-radius: 5px;
    box-shadow: 0px 0px 2px darkorchid;
  }
  .myBTN_addTsk {
    width: auto;
    display: flex;
    flex-direction: column;
    padding: 0px;
    margin: 0px 0px;
    align-items: center;
  }
  .sorted {
    width: 200px;
    display: flex;
    flex-direction: column;
  }
}
</style>
