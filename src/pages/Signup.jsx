import React, { useState } from "react";
import { useForm } from "react-form";
import { signup } from "../helpers/auth";
import { isEmailValid, isPasswordValid } from "../helpers/utils";

// components
import CloseButton from "../components/CloseButton";
import Input from "../components/Input";

const Signup = (props) => {
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
        await signup(values.email, values.password);

        instance.reset();
      } catch (err) {
        setOnSubmitError("Email already exists");
      }
    },
  });

  return (
    <div>
      <CloseButton onClose={() => props.history.replace("/")} />
      <div className="grid grids-1 gap-4 place-content-center max-w-md m-auto py-12">
        <h1 className="text-center text-4xl font-bold mb-6">Sign up</h1>

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

                if (!isPasswordValid(value)) {
                  return "Password is too weak";
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
                {isSubmitting ? "Signing up..." : "Sign up"}
              </span>
            </button>
          </div>
        </Form>

        <div className="pt-4"></div>

        <button
          className="font-semibold text-lg border border-gray-300 rounded-full py-1.5 px-4 hover:border-gray-400"
          onClick={(e) => props.history.push("/login")}
        >
          Existing user? Click here to log in
        </button>
      </div>
    </div>
  );
};

export default Signup;
