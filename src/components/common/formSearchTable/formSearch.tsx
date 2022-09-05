import { Button, Col, Form, Input, Row, Select } from "antd";
import "antd/dist/antd.css";
import React from "react";
import { common } from "../../../assets/@type/typeF";
import "./form.scss";

const { Option } = Select;

const AdvancedSearchForm = ({
  clear,
  fiel,
  onFinish,
  subSearch,
  visibleSub,
}: {
  clear: common;
  fiel?: { fiel1: string; fiel2: string };
  onFinish?: common;
  subSearch?: string[];
  visibleSub: boolean;
}) => {
  const [form] = Form.useForm();

  // const onFinish = (values: any) => {
  //   console.log("Received values of form: ", values);
  // };

  return (
    <Form
      wrapperCol={{ span: 20 }}
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row align="top" style={{ marginTop: 10 }}>
        <Col span={14}>
          <Form.Item
            name={fiel?.fiel1}
            label={fiel?.fiel1}
            rules={[
              {
                required: false,
                message: "Input something!",
              },
            ]}
            wrapperCol={{
              span: 24,
            }}
          >
            <Input placeholder="Write something" />
          </Form.Item>
        </Col>
        {visibleSub && (
          <Col style={{ minWidth: 300, left: 20 }} span={4}>
            <Form.Item name={fiel?.fiel2} label={fiel?.fiel2}>
              <Select defaultValue="All" mode="multiple" allowClear>
                {subSearch?.map((e: string) => (
                  <Option key={e} value={e}>
                    {e}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        )}

        <Col>
          <Button type="primary" htmlType="submit" style={{ margin: "0 12px" }}>
            Search
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
              clear();
            }}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default AdvancedSearchForm;
