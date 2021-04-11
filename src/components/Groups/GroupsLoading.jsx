import React from "react";

// components
import Masonry from "react-masonry-css";

const GroupsLoading = () => {
  return (
    <Masonry
      breakpointCols={{
        default: 4,
        1100: 3,
        700: 2,
        500: 1,
      }}
      className="flex px-2 py-4 -ml-7 w-auto"
      columnClassName="pl-7 bg-clip-padding"
    >
      {Array.from({ length: 15 }, () => Math.random()).map((item) => (
        <div
          key={item}
          className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto mb-4"
        >
          <div className="animate-pulse flex flex-col gap-2">
            <div className="rounded-full bg-gray-300 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-300 rounded"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                <div className="h-3 bg-gray-300 rounded w-4/6"></div>
              </div>
              <div className="space-y-2 pt-4">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-gray-300 h-4 w-4"></div>
                  <div className="h-3 bg-gray-300 rounded w-4/6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-gray-300 h-4 w-4"></div>
                  <div className="h-3 bg-gray-300 rounded w-4/6"></div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-gray-300 h-4 w-4"></div>
                  <div className="h-3 bg-gray-300 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Masonry>
  );
};

export default GroupsLoading;
