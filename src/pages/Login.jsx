import React, { useState } from "react";
import { useForm } from "react-form";
import { signin, signInWithGoogle, signInWithTwitter } from "../helpers/auth";
import { isEmailValid } from "../helpers/utils";

// components
import CloseButton from "../components/CloseButton";
import Input from "../components/Input";

const Login = (props) => {
  const [onSubmitError, setOnSubmitError] = useState(null);
  const defaultValues = React.useMemo(
    () => ({
      email: "",
      password: "",
    }),
    []
  );

  const {
    Form,
    meta: { isSubmitting, isSubmitted, canSubmit, error },
  } = useForm({
    defaultValues,
    onSubmit: async (values, instance) => {
      setOnSubmitError(null);
      try {
        await signin(values.email, values.password);

        instance.reset();
      } catch (err) {
        if (err.code === "auth/user-not-found") {
          setOnSubmitError("Invalid Email or Password");
        } else if (err.code === "auth/invalid-email") {
          setOnSubmitError("Please provide a valid email address");
        } else {
          setOnSubmitError("Something went wrong. Please try again later");
        }
      }
    },
  });

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

  return (
    <div>
      <CloseButton onClose={() => props.history.replace("/")} />
      <div className="grid grids-1 gap-4 place-content-center max-w-md m-auto py-12">
        <h1 className="text-center text-4xl font-bold mb-6">Log in</h1>

        <Form>
          {error ? (
            <p className="text-center py-1 text-red-500 font-semibold border border-red-400 rounded mb-2">
              {error}
            </p>
          ) : onSubmitError ? (
            <p className="text-center py-1 text-red-500 font-semibold border border-red-400 rounded mb-2">
              {onSubmitError}
            </p>
          ) : null}

          <div>
            <Input
              field="email"
              placeholder="your@email.com"
              type="email"
              className="w-full px-4 pt-2 pb-2.5 border border-gray-300 rounded-full hover:border-indigo-400 focus:border-indigo-400"
              validate={async (value) => {
                if (!value) {
                  return "Email address is required";
                }

                if (!isEmailValid(value)) {
                  return "Please enter a valid email address";
                }

                return false;
              }}
            />
          </div>

          <div className="pt-2"></div>

          <div>
            <Input
              field="password"
              placeholder="your password"
              type="password"
              className="w-full px-4 pt-2 pb-2.5 border border-gray-300 rounded-full hover:border-indigo-400 focus:border-indigo-400"
              validate={async (value) => {
                if (!value) {
                  return "Password is required";
                }

                return false;
              }}
            />
          </div>

          <div className="pt-2"></div>

          <div>
            <button
              className="text-xl bg-white border border-gray-300 font-semibold pt-2 pb-2.5 rounded-full w-full hover:border-gray-400 hover:bg-gray-50"
              type="submit"
              disabled={!canSubmit}
            >
              <span className="text-black">
                {isSubmitting ? "Signing in..." : "Sign in"}
              </span>
            </button>
          </div>
        </Form>

        <button
          className="text-xl bg-blue-500 pt-2 pb-2.5 rounded-full"
          type="button"
          onClick={onTwitterSignin}
        >
          <span className="text-white">Sign in with Twitter</span>
        </button>

        <button
          className="text-xl bg-red-600 pt-2 pb-2.5 rounded-full"
          type="button"
          onClick={onGoogleSignin}
        >
          <span className="text-white">Sign in with Google</span>
        </button>

        <div className="pt-4"></div>

        <button
          className="font-semibold text-lg border border-gray-300 rounded-full py-1.5 px-4 hover:border-gray-400"
          onClick={(e) => props.history.push("/signup")}
        >
          Don't have an account? Click here to sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
