<template>
  <div class="container_list">
    <div class="arhPag">
      <div>
        <p class="paginateTwo">
          Новостей cозданно ({{ countObj }})<br />Подгруженно с сервера ({{
            countPosts
          }})
        </p>
      </div>
      <div>
        <my-button class="btn" @click="showArhive">
          Удаленные новости
        </my-button>
      </div>
    </div>

    <div class="addpost_form">
      <my-dialog v-model:show="visibleDialog">
        <h3>Удаленные новости</h3>
        <div class="arh" v-if="this.arhive">
          <div class="elTwo">
            <a class="elBtn" @click="$emit('clearArh', post)">
              Очистить архив
            </a>
          </div>
          <arhive-post-item v-for="arh in arhive" :arh="arh" :key="arh.id">
          </arhive-post-item>
        </div>
        <div v-else>
          <h5>Архив пуст</h5>
        </div>
      </my-dialog>
    </div>

    <div class="pageContainer">
      <div class="itemsPage">
        <div
          v-for="pageCount in totalPages"
          :key="pageCount"
          class="pages"
          :class="{ activePage: page === pageCount }"
          @click="$emit('chenchPage', pageCount)"
        >
          {{ pageCount }}
        </div>
      </div>
    </div>

    <transition-group class="listGroup" name="list" tag="div">
      <post-item
        class="post"
        v-for="post in posts"
        :post="post"
        :key="post.id"
        @showing="$emit('showing', post)"
        @remove="$emit('remove', post)"
        :user="usering"
      ></post-item>
    </transition-group>
    <hr />
    <transition-group class="listGroup" name="listTwo" tag="div">
      <my-post-item
        class="myPost"
        v-for="myPost in myPosts"
        :myPost="myPost"
        :key="myPost.id"
        @showingMy="$emit('showingMy', myPost)"
        @removeMy="$emit('removeMy', myPost)"
        @upgradeMy="$emit('upgradeMy', myPost)"
      ></my-post-item>
    </transition-group>
  </div>
</template>

<script>
import postItem from '@/components/postItem.vue'
import MyPostItem from './myPostItem.vue'
import ArhivePostItem from './arhivePostItem.vue'
export default {
  components: { postItem, MyPostItem, ArhivePostItem },
  props: {
    page: Number,
    totalPages: Number,
    posts: {
      type: Array,
      required: true,
    },
    myPosts: {
      type: [Object, null],
      required: true,
    },
    usering: {
      type: Array,
      required: true,
    },
    countPosts: Number,
    arhive: {
      type: [Object, null],
      required: true,
    },
  },
  data() {
    return {
      countObj: 0,
      isList: true,
      visibleDialog: false,
    }
  },
  methods: {
    showArhive() {
      this.visibleDialog = true
    },
    async couted() {
      await setTimeout(() => {
        if (this.myPosts) {
          this.countObj = Object.keys(this.myPosts).length
        } else {
          this.countObj = 0
        }
      }, 1000)
    },
  },
  async mounted() {
    await this.couted()
  },
}
</script>

<style scoped>
.arh {
  display: flex;
  flex-direction: column;
}
.arhPag {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.btn {
  width: 200px;
  height: 35px;
  border: 1px solid black;
}
.elBtn {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
}
.elBtn:hover {
  color: black;
}

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
.itemsPage {
  display: flex;
  position: relative;
  left: 0px;
  margin: 8px 0px;
}
.pageContainer {
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: auto;
  justify-content: flex-start;
  align-items: center;
}
.pages {
  border: 1px solid seagreen;
  margin: 4px;
  border-radius: 5px;
  width: 20px;
  padding: 2px;
  text-align: center;
  background: white;
  cursor: pointer;
}
.activePage {
  border: 2px solid rgba(46, 139, 86, 0.4);
  background: rgba(46, 139, 86, 0.6);
  margin: 3px;
}
.paginateTwo {
  margin: 0px;
  text-align: left;
}
.btnList {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
.btnList > .btn {
  border: 1px solid black;
  padding: 8px 14px;
}
.btnList > .btn:hover {
  border: 0px solid black;
  padding: 9px 15px;
}
.container_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.listGroup {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  flex-direction: row;
  margin-top: 20px;
  justify-content: space-between;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.list-move {
  transition: transform 0.6s ease;
}
.elTwo {
  align-self: flex-end;
}
</style>
