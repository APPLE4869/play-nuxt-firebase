<template>
  <nav class="uk-navbar-container tm-navbar-container uk-sticky uk-sticky-fixed" uk-navbar>
    <div class="uk-navbar-left">
      <a class="uk-navbar-item uk-logo">Logo</a>
    </div>
    <div class="uk-navbar-right">
      <nuxt-link v-if='hasProfileImage' to="/profiles/edit">
        <div class="icon uk-margin-small-right" :style="`background-image: url(${$store.state.profileImage.url})`" />
      </nuxt-link>

      <div class="uk-margin-small-right">
        <div v-if='!$store.getters["user/isAuthenticated"]' class="uk-button uk-button-secondary uk-button-small" @click="login">
          <span uk-icon="sign-in"></span>
          ログイン
        </div>
        <div v-else class="uk-button uk-button-default uk-button-small" @click="logout">
          <span uk-icon="sign-out"></span>
          <span class="pc-only">
            ログアウト
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    login: function () {
      // Googleログイン
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    logout: function () {
      this.$store.dispatch('user/logout')
      firebase.auth().signOut()
      this.$nuxt.$router.push({ path: '/' })
    },
  },
  computed: {
    hasProfileImage() {
      return this.$store.getters["user/isAuthenticated"] && this.$store.state.profileImage.url
    }
  }
}
</script>

<style scoped>
.pc-only {
  display: none;
}

.icon {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-size: cover;
}

@media screen and (min-width:480px) {
  .pc-only {
    display: inline;
  }

  .icon {
    height: 50px;
    width: 50px;
  }
}
</style>
