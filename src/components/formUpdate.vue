<template>
  <div class="allPostFormOne">
    <h1 class="title_Text">Редактировать новость № {{ myPost.id }}</h1>
    <p style="text-align: center; opacity: 0.5">(поля без валидации)</p>
    <form class="form" @submit.prevent>
      <my-input
        v-focus
        v-model="postUpdate.title"
        placeholder="Заголовок"
        type="text"
      />
      <my-textarea
        v-model="postUpdate.body"
        placeholder="Описание"
        type="text"
      />
      <br />
      <p>Автор: {{ myPost.avtor }}<br />Почта: {{ myPost.email }}</p>
      <br />
      <div class="addPost">
        <my-button class="btn" @click="updatePost">Изменить</my-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    myPost: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      postUpdate: {
        id: '',
        title: '',
        body: '',
        avtor: '',
        email: '',
      },
    }
  },
  methods: {
    updatePost() {
      this.postUpdate = {
        id: this.myPost.id,
        title: this.postUpdate.title,
        body: this.postUpdate.body,
        avtor: this.myPost.avtor,
        email: this.myPost.email,
      }
      this.$emit('updatePost', this.postUpdate)
      console.log(this.postUpdate)
    },
  },
}
</script>

<style scoped>
label {
  margin: 0px 6px;
}
input {
  margin: 0px;
}
.btnConta {
  margin-top: 20px;
}

.multiple-checkboxes {
  margin: 10px;
}

.strong-text {
  margin-left: 10px;
  margin-top: 10px;
}
.form {
  display: flex;
  flex-direction: column;
}
.addPost {
  display: flex;
  justify-content: center;
  border: 0px;
}

.Text {
  margin: 10px 10px 0px 10px;
}
.Text-color {
  color: darkred;
}

h3 {
  font-size: 20px;
  color: black;
  font-style: normal;
}
.allPostFormOne {
  width: 370px;
  height: auto;
  word-wrap: break-word;
  border-radius: 5px;
  margin: 30px 0px;
  background-color: whitesmoke;
  overflow: hidden;
}
.btn {
  border: 1px solid darkorchid;
  border-top: 1px solid darkgray;
  width: 100%;
  height: 40px;
  color: white;
  border-radius: 0px;
  background-color: darkorchid;
}
</style>
