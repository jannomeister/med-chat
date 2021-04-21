import React from "react";
import { Link } from "react-router-dom";
import { currUser } from "../../helpers/auth";
import { HiUsers, HiStatusOnline } from "react-icons/hi";

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
            <ItemInfo
              label={`${item.totalMembers} members`}
              icon={<HiUsers className="absolute inset-0 h-full w-full" />}
            />

            <div className="mt-2" />

            <ItemInfo
              label={`0 members online`}
              icon={
                <HiStatusOnline className="absolute inset-0 h-full w-full" />
              }
            />
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

const ItemInfo = ({ icon, label }) => {
  return (
    <div className="flex text-base font-normal text-gray-600 items-center break-words">
      <div className="flex items-center">
        <div
          className="inline-block w-5 h-5 min-w-5 max-h-5 relative mr-2"
          style={{ flex: "0 0 20px" }}
        >
          {icon}
        </div>
        {label}
      </div>
    </div>
  );
};

export default GroupItem;
