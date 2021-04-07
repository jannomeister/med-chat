import React, { useEffect, useState } from "react";
import { fetchGroupPhotos } from "../helpers/storage";

// components
import MemberAvatar from "./MemberAvatar";

const GroupChatRightSidebar = ({ id, group }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchGroupPhotos(id).then((urls) => {
      setPhotos(urls);
    });
  }, []);

  return (
    <aside className="h-screen w-80 z-10 top-0 right-0 overflow-x-hidden pt-28 pr-5">
      <nav className="bg-gray-100 border border-gray-100 rounded-t-lg h-full text-center p-4">
        <div
          className="w-20 h-20 rounded-full border-2 border-gray-100 relative left-2/4 -mb-9 bg-black"
          style={{ top: "-3.5rem", transform: "translateX(-50%)" }}
        >
          <img
            src={group ? group.avatar : ""}
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <h1 className="font-semibold">Group Members</h1>

        {group ? (
          <div className="flex flex-row py-2 mb-5">
            <div className="flex flex-col items-center justify-center w-2/4">
              <MemberAvatar
                src={group.createdBy.photoUrl}
                width="6.5rem"
                height="6.5rem"
              />
              <h1 className="text-xs font-bold mt-2 break-words w-full">
                {group.createdBy.displayName
                  ? group.createdBy.displayName
                  : group.createdBy.email}
              </h1>
              <p className="text-xs text-gray-400">Group Admin</p>
            </div>
            <div className="grid grid-flow-col gap-2 grid-rows-2 grid-cols-3 pt-4 pb-12">
              {group.members
                .filter((m) => m.uid !== group.createdBy.userId)
                .slice(0, 6)
                .map((e, index) => (
                  <MemberAvatar
                    key={e.uid}
                    src={e.photoURL}
                    width="2.5rem"
                    height="2.5rem"
                    className="last"
                  />
                ))}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        <hr className="border-gray-300" />

        <div className="my-5">
          <h1 className="text-xs text-left font-bold">PHOTOS & MULTIMEDIA</h1>

          <div className="grid grid-flow-row grid-cols-3 gap-3 grid-rows-2 py-3">
            {photos.map((photo) => (
              <div key={photo} className="rounded-lg h-20 bg-gray-800">
                <img
                  className="rounded-lg w-full h-full object-cover"
                  src={photo}
                  alt=""
                />
              </div>
            ))}
          </div>

          <button type="button" className="underline text-yellow-600 text-sm">
            View all
          </button>
        </div>

        <hr className="border-gray-300" />

        {/* <div className="mt-5">
          <h1 className="text-xs text-left font-bold">ATTACHMENTS</h1>

          <div className="py-2">
            {[1, 2, 3].map((e) => (
              <div>
                <span>Competitor Analysis Template</span>
              </div>
            ))}
          </div>
        </div> */}
      </nav>
    </aside>
  );
};

export default GroupChatRightSidebar;
