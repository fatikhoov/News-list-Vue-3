<template>
  <div class="conte">
    <div class="close" @click="$emit('closeNews', true)">
      <strong>Закрыть</strong>
    </div>
    <div class="about_news">
      <div class="postId">НОВОСТЬ № {{ posting.id }}</div>
      <div class="Text">
        <h2 @click="filterComments">
          {{ posting.title }}
        </h2>
        <strong>
          {{ posting.body }}
          <br /><br
        /></strong>
        Автор:
        <strong>
          {{ usering[posting.userId - 1].name }}
          <br
        /></strong>
        E-mail:
        <strong>{{ usering[posting.userId - 1].email }} <br /></strong>
      </div>
    </div>

    <h3>Комментарии поста</h3>
    <div class="comments">
      <div class="comment_cerd" v-for="commEl in comm" :key="commEl">
        <div class="decor">{{ commEl.name }}</div>
        <strong> {{ commEl.body }} </strong> <br /><br />
        <div class="person_comment">
          <strong>{{ commEl.email }} </strong><br /><br />
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    posting: {
      type: Object,
      required: true,
    },
    usering: {
      type: Array,
      required: true,
    },
    commenting: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      comm: [],
      commt: [],
    }
  },
  methods: {
    filterComments() {
      this.comm = this.commenting
      this.comm = this.comm.filter((el) => el.postId == this.posting.id)
    },
  },
  mounted() {
    this.filterComments()
  },
}
</script>

<style scoped>
.decor {
  text-decoration: underline;
}
.postId,
h3 {
  align-self: center;
}
.comment_cerd {
  margin: 10px 0;
  height: auto;
}
.conte {
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.about_news,
.comments {
  height: auto;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
  overflow: hidden;
  background-color: whitesmoke;
  border: 2px solid rgba(46, 139, 86, 0.4);
  box-shadow: 0px 0px 4px rgb(153 50 204 / 10%);
  border-radius: 5px;
  padding: 10px;
}
.about_news {
  color: black;
  background-color: rgba(46, 139, 86, 0.4);
  border: 0px;
  padding: 20px;
}

.about_news h2 {
  color: black;
}
.close {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: rgba(0, 0, 0, 0.6);
}
.close > strong {
  cursor: pointer;
}
.close:hover {
  color: seagreen;
}
</style>
