<template>
  <div class="allPostFormOne">
    <h1 class="title_Text">Создать новость</h1>
    <p style="text-align: center; opacity: 0.5">(поля без валидации)</p>
    <form class="form" @submit.prevent>
      <my-input
        v-focus
        v-model="post.title"
        placeholder="Заголовок"
        type="text"
      />
      <my-textarea v-model="post.body" placeholder="Описание" type="text" />
      <br />
      <my-input v-model="post.name" placeholder="Имя автора" type="text" />
      <my-input v-model="post.email" placeholder="Почта" type="text" />
      <br />
      <div class="addPost">
        <my-button class="btn" @click="createPost">Опубликовать</my-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        id: '',
        title: '',
        body: '',
        name: '',
        email: '',
      },
    }
  },
  methods: {
    createPost() {
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: '',
        name: '',
        email: '',
      }
      console.log(this.post)
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
