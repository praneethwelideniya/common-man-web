"use client";

import { searchUsers } from "@/actions/users";
import { UserList } from "@/app/dashboard/components/user-list";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserType } from "@/types/UserRespose";
import { useState } from "react";

type UserSearchBarProps = {
  onChange: (_id: string) => void;
  value: string;
  createNewUser: () => void;
};

function UserSearchBar({ onChange, value, createNewUser }: UserSearchBarProps) {
  const [query, setQuery] = useState("");
  const [userList, setUserList] = useState<UserType[] | undefined>(undefined);
  const findUser = async (userQuery: string) => {
    // const res: AuthResponse = await login(formData);

    const res: UserType[] | undefined = await searchUsers(userQuery);

    if (res) {
      setUserList(res);
    }
  };

  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-4 gap-4 lg:gap-8">
        <Input
          id="email"
          placeholder="Enter name"
          onChange={(e) => setQuery(e.currentTarget.value)}
          className="xl:col-span-3"
        />

        <Button
          onClick={(event) => {
            event.preventDefault();
            findUser(query);
          }}
          disabled={!query || query.length < 3}
        >
          Search
        </Button>
      </div>
      {userList && (
        <UserList
          users={userList}
          onChange={onChange}
          value={value}
          createNewUser={createNewUser}
        />
      )}
    </div>
  );
}

export default UserSearchBar;
