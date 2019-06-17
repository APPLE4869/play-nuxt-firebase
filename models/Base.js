class Base {
  static dbCollection(collectionName) {
    return firebase.firestore().collection(collectionName)
  }
}

export default Base
