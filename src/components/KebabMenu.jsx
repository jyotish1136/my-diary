import React, { useState } from "react";
import { Menu, MenuItem, MenuButton } from "@headlessui/react";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import { usePost } from "../store/post-store-provider";
import EditPost from "./EditPost";

const KebabMenu = ({ post }) => {
  const { deletePost } = usePost();
  const [edit, setEdit] = useState(false);

  return (
    <>
      {edit ? (
        <EditPost post={post} onCancel={() => setEdit(false)} />
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
                  onClick={() => deletePost(post.id)}
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

export default KebabMenu;
