<template>
  <div>
    <page-title text="投稿" />

    <div class="uk-flex uk-flex-right uk-margin-bottom">
      <nuxt-link to="/posts">投稿一覧</nuxt-link>
    </div>

    <form class="uk-form-stacked">
      <div class="uk-margin-large-bottom">
        <label class="uk-form-label">内容</label>
        <textarea v-model="content" placeholder="投稿" class="uk-height-medium uk-textarea" row="10"></textarea>
      </div>
      <div class="uk-flex uk-flex-center">
        <button @click="submit" type="button" class="uk-button uk-button-primary">登録する</button>
      </div>
    </form>
  </div>
</template>

<script>
import PageTitle from "~/components/PageTitle.vue"
import Post from "~/models/Post"

export default {
  components: { PageTitle },
  data: function () {
    return {
      content: "",
    }
  },
  methods: {
    submit: async function () {
      if (!this.content) {
        alert("内容が未入力です")
        return
      }

      const user = this.$store.getters["user/getUser"]
      const profile = this.$store.getters["profile/getProfile"]
      const content = this.content
      await Post.registerPost({ user, profile, content })

      this.$nuxt.$router.push({ path: '/posts' })
    },
  }
}
</script>

<style>
</style>
