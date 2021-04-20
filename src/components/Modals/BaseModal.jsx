import React from "react";
import Modal from "react-modal";

const BaseModal = ({
  children,
  icon,
  content,
  buttons,
  onRequestClose,
  ...props
}) => {
  return (
    <Modal
      className="flex items-center justify-center min-h-screen pt-4 px-4 bg-gray pb-20 text-center sm:block sm:p-0"
      style={{
        overlay: {
          backgroundColor: "rgba(107, 114, 128, 0.5)",
        },
      }}
      onRequestClose={onRequestClose}
      {...props}
    >
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 p-6">
          <div className="flex items-start">
            {icon}

            <div className="mt-0 ml-4 text-left">{content}</div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row justify-end">
          {buttons}
        </div>
      </div>
    </Modal>
  );
};

export default BaseModal;
