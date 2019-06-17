<template>
  <div>
    <page-title text="投稿一覧" />

    <div class="uk-flex uk-flex-right uk-margin-bottom">
      <nuxt-link to="/posts/new">投稿する</nuxt-link>
    </div>

    <ul class="uk-comment-list">
      <li :key="post.id" v-for="post in posts">
        <div class="uk-comment uk-margin-bottom">
          <header class="uk-comment-header uk-position-relative">
            <div class="uk-grid-medium uk-flex-middle" uk-grid>
              <div class="uk-width-auto">
                <img class="uk-comment-avatar" :src="post.profileImageUrl || 'https://pbs.twimg.com/profile_images/818852933483823104/YYr9qgV8_400x400.jpg'" width="80" height="80">
              </div>
              <div class="uk-width-expand">
                <h4 class="uk-comment-title uk-margin-remove">{{post.profileName}}</h4>
                <p class="uk-comment-meta uk-margin-remove-top">{{post.getJpDate()}}</p>
              </div>
            </div>
          </header>
          <div class="uk-comment-body">
            <p>{{post.content}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import PageTitle from "~/components/PageTitle.vue"
import Post from "~/models/Post"

export default {
  components: { PageTitle },
  mounted: async function () {
    this.$store.dispatch('post/resetPosts')

    const posts = await Post.findAllPosts()

    // TODO : postにprofileの情報を持たせるようにして、cloud functionsでprofileの更新時にpostの方も更新するようにする。

    this.$store.dispatch('post/mergePosts', posts)

    // const vm = this
    // posts.forEach(function (post, i) {
    //   console.log(i)
    //   post.loadDownloadImageUrl().then(function (newPost) {
    //     console.log(newPost.profileImageUrl)
    //     vm.$set(vm.posts, i, newPost)
    //   });
    // })
  },
  computed: {
    posts() {
      return this.$store.getters["post/getPosts"]
    }
  }
}

</script>

<style>
</style>
