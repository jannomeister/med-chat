import React, { useState, useEffect } from "react";
import { useForm } from "react-form";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { addGroup } from "../helpers/db";

// components
import Input from "./Input";
import Textarea from "./Textarea";

const CreateGroup = (props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();
  const { url, path } = useRouteMatch();
  const location = useLocation();
  const [onSubmitError, setOnSubmitError] = useState(null);
  const defaultValues = React.useMemo(
    () => ({
      name: "",
      description: "",
      avatar: "",
      banner: "",
    }),
    []
  );
  const {
    Form,
    meta: { isSubmitting, isSubmitted, canSubmit, error },
  } = useForm({
    defaultValues,
    onSubmit: async (values, instance) => {
      try {
        await addGroup({
          name: values.name,
          description: values.description,
          avatar: values.avatar,
          banner: values.banner,
        });
        instance.reset();
        setIsSuccess(true);
      } catch (err) {
        setOnSubmitError(
          err.message ?? "Something went wrong. Please try again later"
        );
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      history.push("/e");
    }
  }, [isSuccess]);

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-2xl w-full h-auto border mt-7 p-2 rounded items-center border-gray-400">
        <Form>
          <div>
            <Input
              field="name"
              placeholder="my awesome group"
              type="text"
              className="w-full px-4 pt-2 pb-2.5 border border-gray-300 rounded hover:border-indigo-400 focus:border-indigo-400"
              validate={async (value) => {
                if (!value) {
                  return "Name is required";
                }

                if (value.length < 6) {
                  return "Name should be greater than or equal to 6 characters";
                }

                if (value.length > 50) {
                  return "Name should not be greater than 50 characters";
                }

                return false;
              }}
            />
          </div>

          <div className="pt-2"></div>

          <div>
            <Textarea
              field="description"
              placeholder="your awesome description"
              type="text"
              className="w-full px-4 pt-2 pb-2.5 border border-gray-300 rounded hover:border-indigo-400 focus:border-indigo-400"
              validate={async (value) => {
                if (!value) {
                  return "Description is required";
                }

                return false;
              }}
            />
          </div>

          <div className="pt-2"></div>

          <div>
            <Input
              field="avatar"
              placeholder="http://avatar/img.jpg"
              type="text"
              className="w-full px-4 pt-2 pb-2.5 border border-gray-300 rounded hover:border-indigo-400 focus:border-indigo-400"
              validate={async (value) => {
                return false;
              }}
            />
          </div>

          <div className="pt-2"></div>

          <div>
            <Input
              field="banner"
              placeholder="http://banner/img.jpg"
              type="text"
              className="w-full px-4 pt-2 pb-2.5 border border-gray-300 rounded hover:border-indigo-400 focus:border-indigo-400"
              validate={async (value) => {
                return false;
              }}
            />
          </div>

          <div className="pt-2"></div>

          <div>
            <button
              className="text-xl bg-white border border-gray-300 font-semibold pt-2 pb-2.5 rounded w-full hover:border-gray-400 hover:bg-gray-50"
              type="submit"
              disabled={!canSubmit}
            >
              <span className="text-black">
                {isSubmitting ? "Creating..." : "Create Group"}
              </span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CreateGroup;
