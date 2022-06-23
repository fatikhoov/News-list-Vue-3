<template>
  <div class="posts">
    <div class="elAll">
      <div class="elOne">
        № {{ arh.id }} <br />
        Автор:
        <strong> {{ arh.avtor }} <br /></strong>
      </div>
    </div>
    <div class="bodyNews">
      <h3>
        <strong style="color: darkred">{{ arh.title }}</strong>
      </h3>
      <strong>{{ arh.body }}<br /> </strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    arh: {
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
  padding: 0 10px 10px 10px;
  background-color: rgb(231, 231, 231);
}

.posts {
  cursor: pointer;
  gap: 10px;
  word-wrap: break-word;
  overflow: hidden;
  background-color: whitesmoke;
  margin: 10px;
  border: 2px solid seagreen;
  box-shadow: 0px 0px 4px rgb(153 50 204 / 50%);
  border-radius: 5px;
  text-align: left;
  width: 100%;
  min-width: 320px;
  height: fit-content;
  display: flex;
  flex-direction: column;
}
.posts:hover {
  margin: 9px;
  box-shadow: 0px 0px 4px rgba(153, 50, 204, 0.8);
  background-color: rgb(255, 255, 255);
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
