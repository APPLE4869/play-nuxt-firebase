export const getStorageDownloadImageUrl = (imagePath) => {
  const storageRef = firebase.storage().ref()
  const mountainImagesRef = storageRef.child(imagePath)

  return mountainImagesRef.getDownloadURL()
}

export const uploadImageToStorage = (filePath, uploadFile) => {
  const storageRef = firebase.storage().ref();
  const mountainImagesRef = storageRef.child(filePath);
  return mountainImagesRef.put(uploadFile)
}
