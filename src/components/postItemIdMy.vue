<template>
  <div class="conte">
    <div class="close" @click="$emit('closeNews', true)">
      <strong>Закрыть</strong>
    </div>
    <div class="about_news">
      <div class="postId">НОВОСТЬ № {{ postingMy.id }}</div>
      <div class="Text">
        <h2 @click="filterComments">
          {{ postingMy.title }}
        </h2>
        <strong>
          {{ postingMy.body }}
          <br /><br
        /></strong>
        Автор:
        <strong>
          {{ postingMy.avtor }}
          <br
        /></strong>
        E-mail:
        <strong>{{ postingMy.email }} <br /></strong>
      </div>
    </div>

    <h3>Комментарии поста</h3>
    <div class="comments">
      <strong>Комментариев еще нет..</strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    postingMy: {
      type: Object,
      required: true,
    },
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
  border: 2px solid seagreen;
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
