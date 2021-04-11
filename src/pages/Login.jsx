import React from "react";
import {
  signInWithGoogle,
  signInWithTwitter,
  signInWithGithub,
} from "../helpers/auth";

// components
import {
  GoogleSigninButton,
  TwitterSigninButton,
  FacebookSigninButton,
  GithubSigninButton,
} from "../components/SigninButtons";
import CloseButton from "../components/CloseButton";

const Login = (props) => {
  const onTwitterSignin = async () => {
    try {
      await signInWithTwitter();

      props.history.replace("/e/groups");
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const onGoogleSignin = async () => {
    try {
      await signInWithGoogle();

      props.history.replace("/e/groups");
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const onGithubSignin = async () => {
    try {
      await signInWithGithub();

      props.history.replace("/e/groups");
    } catch (err) {
      if (err.code === "auth/account-exists-with-different-credential") {
        window.alert(err.message);
      } else {
        console.log("err: ", err);
      }
    }
  };

  return (
    <div>
      <CloseButton onClose={() => props.history.replace("/")} />
      <div className="grid grids-1 gap-4 max-w-sm m-auto py-12">
        <h1 className="text-center text-4xl font-bold mb-6">Log in</h1>

        <GoogleSigninButton onClick={onGoogleSignin} />

        <TwitterSigninButton onClick={onTwitterSignin} />

        <GithubSigninButton onClick={onGithubSignin} />

        <FacebookSigninButton
          onClick={() => window.alert("Oopss! Not yet available at the moment")}
        />
      </div>
    </div>
  );
};

export default Login;
