<template>
  <div>
    <page-title text="プロフィール編集" />

    <div class="uk-flex uk-flex-right uk-margin-bottom">
      <nuxt-link to="/posts">投稿一覧</nuxt-link>
    </div>

    <profile-form :profile="profile" :submit="submit" formType="EDIT" />
  </div>
</template>

<script>
import PageTitle from "~/components/PageTitle.vue"
import ProfileForm from "~/components/ProfileForm.vue"
import SetProfileImageUrlMixins from "~/components/SetProfileImageUrlMixins.vue"
import Profile from "~/models/Profile"

export default {
  components: { PageTitle, ProfileForm },
  mixins: [SetProfileImageUrlMixins],
  methods: {
    submit: async function ({ imagePath, profileName, profileContent }) {
      const name = profileName
      const content = profileContent
      const profile = this.profile

      profile.updateProfile({ imagePath, name, content })
      this.$store.dispatch('profile/setProfile', profile)
      this.setProfileImageUrl()

      this.$nuxt.$router.push({ path: '/posts' })
    },
  },
  computed: {
    profile() {
      return this.$store.getters["profile/getProfile"]
    }
  }
}
</script>

<style>
</style>
