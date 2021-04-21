import React from "react";
import BaseModal from "./BaseModal";

const ConfirmLogoutModal = ({ open, onLogout, onCancel }) => {
  return (
    <BaseModal
      isOpen={open}
      onRequestClose={onCancel}
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
            Logout
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to logout?
            </p>
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
            Cancel
          </button>
          <button
            type="button"
            className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-3"
            onClick={onLogout}
          >
            Logout
          </button>
        </>
      }
    />
  );
};

export default ConfirmLogoutModal;
