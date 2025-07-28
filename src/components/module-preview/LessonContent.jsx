import React from "react";
import { Typography, Card } from "antd";
import VideoPlayer from "./VideoPlayer";
import {
  PlayCircleOutlined,
  FileTextOutlined,
  EditOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const LessonContent = ({ lesson, onComplete }) => {
  const handleComplete = () => {
    onComplete?.(lesson.id);
  };

  const getIcon = (type) => {
    switch (type) {
      case "video":
        return <PlayCircleOutlined className="text-blue-500" />;
      case "reading":
        return <FileTextOutlined className="text-green-500" />;
      case "assignment":
        return <EditOutlined className="text-orange-500" />;
      default:
        return <FileTextOutlined />;
    }
  };

  return (
    <div className="lesson-content">
      <div className="mb-6">
        <Title level={2} className="flex items-center gap-2">
          {getIcon(lesson.lessonType)}
          {lesson.content.title}
        </Title>
      </div>

      {lesson.lessonType === "video" && lesson.content.videoUrl && (
        <VideoPlayer
          videoUrl={lesson.content.videoUrl}
          onComplete={handleComplete}
        />
      )}

      {lesson.lessonType !== "video" && (
        <Card className="mb-4">
          <Paragraph className="text-gray-600 text-lg">
            {lesson.content.description}
          </Paragraph>
        </Card>
      )}

      <div className="mt-6">
        <Paragraph className="text-gray-600">
          {lesson.content.description}
        </Paragraph>
      </div>
    </div>
  );
};

export default LessonContent;
