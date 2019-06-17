<template>
  <div class="wrapper">
    <nav-bar />

    <div v-if="finishedAuthProcess" class="uk-container uk-container-small uk-margin-top uk-margin-bottom">
      <nuxt />
    </div>

    <div v-else class="uk-flex uk-flex-center uk-margin-xlarge-top">
      <div uk-spinner></div>
    </div>
  </div>
</template>

<script>
import { getStorageDownloadImageUrl } from "~/support/firebase/storage"
import NavBar from "~/components/NavBar.vue"
import SetProfileImageUrlMixins from "~/components/SetProfileImageUrlMixins.vue"
import Profile from "~/models/Profile"
import User from "~/models/User"

export default {
  components: { NavBar },
  mixins: [SetProfileImageUrlMixins],
  data: function () {
    return {
      finishedAuthProcess: false
    }
  },
  mounted: function () {
    const vm = this;
    firebase.auth().onAuthStateChanged(function(currentUserObject) {
      // ログイン済みの場合
      if (currentUserObject) {
        const { uid, email, displayName } = currentUserObject
        const user = new User({ uid, email, displayName })
        vm.$store.dispatch('user/login', user)
        vm.__authProcess()
        vm.__finishAuthProcess()
        return
      }

      if ($nuxt.$route.path !== "/") {
        vm.$nuxt.$router.push({ path: '/' })
      }
      vm.$store.dispatch('user/logout')
      vm.__finishAuthProcess()
    })
  },
  methods: {
    // 認証処理
    __authProcess: async function () {
      // プロフィール情報をStoreに保存
      const profile = await this.__getCurrentProfile()
      if (profile) {
        this.$store.dispatch('profile/setProfile', profile)
      }

      if (this.$store.getters["profile/isRegistered"]) {
        // プロフィール画像のURLをStoreに保存
        this.setProfileImageUrl()

        // 投稿一覧ページに遷移
        this.$nuxt.$router.push({ path: '/posts' })
      } else {
        // プロフィール登録画面に遷移
        this.$nuxt.$router.push({ path: '/profiles/new' })
      }
    },
    // 認証中ユーザーのプロフィールを取得
    __getCurrentProfile: async function () {
      const { user: currentUser } = this.$store.state.user

      if (!currentUser) {
        return null
      }

      return await Profile.findByUserUid(currentUser.uid)
    },
    __finishAuthProcess: function () {
      // 認証プロセスが完了するまでローディングを表示したいので、その表示・非表示の判定に利用している。
      this.finishedAuthProcess = true
    }
  }
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.wrapper {
  min-height: 100vh;
}
</style>
