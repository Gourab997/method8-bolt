import React, { useState } from "react";
import { Menu } from "antd";
import {
  PlayCircleOutlined,
  FileTextOutlined,
  EditOutlined,
  CheckCircleOutlined,
  FolderOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";

const CourseMenu = ({ modules, onLessonSelect }) => {
  // Utility: Determine open folders on load
  const getDefaultOpenKeys = (items) => {
    let keys = [];
    items.forEach((item) => {
      if (item.expanded && item.children) {
        keys.push(item.id);
        keys = keys.concat(getDefaultOpenKeys(item.children));
      }
    });
    return keys;
  };

  const [openKeys, setOpenKeys] = useState(getDefaultOpenKeys(modules));

  // Menu icon logic
  const getIcon = (item) => {
    if (item.type === "lesson") {
      if (item.completed)
        return <CheckCircleOutlined className="text-green-500" />;
      switch (item.lessonType) {
        case "video":
          return <PlayCircleOutlined className="text-blue-500" />;
        case "reading":
          return <FileTextOutlined className="text-gray-500" />;
        case "assignment":
          return <EditOutlined className="text-orange-500" />;
        default:
          return <FileTextOutlined />;
      }
    } else {
      return openKeys.includes(item.id) ? (
        <FolderOpenOutlined className="text-gray-600" />
      ) : (
        <FolderOutlined className="text-gray-600" />
      );
    }
  };

  // Recursive item builder
  const buildMenuItems = (items) => {
    return items.map((item) => {
      if (item.type === "lesson") {
        return {
          key: item.id,
          icon: getIcon(item),
          label: (
            <div className="flex justify-between items-center w-full">
              <span className={item.current ? "text-blue-600 font-medium" : ""}>
                {item.title}
              </span>
              {item.duration && (
                <span className="text-xs text-gray-400">{item.duration}</span>
              )}
            </div>
          ),
          className: item.current
            ? "bg-blue-50 border-r-2 border-blue-500"
            : "",
        };
      } else {
        return {
          key: item.id,
          icon: getIcon(item),
          label: (
            <span className="font-medium">
              {item.id}. {item.title}
            </span>
          ),
          children: item.children ? buildMenuItems(item.children) : [],
        };
      }
    });
  };

  // Handle lesson click
  const handleMenuClick = ({ key }) => {
    const allItems = getAllItems(modules);
    const item = allItems.find((i) => i.id === key);
    if (item?.type === "lesson") {
      onLessonSelect(key);
    }
  };

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  const getAllItems = (items) => {
    let result = [];
    items.forEach((item) => {
      result.push(item);
      if (item.children) {
        result = result.concat(getAllItems(item.children));
      }
    });
    return result;
  };

  return (
    <Menu
      mode="inline"
      items={buildMenuItems(modules)}
      onClick={handleMenuClick}
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
      className="border-none bg-gray-50 h-full"
      style={{ borderRight: "none" }}
    />
  );
};

export default CourseMenu;
