<script>
import { getStorageDownloadImageUrl } from "~/support/firebase/storage"

// TODO : ここのコンポーネントがわざわざプロフィールのURLだけ切り出していて行けていないので、
// URLはProfileに遅延読み込みするように改修する。
export default {
  methods: {
    // プロフィール画像のURLをStoreに保存
    setProfileImageUrl: async function () {
      // プロフィール画像のURLを生成
      const profile = this.$store.getters["profile/getProfile"]
      const downloadImageUrl = await getStorageDownloadImageUrl(profile.imagePath)

      this.$store.dispatch('profileImage/setUrl', { url: downloadImageUrl })
    },
  }
}
</script>
