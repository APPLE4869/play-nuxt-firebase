import Base from "~/models/Base"
const uuidv4 = require('uuid/v4');

class Profile extends Base {
  constructor({ id, imagePath, name, content }) {
    super()
    this.id = id
    this.imagePath = imagePath
    this.name = name
    this.content = content
  }

  updateProfile({ imagePath, name, content }) {
    this.imagePath = imagePath
    this.name = name
    this.content = content

    Base.dbCollection('profile').doc(this.id).set({
      imagePath,
      name,
      content,
    }, { merge:true })
    .catch((err) => {
      console.error('Error: Add Document', err)
      throw err
    })

    return this
  }

  toHash() {
    return {
      id: this.id,
      imagePath: this.imagePath,
      name: this.name,
      content: this.content,
    }
  }

  static generateNewImagePath() {
    return `images/profile/${uuidv4()}.jpg`
  }

  static fromHash({ id, imagePath, name, content }) {
    return new Profile({ id, imagePath, name, content })
  }

  static findByUserUid(userUid) {
    return Base.dbCollection('profile')
      .where('userUid', '==', userUid)
      .get()
      .then(function (snapshot) {
        if (snapshot.docs.length === 0) {
          return null
        }

        const doc = snapshot.docs[snapshot.docs.length - 1]
        return new Profile({ id: doc.id, ...doc.data() })
      })
  }

  static registerProfile({ userUid, imagePath, name, content }) {
    return Base.dbCollection('profile').add({
      userUid,
      imagePath,
      name,
      content,
      createdAt: new Date(),
    })
    .then((doc) => {
      return Profile.fromHash({ id: doc.id, imagePath, name, content })
    })
    .catch((err) => {
      console.error('Error: Add Document', err)
      throw err
    })
  }
}

export default Profile
