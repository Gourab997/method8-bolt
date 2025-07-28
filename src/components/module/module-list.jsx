import { green, red } from "@ant-design/colors";
import {
  Avatar,
  Button,
  Dropdown,
  Empty,
  Form,
  Input,
  Modal,
  Progress,
  Select,
  Table,
  Tag,
} from "antd";
import { format } from "date-fns";
import {
  Delete02Icon,
  Edit02Icon,
  EyeIcon,
  MoreVerticalIcon,
} from "hugeicons-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useDeleteModuleMutation,
  useUpdateModuleMutation,
} from "../../api/features/module/module-api.js";
import { AVATAR_COLORS } from "../../utils/constants.js";

const statusColorMapper = {
  in_progress: "gold",
  completed: "green",
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    dataIndex === "tags" ? (
      <Select mode="tags" style={{ width: "100%" }} tokenSeparators={[" "]} />
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          rules={
            dataIndex === "tags"
              ? []
              : [
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]
          }
          style={{
            margin: 0,
          }}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ModuleList = ({
  assessmentModulesData,
  isLoading,
  pagination,
  handleTableChange,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [updateModule, { isLoading: isUpdating }] = useUpdateModuleMutation();
  const [deleteModule, { isLoading: isDeleting }] = useDeleteModuleMutation();

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      tags: [],
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      await updateModule({ id: key, ...row });
      setEditingKey("");
    } catch (_errInfo) {
      // console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this assessment?",
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, keep it",
      onOk: async () => {
        try {
          await deleteModule(record.key).unwrap();
        } catch (_error) {
          // console.error('Failed to delete module:', error);
        }
      },
    });
  };

  const handlePreview = (record) => {
    navigate(`/module_preview/${record.key}`);
  };

  const columns = [
    {
      title: "Module Name",
      dataIndex: "name",
      key: "name",
      editable: true,
      render: (text, record) => {
        if (isEditing(record)) {
          return (
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter a name" }]}
              style={{ margin: 0 }}
            >
              <Input />
            </Form.Item>
          );
        }
        return (
          <Link
            style={{ color: "inherit" }}
            to={`/module-builder/${record.key}`}
          >
            {text}
          </Link>
        );
      },
    },
    {
      title: "Facilitator",
      dataIndex: "facilitator_name",
      key: "facilitator_name",
      render: (text) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            style={{
              marginRight: 8,
              backgroundColor: AVATAR_COLORS[text.charAt(0).toUpperCase()],
            }}
          >
            {text.charAt(0).toUpperCase()}
          </Avatar>
          {text}
        </div>
      ),
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      editable: true,
      render: (tags) => (
        <span>
          {tags.map((tag) => {
            return <Tag key={tag}>{tag.toUpperCase()}</Tag>;
          })}
        </span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={statusColorMapper[status]}>
          {status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
        </Tag>
      ),
    },
    {
      title: "Maturity Score",
      key: "maturity_score",
      dataIndex: "maturity_score",
      render: (maturity_score) => (
        <Progress percent={maturity_score} strokeColor={green[5]} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_text, record) => {
        const editable = isEditing(record);
        if (editable) {
          return (
            <span>
              <Button
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
                type="primary"
              >
                Save
              </Button>
              <Button onClick={cancel}>Cancel</Button>
            </span>
          );
        }

        const handleMenuClick = ({ key, domEvent }) => {
          domEvent.stopPropagation();
          if (key === "1") {
            edit(record);
          } else if (key === "2") {
            handlePreview(record);
          } else if (key === "3") {
            handleDelete(record);
          }
        };

        const items = [
          {
            key: "1",
            label: (
              <span>
                <Edit02Icon size={14} style={{ marginRight: "10px" }} />
                Edit
              </span>
            ),
          },
          {
            key: "2",
            label: (
              <span>
                <EyeIcon size={14} style={{ marginRight: "10px" }} />
                Preview
              </span>
            ),
          },
          {
            key: "3",
            label: (
              <span style={{ color: red[5] }}>
                <Delete02Icon size={14} style={{ marginRight: "10px" }} />
                Delete
              </span>
            ),
          },
        ];
        return (
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            trigger={["click"]}
          >
            <Button
              icon={<MoreVerticalIcon size={20} />}
              onClick={(e) => e.stopPropagation()}
              type="text"
            />
          </Dropdown>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const data =
    assessmentModulesData?.data?.assessment_modules.map((module) => ({
      key: module.id,
      name: module.name,
      tags: module.tags,
      status: module.status,
      created_at: format(new Date(module.created_at), "MMMM d, yyyy"),
      maturity_score: module.maturity_score,
      facilitator_name: module.facilitator_name,
    })) || [];

  return (
    <Form component={false} form={form}>
      <Table
        columns={mergedColumns}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        loading={isLoading || isUpdating || isDeleting}
        locale={{
          emptyText: <Empty description="No data" />,
        }}
        onChange={handleTableChange}
        onRow={(record) => ({
          onClick: (e) => {
            if (
              e.target.closest(".ant-dropdown-trigger") ||
              isEditing(record)
            ) {
              return;
            }
            navigate(`/edit_module/${record.key}`);
          },
          style: { cursor: "pointer" },
        })}
        pagination={{
          position: ["bottomRight"],
          current: pagination.page,
          pageSize: pagination.limit,
          total: assessmentModulesData?.data?.pagy?.items,
        }}
      />
    </Form>
  );
};

export default ModuleList;
