import Base from "~/models/Base"
import { getStorageDownloadImageUrl } from "~/support/firebase/storage"

class Post extends Base {
  constructor({ id, profileImagePath, profileName, content, createdAt }) {
    super()
    this.id = id
    this.profileImagePath = profileImagePath
    this.profileImageUrl = null
    this.profileName = profileName
    this.content = content
    this.createdAt = createdAt
  }

  // TODO : Firebaseの仕様上、アクセス用のURLを１つずつ取得する必要があるので、画像URLだけは遅延読み込みで格納する。
  // loadDownloadImageUrl() {
  //   return getStorageDownloadImageUrl(this.profileImagePath).then((downloadImageUrl) => {
  //     const newPost = this.copy()
  //     newPost.profileImageUrl = downloadImageUrl
  //     return newPost
  //   })
  // }

  copy() {
    return Object.assign({}, this)
  }

  toHash() {
    return {
      id: this.id,
      profileImagePath: this.profileImagePath,
      profileName: this.profileName,
      content: this.content,
      createdAt: this.createdAt,
    }
  }

  getJpDate() {
    const date = this.createdAt.toDate()
    return `${date.getFullYear()}年${date.getMonth()}月${date.getDate()}日`
  }

  // TODO : 以下の資料を参考にoffsetを実装する。
  // @see https://firebase.google.com/docs/firestore/query-data/query-cursors?hl=ja
  static findAllPosts(limit=100) {
    return Base.dbCollection('post')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get()
      .then((snapshot) => {
        // snapshotがただの配列ではなくmap関数は利用できないため、止む無くforEachを利用している。
        const posts = []
        snapshot.forEach(function (doc) {
          posts.push(new Post({ id: doc.id, ...doc.data() }))
        })
        return posts
      })
  }

  static registerPost({ user, profile, content }) {
    const userUid = user.uid
    const profileImagePath = profile.imagePath
    const profileName = profile.name
    const createdAt = new Date()

    return Base.dbCollection('post').add({
      userUid,
      profileImagePath,
      profileName,
      content,
      createdAt,
    })
    .then((doc) => {
      return new Post({ id: doc.id, profileImagePath, profileName, content, createdAt })
    })
    .catch((err) => {
      console.error('Error: Add Document', err)
      throw err
    })
  }
}

export default Post
