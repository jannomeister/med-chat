import { auth } from "../services/firebase";

const signup = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};

const signin = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};

const signInWithGoogle = () => {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithRedirect(provider);
};

const logout = () => {
  return auth().signOut();
};

export { signup, signin, signInWithGoogle, logout };
