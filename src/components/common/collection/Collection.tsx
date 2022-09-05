import React, { useLayoutEffect, useMemo } from "react";
import "antd/dist/antd.css";
import { memo } from "react";
// import "./index.css";
import "./collection.scss";
import { Button, Form, Input, InputNumber, Modal, Select, Upload } from "antd";
import { Category, fiel } from "../../../assets/@type/RootConstant";
import { UploadOutlined } from "@ant-design/icons";
import { common } from "../../../assets/@type/typeF";
// import axios from "axios";

const CollectionForm = ({
  subSellec,
  text,
  titleForm,
  visible,
  onCreate,
  onCancel,
  listfield,
}: {
  subSellec?: Category[];
  text?: string;
  visible: boolean;
  onCreate: (values: any) => void;
  onCancel: common;
  listfield?: fiel[];
  titleForm?: string;
}) => {
  const [form] = Form.useForm();
  const initialValuesForm = useMemo(() => listfield?.reduce((a, v) => ({ ...a, [v.name]: v.value }), {}), [listfield]);
  useLayoutEffect(() => {
    form.setFieldsValue(initialValuesForm);
    form.resetFields();
  }, [form, initialValuesForm]);
  // // eslint-disable-next-line @typescript-eslint/no-empty-function
  // React.useLayoutEffect(() => {
  // }, [listfield?.toString()])
  return (
    <Modal
      forceRender
      getContainer={false}
      // className={clasName}
      visible={visible}
      // closable={visible}
      title={titleForm}
      okText={text}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form initialValues={initialValuesForm} form={form} layout="vertical" name="form_in_modal">
        {listfield?.map((e, index) => {
          if (e.type === "select") {
            return (
              <Form.Item
                key={index}
                name={e.name}
                label={e.title}
                rules={[
                  {
                    required: true,
                    message: `Please input the ${e.title}!`,
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Please select category"
                  defaultValue={e.value}
                >
                  {subSellec?.map((e: { name: string }) => (
                    <Select.Option key={e.name}> {e.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            );
          }
          if (e.type === "textarea") {
            return (
              <Form.Item
                key={index}
                name={e.name}
                label={e.title}
                rules={[
                  {
                    required: true,
                    message: `Please input the ${e.title}!`,
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
            );
          }
          if (e.type === "file") {
            return (
              <Form.Item
                key={index}
                name={e.name}
                label={e.title}
                rules={[
                  {
                    required: true,
                    message: `Please input the ${e.title}!`,
                  },
                ]}
              >
                <Upload listType="picture" maxCount={1}>
                  <Button icon={<UploadOutlined />}>Choose File</Button>
                </Upload>
              </Form.Item>
            );
          }
          if (e.type === "number") {
            return (
              <Form.Item
                key={index}
                name={e.name}
                label={e.title}
                rules={[
                  {
                    required: true,
                    message: `Please input the ${e.title}!`,
                  },
                ]}
              >
                <InputNumber min={0} />
              </Form.Item>
            );
          }
          if (e.type === "phone") {
            return (
              <Form.Item
                key={index}
                name={e.name}
                label={e.title}
                rules={[
                  {
                    pattern: new RegExp("^[0-9]{9,10}$"),
                    required: false,
                    message: `Please input the ${e.title}!`,
                  },
                ]}
              >
                <Input min={0} />
              </Form.Item>
            );
          }
          if (e.type === "email") {
            return (
              <Form.Item
                key={index}
                name={e.name}
                label={e.title}
                rules={[
                  {
                    type: "email",
                    pattern: new RegExp("[0-9]"),
                    required: true,
                    message: `Please input the ${e.title}!`,
                  },
                ]}
              >
                <Input disabled={text == "Update" ? true : false} />
              </Form.Item>
            );
          }
          return (
            <Form.Item
              style={{ display: e.name === "id" ? "none" : "block" }}
              key={index}
              name={e.name}
              label={e.title}
              rules={[
                {
                  required: e.name === "lastname" || e.name === "address" ? false : true,
                  message: `Please input the ${e.title}!`,
                },
              ]}
            >
              <Input disabled={e.name === "id" ? true : false} />
            </Form.Item>
          );
        })}

        {/* <Form.Item name="description" label="Description">
                    <Input type="textarea" />
                </Form.Item>
                <Form.Item name="modifier" className="collection-create-form_last-form-item">
                    <Radio.Group>
                        <Radio value="public">Public</Radio>
                        <Radio value="private">Private</Radio>
                    </Radio.Group> 
            </Form.Item>*/}
      </Form>
    </Modal>
  );
};
export default memo(CollectionForm);
{
  /* {

                
              
              e.type === "file" && (
                <Upload listType="picture" maxCount={1}>
                  <Button icon={<UploadOutlined />}>Choose File</Button>
                </Upload>
              )
              e.type === "textarea" && <Input.TextArea />
              e.type === "number" && <InputNumber min={0} />
              ):(
                <Input disabled={e.name === "id" ? true : false} />
              )
               */
}
