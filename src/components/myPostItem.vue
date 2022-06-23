<template>
  <div class="myPosts">
    <div class="elAll">
      <div class="elOne">
        № {{ myPost.id }} <br />
        Автор:
        <strong> {{ myPost.avtor }} <br /></strong>
      </div>
      <div>
        <a class="elBtn" @click="$emit('removeMy', myPost)"> Удалить </a>
      </div>
    </div>
    <div class="bodyNews">
      <div class="elTwo">
        <h3 @click="$emit('showingMy', myPost)">
          <strong style="color: darkred">{{ myPost.title }}</strong>
        </h3>
        <a class="elBtn" @click="$emit('upgradeMy', myPost)"> Редактировать </a>
      </div>
      <strong @click="$emit('showingMy', myPost)"
        >{{ myPost.body }}<br /><br /><a class="onebtn">
          Читать комментарии..
        </a>
      </strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-post-item',
  props: {
    myPost: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.elAll {
  display: flex;
  padding: 10px 10px 0 10px;
  flex-direction: row;
  justify-content: space-between;
}
.elTwo {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
}
.elBtn {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
}
.elBtn:hover {
  color: black;
}

strong {
  padding: 0px 0px;
}

.bodyNews {
  padding: 10px;
  background-color: rgb(231, 231, 231);
}

.myPosts {
  cursor: pointer;
  gap: 10px;
  word-wrap: break-word;
  overflow: hidden;
  background-color: rgba(46, 139, 86, 0.2);
  margin: 10px;
  border: 2px solid rgba(46, 139, 86, 0.8);
  box-shadow: 0px 0px 4px rgb(153 50 204 / 50%);
  border-radius: 5px;
  text-align: left;
  width: 40vw;
  min-width: 320px;
  height: fit-content;
  display: flex;
  flex-direction: column;
}
.myPosts:hover {
  margin: 9px;
  box-shadow: 0px 0px 4px rgba(153, 50, 204, 0.8);
  background-color: rgba(46, 139, 86, 0.2);
  border: 3px solid seagreen;
}
.btn {
  border: 1px solid darkorchid;
  border-top: 1px solid darkgray;
  border-radius: 0px;
  width: 100%;
  height: 40px;
  color: white;
  background-color: rgba(153, 50, 204, 0.8);
}
.onebtn {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.6);
}
.onebtn:hover {
  color: black;
}
</style>
