class User {
  constructor({ uid, email, displayName }) {
    this.uid = uid
    this.email = email
    this.displayName = displayName
  }

  toHash() {
    return {
      uid: this.uid,
      email: this.email,
      displayName: this.displayName,
    }
  }
}

export default User
