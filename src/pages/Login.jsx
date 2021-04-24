import React, { useState } from "react";
import {
  signInWithGoogle,
  signInWithTwitter,
  signInWithGithub,
  // signInWithFacebook,
} from "../helpers/auth";

// components
import {
  GoogleSigninButton,
  TwitterSigninButton,
  FacebookSigninButton,
  GithubSigninButton,
} from "../components/SigninButtons";
import {
  AccountAlreadyExistModal,
  GeneralErrorModal,
} from "../components/Modals";
import Footer from "../components/Footer";

const Login = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);

  const onError = (err) => {
    const ignoredErrors = [
      "auth/popup-closed-by-user",
      "auth/cancelled-popup-request",
    ];

    // do nothing
    if (ignoredErrors.includes(err.code)) return;

    if (err.code === "auth/account-exists-with-different-credential") {
      setOpenModal(true);
    } else {
      console.log("err: ", err);
      setOpenErrorModal(true);
    }
  };

  const onTwitterSignin = async () => {
    try {
      await signInWithTwitter();

      props.history.replace("/e/groups");
    } catch (err) {
      onError(err);
    }
  };

  const onGoogleSignin = async () => {
    try {
      await signInWithGoogle();

      console.log();

      // props.history.replace("/e/groups");
    } catch (err) {
      onError(err);
    }
  };

  const onGithubSignin = async () => {
    try {
      await signInWithGithub();

      // props.history.replace("/e/groups");
    } catch (err) {
      onError(err);
    }
  };

  // TODO implement logic and fix the bug
  // const onFacebookSignin = async () => {
  //   try {
  //     await signInWithFacebook();

  //     props.history.replace("/e/groups");
  //   } catch (err) {
  //     onError(err);
  //   }
  // };

  return (
    <>
      <AccountAlreadyExistModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

      <GeneralErrorModal
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
      />

      <div className="flex items-center justify-center h-screen">
        <div className="grid grids-1 gap-4 w-96 py-12">
          <h1 className="text-center text-4xl font-bold mb-6">Log in</h1>

          <GoogleSigninButton onClick={onGoogleSignin} />

          <TwitterSigninButton onClick={onTwitterSignin} />

          <GithubSigninButton onClick={onGithubSignin} />

          <FacebookSigninButton
            onClick={() =>
              window.alert("Oopss! Not yet available at the moment")
            }
            // onClick={onFacebookSignin}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Login;
