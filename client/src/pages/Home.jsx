import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import { DatePicker, Form, Input, Modal, Select, Table, message } from "antd";
import axios from "axios";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Loader } from "../components/layouts/Loader";
import moment from "moment";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;
const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTranscatiom, setAllTranscatiom] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedDate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);
  // Table Data

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Action",
      render: (text, record) => (
        <>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setIsModalOpen(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              deleteHandler(record);
            }}
          />
        </>
      ),
    },
  ];

  // get All Transcation //

  useEffect(() => {
    const getAllTranscation = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user._id;
        setLoading(true);
        const res = await axios.post(`/transcation/get-transcation`, {
          userId,
          frequency,
          selectedDate,
          type,
        });

        setLoading(false);
        setAllTranscatiom(res.data);
        message.success("Successfully Get All Transcation");
        console.log(res, "resss");
      } catch (error) {
        setLoading(false);
        message.error("Cant get transcation");
        console.log(error, "error");
      }
    };
    getAllTranscation();
  }, [frequency, selectedDate, type]);

  // Delete Handler
  const deleteHandler = async (record) => {
    try {
      setLoading(true);
      await axios.post("/transcation/delete-transcation", {
        transcationId: record._id,
      });
      setLoading(false);
      message.destroy("Transcation Delete Successfully");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Unable Delete Transcation");
    }
  };

  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/transcation/edit-transcation", {
          payload: { ...values, userId: user._id },
          transcationId: editable._id,
        });
        setLoading(false);
        message.success("Transcation Update Successfully");
      } else {
        await axios.post("/transcation/add-transcation", {
          ...values,
          userId: user._id,
        });
        setLoading(false);
        message.success("Transcation Add Successfully");
      }
      setIsModalOpen(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("Failed Add Transcation");
    }
  };
  return (
    <Layout>
      <div className="container">
        {loading && <Loader />}
        <div className="filters m-2">
          <div>
            <h4>Select Frequency</h4>
            <Select
              value={frequency}
              onChange={(values) => {
                setFrequency(values);
              }}
            >
              <Select.Option value="7">Last 1 Week</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 Year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedDate(values)}
              />
            )}
          </div>
          <div>
            <h4>Select Type</h4>
            <Select
              value={type}
              onChange={(values) => {
                setType(values);
              }}
            >
              <Select.Option value="all">ALL</Select.Option>
              <Select.Option value="income">INCOME</Select.Option>
              <Select.Option value="expense">EXPENSE</Select.Option>
            </Select>
          </div>
          <div className="switch-icon">
            <UnorderedListOutlined
              className={`mx-2 ${
                viewData === "table" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className={`mx-2 ${
                viewData === "chart" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("chart")}
            />
          </div>
          <div>
            <button
              className="btn btn-info"
              onClick={() => setIsModalOpen(true)}
            >
              Add new
            </button>
          </div>
        </div>
        <div className="content">
          {viewData === "table" ? (
            <Table columns={columns} dataSource={allTranscatiom} />
          ) : (
            <Analytics allTranscation={allTranscatiom} />
          )}
        </div>
        <Modal
          title={editable ? "Edit Transcation" : "Add Transcation"}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={false}
        >
          <Form
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={editable}
          >
            <Form.Item label="AMOUNT" name="amount">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="TYPE" name="type">
              <Select>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="CATEGORY" name="category">
              <Select>
                <Select.Option value="salary">salary</Select.Option>
                <Select.Option value="tip">Tip</Select.Option>
                <Select.Option value="project">Project</Select.Option>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="movie">Movie</Select.Option>
                <Select.Option value="bills">Bills</Select.Option>
                <Select.Option value="medical">Medical</Select.Option>
                <Select.Option value="fees">Fees</Select.Option>
                <Select.Option value="tax">Tax</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>
            <Form.Item label="REFRENCE" name="reference">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="DESCRIPTION" name="description">
              <Input type="text" />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-secondary">
                {editable ? "Update Transcation" : "SAVE"}
              </button>
            </div>
          </Form>
        </Modal>
      </div>
    </Layout>
  );
};

export default Home;
