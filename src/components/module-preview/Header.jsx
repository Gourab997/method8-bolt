import React from "react";
import { Layout, Breadcrumb, Progress, Button, Avatar } from "antd";
import { LeftOutlined, RightOutlined, UserOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;

const Header = ({
  courseTitle,
  progress,
  currentLesson,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
}) => {
  return (
    <AntHeader className="bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">M8</span>
          </div>
          <span className="font-bold text-lg text-gray-800">Method8</span>
        </div>

        <div className="flex items-center gap-4 ml-8">
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-gray-700">
              {progress}%
            </span>
            <Progress
              percent={progress}
              showInfo={false}
              strokeColor="#1890ff"
              className="w-32"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Breadcrumb
          items={[{ title: "Modules" }, { title: courseTitle }]}
          className="hidden md:block"
        />

        <div className="flex items-center gap-2">
          <Button
            icon={<LeftOutlined />}
            onClick={onPrevious}
            disabled={!hasPrevious}
            type="text"
          >
            Previous
          </Button>
          <Button
            icon={<RightOutlined />}
            onClick={onNext}
            disabled={!hasNext}
            type="text"
            className="flex-row-reverse"
          >
            Next
          </Button>
        </div>

        <Avatar icon={<UserOutlined />} className="bg-blue-500" />
      </div>
    </AntHeader>
  );
};

export default Header;
