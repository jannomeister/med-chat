import React, { useState, useEffect, useMemo } from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useForm } from "react-form";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { addGroup } from "../../helpers/db";

// components
import BaseModal from "./BaseModal";
import Input from "../Input";
import Textarea from "../Textarea";

const CreateGroupModal = ({ open, onCreateGroup, onCancel }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const history = useHistory();
  const { url, path } = useRouteMatch();
  const location = useLocation();
  const [onSubmitError, setOnSubmitError] = useState(null);
  const defaultValues = useMemo(
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
      onCancel();
    }
  }, [isSuccess, onCancel]);

  return (
    <BaseModal
      isOpen={open}
      onRequestClose={onCancel}
      icon={
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
          <AiOutlineUsergroupAdd className="h-6 w-6 text-green-600" />
        </div>
      }
      content={
        <>
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="modal-title"
          >
            New Group
          </h3>
          <div className="mt-2">
            <span className="text-sm text-gray-500">
              Fill the following fields to start a new group
            </span>

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
        </>
      }
      buttons={
        <>
          <button
            type="button"
            className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 ml-3"
            onClick={onCancel}
          >
            Close
          </button>
          <button
            type="button"
            className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-500 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ml-3"
            onClick={onCreateGroup}
          >
            Create Group
          </button>
        </>
      }
    />
  );
};

export default CreateGroupModal;
