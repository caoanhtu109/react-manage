import React, { useState } from "react";
import "antd/dist/antd.css";
import "./order-detail.scss";
// import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Space, Spin } from "antd";
import { API_ORDER } from "../../../../assets/@type/RootConstant";
import axios from "axios";
// import { any } from "prop-types";
import { useParams } from "react-router-dom";

const OrderDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<{
    orderId: string | undefined;
    user: string;
    totalPrice: number;
    create: string;
    update: string;
    status: string;
  }>();
  const [form] = Form.useForm();
  React.useEffect(() => {
    const setdata = async () => {
      const responseField = await axios.get(`${API_ORDER}/${id}`);
      const resultField = await responseField.data.data.product?.map(
        (cur: { quantity: number; id: number; price: string; name: string }) => {
          return {
            quantity: cur.quantity,
            name: cur.name,
            price: cur.price,
          };
        }
      );

      setData({
        orderId: id,
        user: responseField.data.data.firstname,
        totalPrice: responseField.data.data.total_price,
        create: new Date(Date.parse(responseField.data.data.create_at)).toLocaleString(),
        update: new Date(Date.parse(responseField.data.data.update_at)).toLocaleString(),
        status: responseField.data.data.status,
      });
      setLoading(false);
      console.log(responseField);
      form.setFieldsValue({
        product: resultField,
      });
    };
    setdata();
  }, []);
  return (
    <div className="container-oder">
      {loading ? (
        <Spin style={{ margin: "0 auto" }} />
      ) : (
        <Form form={form} name="dynamic_form_nest_item" autoComplete="off">
          <Form.Item className="min" label="User">
            <Input readOnly value={data?.user} />
            {/* <label htmlFor="">{data?.user}</label> */}
          </Form.Item>

          <Form.List name="product">
            {fields => {
              // console.log(fields);
              return (
                <>
                  {fields.map(field => {
                    return (
                      <Space key={field.fieldKey} align="baseline">
                        <Form.Item label="Product" name={[field.name, "name"]}>
                          <Input readOnly />
                        </Form.Item>
                        <Form.Item {...field} label="Quantity" name={[field.name, "quantity"]}>
                          <Input readOnly />
                        </Form.Item>
                        <Form.Item label="Unit price" name={[field.name, "price"]}>
                          <Input readOnly type={"text"} />
                        </Form.Item>
                      </Space>
                    );
                  })}
                </>
              );
            }}
          </Form.List>
          <Form.Item className="min" label="Total price">
            <Input readOnly value={data?.totalPrice} />
          </Form.Item>
          <Form.Item className="min" label="Status">
            <Input readOnly value={data?.status} />
          </Form.Item>
          <Form.Item className="min" label="Created">
            <Input readOnly value={data?.create} />
          </Form.Item>
          <Form.Item className="min" label="Updated">
            <Input readOnly value={data?.update} />
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default OrderDetail;
