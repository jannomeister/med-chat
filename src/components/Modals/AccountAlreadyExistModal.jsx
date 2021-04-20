import React from "react";
import BaseModal from "./BaseModal";

const AccountAlreadyExistModal = ({ open, onClose }) => {
  return (
    <BaseModal
      isOpen={open}
      onRequestClose={onClose}
      icon={
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <svg
            className="h-6 w-6 text-red-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
      }
      content={
        <>
          <h3
            className="text-lg leading-6 font-medium text-gray-900"
            id="modal-title"
          >
            Ooops!
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              An account already exists with the same email address but
              different sign-in credentials. Sign in using a provider associated
              with this email address.
            </p>
          </div>
        </>
      }
      buttons={
        <>
          <button
            type="button"
            className="rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-50 ml-3 w-1/6"
            onClick={onClose}
          >
            Okay
          </button>
        </>
      }
    />
  );
};

export default AccountAlreadyExistModal;
