import React, { useState } from "react";
import { Menu, MenuItem, MenuButton } from "@headlessui/react";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import EditUser from "./EditUser";
import { useUser } from "../store/user-provider";
import { useAuth } from "../context/AuthContext";

const KebabMenuProfile = ({ user }) => {
  const { deleteUser } = useUser();
  const { logout } = useAuth();
  const [edit, setEdit] = useState(false);
  const handleDelete = async (id) => {
    try {
      const response = await deleteUser();
      if (response.status == 200) {
        logout();
      }
    } catch (error) {}
  };
  return (
    <>
      {edit ? (
        <EditUser user={user} onCancel={() => setEdit(false)} />
      ) : (
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="border-0 bg-transparent p-1 focus:outline-none">
            <ThreeDotsVertical size={24} />
          </MenuButton>
          <Menu.Items className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg focus:outline-none">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => setEdit(true)}
                  className={`${
                    active ? "bg-gray-200 dark:bg-gray-700" : ""
                  } flex w-full px-4 py-2 text-left`}
                >
                  ✏️ Edit
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => handleDelete()}
                  className={`${
                    active ? "bg-gray-200 dark:bg-gray-700" : ""
                  } flex w-full px-4 py-2 text-left`}
                >
                  🗑️ Delete
                </button>
              )}
            </MenuItem>
          </Menu.Items>
        </Menu>
      )}
    </>
  );
};

export default KebabMenuProfile;
