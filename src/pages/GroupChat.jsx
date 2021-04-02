import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../services/firebase";
import { addMessage } from "../helpers/db";
import { currUser } from "../helpers/auth";

const GroupChat = (props) => {
  const { id } = useParams();
  const messageBoxRef = useRef(null);
  const [message, setMessage] = useState("");
  const [value, loading, error] = useCollection(
    db.collection("message").doc(id).collection("messages").orderBy("sentAt"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (messageBoxRef && value) {
      messageBoxRef.current.scrollIntoView({
        block: "end",
        inline: "center",
        behavior: "smooth",
        alignToTop: false,
      });
      // messageBoxRef.current.addEventListener("DOMNodeInserted", (e) => {
      //   const { currentTarget: target } = e;
      //   console.log("asdadasd: inserted: ", target.scrollHeight);
      //   target.scroll({
      //     bottom: target.scrollHeight + 300,
      //     behavior: "smooth",
      //   });
      // });
    }
  }, [value]);

  const onSend = async () => {
    setMessage("");

    await addMessage(id, message);
  };

  return (
    <div>
      <div className="mt-20 mb-16" ref={messageBoxRef}>
        {loading === false ? (
          <>
            <div className="flow-root">
              <div>
                {value &&
                  value.docs.map((doc) => {
                    const item = doc.data();

                    const sentAt = item.sentAt
                      ? item.sentAt.toDate().toLocaleString()
                      : new Date().toLocaleString();

                    const isSender = item.sentBy === currUser().uid;

                    return (
                      <div
                        key={doc.id}
                        className={`bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg ${
                          isSender ? " float-right" : "float-left"
                        }`}
                        ref={messageBoxRef}
                      >
                        <p>{item.messageText}</p>
                        <em>{sentAt}</em>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <div className="fixed w-full flex justify-between bg-green-100 bottom-0">
        <textarea
          rows={1}
          placeholder="Message..."
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none outline-none"
        ></textarea>
        <button type="button" className="m-2 outline-none" onClick={onSend}>
          <svg
            className="text-green-400 w-12 h-12 py-2 mr-2"
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default GroupChat;
