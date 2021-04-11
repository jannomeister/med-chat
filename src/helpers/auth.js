import { auth } from "../services/firebase";

const currUser = () => {
  return auth().currentUser;
};

const signup = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

const signin = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

const signInWithGoogle = () => {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
};

const signInWithTwitter = () => {
  const provider = new auth.TwitterAuthProvider();
  return auth().signInWithPopup(provider);
};

const signInWithGithub = () => {
  const provider = new auth.GithubAuthProvider();
  return auth().signInWithPopup(provider);
};

const logout = () => {
  return auth().signOut();
};

export {
  currUser,
  signup,
  signin,
  signInWithGoogle,
  signInWithTwitter,
  signInWithGithub,
  logout,
};
