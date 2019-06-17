<template>
  <div>
    <page-title text="プロフィール登録" />
    <profile-form :profile="null" :submit="submit" formType="ADD" />
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
      const userUid = this.$store.getters["user/getUser"].uid
      const name = profileName
      const content = profileContent

      const profile = await Profile.registerProfile({ userUid, imagePath, name, content })
      this.$store.dispatch('profile/setProfile', profile)
      this.setProfileImageUrl()

      this.$nuxt.$router.push({ path: '/posts' })
    }
  }
}
</script>

<style>
</style>
