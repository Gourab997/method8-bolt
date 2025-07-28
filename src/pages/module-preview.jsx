import {
  Layout,
  Typography,
  Row,
  Col,
  Button,
  Progress,
  Breadcrumb,
} from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

import CourseMenu from "../components/module-preview/CourseMenu";
import LessonContent from "../components/module-preview/LessonContent";
import courseData from "../data/courseData.json";
import { BreadcrumbContext } from "../context/breadcrumb/breadcrumb-context";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const ModulePreview = () => {
  const { module_id } = useParams();
  const { setItems = () => {} } = useContext(BreadcrumbContext); // ✅ Safe fallback

  const [modules, setModules] = useState(courseData.course.modules || []);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const current = findCurrentLesson(modules);
    if (current) setCurrentLesson(current);

    const allLessons = getAllLessons(modules);
    const completed = allLessons.filter((l) => l.completed).length;
    setProgress(
      allLessons.length ? Math.round((completed / allLessons.length) * 100) : 0
    );
  }, [modules]);

  useEffect(() => {
    setItems([
      { title: "Modules", href: "/modules" },
      { title: courseData.course.title },
    ]);
    return () => setItems([]);
  }, [setItems]);

  const findCurrentLesson = (items) => {
    for (const item of items) {
      if (item.type === "lesson" && item.current) return item;
      if (item.children) {
        const found = findCurrentLesson(item.children);
        if (found) return found;
      }
    }
    return null;
  };

  const getAllLessons = (items) => {
    let result = [];
    items.forEach((item) => {
      if (item.type === "lesson") result.push(item);
      if (item.children) result = result.concat(getAllLessons(item.children));
    });
    return result;
  };

  const updateItemInTree = (items, targetId, updates) =>
    items.map((item) =>
      item.id === targetId
        ? { ...item, ...updates }
        : item.children
        ? {
            ...item,
            children: updateItemInTree(item.children, targetId, updates),
          }
        : item
    );

  const handleLessonSelect = (lessonId) => {
    const clearCurrent = (items) =>
      items.map((item) => ({
        ...item,
        current: false,
        children: item.children ? clearCurrent(item.children) : undefined,
      }));

    let updated = clearCurrent(modules);
    updated = updateItemInTree(updated, lessonId, { current: true });
    setModules(updated);

    const selected = findLessonById(updated, lessonId);
    if (selected) setCurrentLesson(selected);
  };

  const handleLessonComplete = (lessonId) => {
    const updated = updateItemInTree(modules, lessonId, { completed: true });
    setModules(updated);

    const all = getAllLessons(updated);
    const done = all.filter((l) => l.completed).length;
    setProgress(Math.round((done / all.length) * 100));
  };

  const findLessonById = (items, id) => {
    for (const item of items) {
      if (item.id === id && item.type === "lesson") return item;
      if (item.children) {
        const found = findLessonById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const currentIndex = getAllLessons(modules).findIndex((l) => l.current);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < getAllLessons(modules).length - 1;

  const handlePrevious = () => {
    const all = getAllLessons(modules);
    if (hasPrevious) handleLessonSelect(all[currentIndex - 1].id);
  };

  const handleNext = () => {
    const all = getAllLessons(modules);
    if (hasNext) handleLessonSelect(all[currentIndex + 1].id);
  };

  return (
    <>
      <Helmet>
        <title>{courseData.course.title}</title>
      </Helmet>

      <Layout style={{ minHeight: "100vh" }}>
        {/* Sticky Sider */}
        <Sider
          width={300}
          style={{
            background: "#fff",
            borderRight: "1px solid #f0f0f0",
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
            padding: 16,
          }}
        >
          <Title level={4}>{courseData.course.title}</Title>
          <Progress
            percent={progress}
            size="small"
            status="active"
            style={{ marginBottom: 16 }}
          />
          <CourseMenu modules={modules} onLessonSelect={handleLessonSelect} />
        </Sider>

        <Layout>
          <Header
            style={{
              background: "#f9f9f9",
              padding: "0 24px",
              borderBottom: "1px solid #eee",
            }}
          >
            <Breadcrumb
              items={[
                { title: "Modules", href: "/modules" },
                { title: courseData.course.title },
              ]}
            />
          </Header>

          <Content style={{ padding: 32, background: "#f9f9f9" }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
              {currentLesson && (
                <>
                  <Row
                    justify="space-between"
                    align="middle"
                    style={{ marginBottom: 24 }}
                  >
                    <Col>
                      <Title level={3}>{currentLesson.title}</Title>
                    </Col>
                    <Col>
                      <Row gutter={12}>
                        <Col>
                          <Button
                            icon={<ArrowLeftOutlined />}
                            onClick={handlePrevious}
                            disabled={!hasPrevious}
                          >
                            Previous
                          </Button>
                        </Col>
                        <Col>
                          <Button
                            type="primary"
                            icon={<ArrowRightOutlined />}
                            onClick={handleNext}
                            disabled={!hasNext}
                          >
                            Next
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <LessonContent
                    lesson={currentLesson}
                    onComplete={handleLessonComplete}
                  />
                </>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default ModulePreview;

