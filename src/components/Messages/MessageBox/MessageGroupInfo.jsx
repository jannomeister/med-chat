import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { ImUsers } from "react-icons/im";
import { MdInsertPhoto } from "react-icons/md";
import { BiChevronRight, BiChevronDown } from "react-icons/bi";
import { IoIosDocument } from "react-icons/io";
import { HiDocumentDuplicate } from "react-icons/hi";

const Members = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.uid}>{item.displayName}</li>
      ))}
    </ul>
  );
};

const Files = ({ items }) => {
  return (
    <ul>
      {items.map((item) => (
        <li>hello</li>
      ))}
    </ul>
  );
};

const MessageGroupInfo = ({ group }) => {
  const [expandedIds, setExpandedIds] = useState([]);
  const [items] = useState([
    {
      id: 1,
      name: "Members",
      icon: <ImUsers className="text-green-500 h-5 w-5" />,
      iconBgColor: "bg-green-200",
      description: `${group.members.length} members`,
    },
    {
      id: 2,
      name: "Documents",
      icon: <IoIosDocument className="text-indigo-500 h-5 w-5" />,
      iconBgColor: "bg-indigo-200",
      description: "999+ files",
    },
    {
      id: 3,
      name: "Photos",
      icon: <MdInsertPhoto className="text-yellow-500 h-5 w-5" />,
      iconBgColor: "bg-yellow-200",
      description: "999+ files",
    },
    {
      id: 4,
      name: "Other",
      icon: <HiDocumentDuplicate className="text-red-500 h-5 w-5" />,
      iconBgColor: "bg-red-200",
      description: "999+ files",
    },
  ]);

  return (
    <aside
      className="h-screen bg-gray-200 px-3 no-scrollbar overflow-scroll"
      style={{ width: "30%" }}
    >
      <div className="flex flex-col items-center justify-center pt-5 mb-5">
        <img
          src={group ? group.avatar : ""}
          alt={group ? group.avatar : ""}
          className="w-20 h-20 rounded-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/assets/fallback_img.webp";
          }}
        />

        <h1 className="mt-2 text-xl font-semibold break-all">
          {group ? group.name : ""}
        </h1>
        <p className="text-xs text-gray-400 font-medium">
          {group ? group.members.length : 0} members
        </p>
      </div>

      <div>
        <h1 className="text-sm text-gray-600 font-semibold mb-5">File Type</h1>
        <Accordion
          allowMultipleExpanded
          allowZeroExpanded
          onChange={(ids) => setExpandedIds(ids)}
        >
          {items.map((item) => (
            <AccordionItem key={item.id} uuid={item.id} className="mb-4">
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="flex flex-row items-center">
                    <div className={`p-3 mx-1 rounded-md ${item.iconBgColor}`}>
                      {item.icon}
                    </div>
                    <div className="w-9/12 pl-3 leading-3">
                      <p className="text-sm font-bold">{item.name}</p>
                      <span className="text-xs text-gray-500">
                        {item.description}
                      </span>
                    </div>
                    <div>
                      {expandedIds.includes(item.id) ? (
                        <BiChevronDown />
                      ) : (
                        <BiChevronRight />
                      )}
                    </div>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {item.id === 1 ? (
                  <Members items={group.members} />
                ) : (
                  <Files items={[]} />
                )}
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  );
};

export default MessageGroupInfo;
