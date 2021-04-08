import React from "react";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { fetchCurrUserGroups } from "../helpers/db";

// components
import GroupChatLeftSidebar from "./GroupChatLeftSidebar/GroupChatLeftSidebar";
import MessageItem from "./MessageItem";

const Messages = () => {
  const { path } = useRouteMatch();
  const [groups, setGroups] = React.useState([
    // {
    //   id: "CurLN1MOXmLHFuXc9wzv",
    //   name: "asdadasdasdadasdasdadasdasdadasdadasd",
    //   avatar:
    //     "https://images.unsplash.com/photo-1572739275114-ec3764ba1477?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8Z3JvdXAlMjBjaGF0JTIwcGljdHVyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60",
    //   banner:
    //     "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2378&q=80",
    //   createdAt: { seconds: 1617858994, nanoseconds: 210000000 },
    //   createdBy: {
    //     photoUrl:
    //       "https://lh3.googleusercontent.com/a-/AOh14GieIyJswolp3pJ7Yoz5ex-Pwr83Pu18RZ34FpZx5Q=s96-c",
    //     email: "jannotabamo@gmail.com",
    //     displayName: "Janno Tabamo",
    //     userId: "gOKMsxcUT9d9NcLVx9ULBNJvyxQ2",
    //   },
    //   description:
    //     "asdasdasdadasdasdasdasdadasdasdasdasdadasdasdasdasdadasdasdasdasdadasd",
    //   members: [
    //     {
    //       uid: "CurLN1MOXmLHFuXc9wzv",
    //       displayName: "Janno Tabamo",
    //       email: "jannotabamo@gmail.com",
    //       photoURL:
    //         "https://lh3.googleusercontent.com/a-/AOh14GieIyJswolp3pJ7Yoz5ex-Pwr83Pu18RZ34FpZx5Q=s96-c",
    //     },
    //   ],
    //   updatedAt: { seconds: 1617858994, nanoseconds: 210000000 },
    // },
    // {
    //   id: "CurLN1MOXmLHFuXc9wzv2",
    //   name: "asdadasd",
    //   avatar: "",
    //   banner:
    //     "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2378&q=80",
    //   createdAt: { seconds: 1617858994, nanoseconds: 210000000 },
    //   createdBy: {
    //     photoUrl:
    //       "https://lh3.googleusercontent.com/a-/AOh14GieIyJswolp3pJ7Yoz5ex-Pwr83Pu18RZ34FpZx5Q=s96-c",
    //     email: "jannotabamo@gmail.com",
    //     displayName: "Janno Tabamo",
    //     userId: "gOKMsxcUT9d9NcLVx9ULBNJvyxQ2",
    //   },
    //   description: "asdasdasdadasd",
    //   members: [
    //     {
    //       uid: "CurLN1MOXmLHFuXc9wzv",
    //       displayName: "Janno Tabamo",
    //       email: "jannotabamo@gmail.com",
    //       photoURL:
    //         "https://lh3.googleusercontent.com/a-/AOh14GieIyJswolp3pJ7Yoz5ex-Pwr83Pu18RZ34FpZx5Q=s96-c",
    //     },
    //   ],
    //   updatedAt: { seconds: 1617858994, nanoseconds: 210000000 },
    // },
    // {
    //   id: "CurLN1MOXmLHFuXc9wzv1",
    //   name: "asdadasd",
    //   avatar: "",
    //   banner: "",
    //   createdAt: { seconds: 1617858994, nanoseconds: 210000000 },
    //   createdBy: {
    //     photoUrl:
    //       "https://lh3.googleusercontent.com/a-/AOh14GieIyJswolp3pJ7Yoz5ex-Pwr83Pu18RZ34FpZx5Q=s96-c",
    //     email: "jannotabamo@gmail.com",
    //     displayName: "Janno Tabamo",
    //     userId: "gOKMsxcUT9d9NcLVx9ULBNJvyxQ2",
    //   },
    //   description: "asdasdasdadasd",
    //   members: [
    //     {
    //       uid: "CurLN1MOXmLHFuXc9wzv",
    //       displayName: "Janno Tabamo",
    //       email: "jannotabamo@gmail.com",
    //       photoURL:
    //         "https://lh3.googleusercontent.com/a-/AOh14GieIyJswolp3pJ7Yoz5ex-Pwr83Pu18RZ34FpZx5Q=s96-c",
    //     },
    //   ],
    //   updatedAt: { seconds: 1617858994, nanoseconds: 210000000 },
    // },
  ]);

  React.useEffect(() => {
    fetchCurrUserGroups().then((result) => {
      setGroups(result);
    });
  }, []);

  return (
    <div className="flex items-center justify-start my-0">
      <GroupChatLeftSidebar groups={groups} />
      <Switch>
        <Route path={`${path}/t/:id`}>
          <MessageItem />
        </Route>
      </Switch>
    </div>
  );
};

export default Messages;
