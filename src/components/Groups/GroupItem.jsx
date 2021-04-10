import React from "react";
import { Link } from "react-router-dom";
import { currUser } from "../../helpers/auth";

// components
import JoinGroupButton from "./JoinGroupButton";
import MemberGroupButton from "./MemberGroupButton";

const GroupItem = ({ id, item, onJoinGroup, onLeaveGroup }) => {
  return (
    <div className="rounded-lg overflow-hidden mb-8 border border-gray-300">
      <div className="object-cover h-32 w-full bg-black">
        {item.banner ? (
          <img
            src={item.banner}
            alt=""
            className="object-cover h-32 w-full shadow-inner bg-black"
          />
        ) : null}
      </div>
      <div className="p-1.5">
        <div className="relative w-16 h-16 -top-9 ml-3 -mb-9 bg-black border-4 border-solid border-white rounded">
          <Link
            to={{
              pathname: `/e/messages/t/${id}`,
            }}
          >
            {item.avatar ? (
              <img
                src={item.avatar}
                alt=""
                className="inline-block w-14 h-14 rounded object-cover bg-black"
              />
            ) : null}
          </Link>
        </div>

        <div className="flex flex-col py-0 px-4">
          <Link
            to={{
              pathname: `/e/messages/t/${id}`,
            }}
          >
            <h1 className="text-2xl break-words font-extrabold">{item.name}</h1>
          </Link>
          <p className="break-words mt-2 mb-5 text-base font-normal text-gray-600">
            {item.description}
          </p>

          <div className="mt-1">
            <div className="flex text-base font-normal text-gray-600 items-center break-words">
              <a className="flex items-center">
                <div
                  className="inline-block w-5 h-5 min-w-5 max-h-5 relative mr-2"
                  style={{ flex: "0 0 20px" }}
                >
                  <svg
                    className="absolute inset-0 h-full w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                {item.createdBy.displayName ?? item.createdBy.email}
              </a>
            </div>
            <div className="flex text-base font-normal text-gray-600 items-center break-words mt-2">
              <a className="flex items-center">
                <div
                  className="inline-block w-5 h-5 min-w-5 max-h-5 relative mr-2"
                  style={{ flex: "0 0 20px" }}
                >
                  <svg
                    className="absolute inset-0 h-full w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                facebook.com
              </a>
            </div>
            <div className="flex text-base font-normal text-gray-600 items-center break-words mt-2">
              <a className="flex items-center">
                <div
                  className="inline-block w-5 h-5 min-w-5 max-h-5 relative mr-2"
                  style={{ flex: "0 0 20px" }}
                >
                  <svg
                    className="absolute inset-0 h-full w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                {item.members.length} members
              </a>
            </div>
            <div className="flex text-base font-normal text-gray-600 items-center break-words mt-2">
              <a className="flex items-center">
                <div
                  className="inline-block w-5 h-5 min-w-5 max-h-5 relative mr-2"
                  style={{ flex: "0 0 20px" }}
                >
                  <svg
                    className="absolute inset-0 h-full w-full"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </div>
                {item.onlineMembers | 0} members online
              </a>
            </div>
          </div>

          <div className="pt-4 pb-3 grid items-center gap-3">
            {item.createdBy !== currUser().uid &&
            !item.members.find((e) => e.uid === currUser().uid) ? (
              <JoinGroupButton onJoinGroup={() => onJoinGroup(item)} />
            ) : (
              <MemberGroupButton onLeaveGroup={() => onLeaveGroup(item)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupItem;
