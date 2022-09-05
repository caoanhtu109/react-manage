import React, { useState } from "react";
import "antd/dist/antd.css";
import "./create-order.scss";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Select, Space } from "antd";
import { API_ORDER, API_PRODUCT, API_USER } from "../../../../assets/@type/RootConstant";
import axios, { AxiosError } from "axios";
// import { any } from "prop-types";
import { NumberLiteralType } from "typescript";
import { useNavigate } from "react-router-dom";
// import { file } from "@babel/types";

const { Option } = Select;

const OrderCreate = () => {
  const navigate = useNavigate();
  const [curPage, setCurPage] = useState<number>(1);
  const [dataUser, setDataUser] = useState<{ label: string; value: number }[]>([]);
  const [dataProd, setDataProd] = useState<{ name: string; id: number }[]>([]);
  const [dataProd1, setDataProd1] = useState<{ name: string; id: number; price: number }[]>([]);
  const [form] = Form.useForm();
  React.useEffect(() => {
    const response = axios.get(`${API_USER}?page=${curPage}&search=${""}&role=${JSON.stringify([])}`);
    response.then(res => {
      // console.log(res);
      // console.log(res.data);
      const result = res.data.data.map((cur: { lastname: string; firstname: string; id: number }) => {
        return {
          label: cur.lastname !== null ? cur.firstname + " " + cur.lastname : cur.firstname,
          value: cur.id,
        };
      });
      setDataUser([...dataUser, ...result]);
    });
  }, [curPage]);
  React.useEffect(() => {
    const response = axios.get(`${API_PRODUCT}?page=${1}&search=${""}&category=${JSON.stringify([])}`);
    response.then(res => {
      // console.log(res);
      // console.log(res.data);
      const result = res.data.data.map((cur: { name: string; id: NumberLiteralType; price: string }) => {
        return {
          name: cur.name,
          id: cur.id,
          price: +cur.price,
        };
      });
      setDataProd(result);
      setDataProd1(result);
    });
  }, []);

  const onFinish = async (values: { product: { id: number; quantiry: number }[] }) => {
    try {
      console.log("Received values of form:", values);
      const respone = await axios.post(API_ORDER, values);
      message.success(respone.data.message);
      navigate("../orders");
    } catch (error) {
      const err = error as AxiosError;
      const arr = err.response?.data as { message: string; statusCode: 409 };
      message.error(arr.message);
    }
  };
  // const handleScroll = (even: any) => {
  //   console.log(even.deltaY);
  //   if (even.deltaY === 100) {
  //     console.log("a");
  //     setCurPage(curPage + 1);
  //   }
  // };

  // const handleChange = (value: any) => {
  // console.log(form.getFieldValue("product"));
  // console.log(value);
  // };
  // console.log(form.getFieldValue("Product"));
  return (
    <div className="container-oder">
      <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
        <Form.Item
          name="user_id"
          label="User"
          rules={[
            {
              required: true,
              message: "Missing User",
            },
          ]}
        >
          <Select
            // dropdownRender={menu => <div onWheel={handleScroll}>{menu}</div>}
            showSearch
            optionFilterProp="children"
            listHeight={400}
          >
            {dataUser.map(user => (
              <Option key={user.value} value={user.value}>
                {user.label}
              </Option>
            ))}
          </Select>
          {/* onChange={handleChange}  */}
        </Form.Item>
        <Form.List name="product">
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => {
                // console.log(field);
                const price = (value: number) => {
                  const id = form.getFieldValue("product")[value]?.id;
                  const result =
                    dataProd1.find(cur => {
                      return cur.id === id;
                    })?.price || "";
                  // console.log(result);
                  return result;
                };
                return (
                  <Space key={field.fieldKey} align="baseline">
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, curValues) => {
                        const result1 = prevValues?.product
                          ?.map((cur: { id: number }) => cur?.id)
                          ?.reduce((init: string[], cur: string) => {
                            const test = curValues?.product
                              ?.map((cur: { id: number }) => cur?.id)
                              ?.every((s: string) => {
                                return s !== cur;
                              });
                            if (test) return [...init, cur];
                            return init;
                          }, []);

                        const option = result1.reduce((init: { name: string; id: number }[], cur: number) => {
                          const findData = dataProd1.find(a => a.id == cur);
                          if (findData) return [...init, findData];
                          return init;
                        }, []);
                        // console.log(option);
                        if (prevValues.product[0] !== undefined) {
                          const res = prevValues?.product.map((cur: { id: string }) => {
                            // console.log(a);
                            return cur?.id;
                          });
                          const result = dataProd?.reduce(
                            (init: { name: string; id: number }[], cur: { name: string; id: number }) => {
                              const exits = res?.every((s: number) => {
                                return s !== cur.id;
                              });
                              if (exits) return [...init, { name: cur.name, id: cur.id }];
                              return init;
                            },
                            []
                          );

                          if (!result.some(arr => arr.id === option[0]?.id)) {
                            setDataProd(result.concat(option));
                          } else {
                            setDataProd(result);
                          }
                        }

                        return JSON.stringify(prevValues.product) !== JSON.stringify(curValues.product);
                      }}
                    >
                      {() => (
                        <Form.Item
                          {...field}
                          label="Product"
                          name={[field.name, "id"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing Product",
                            },
                          ]}
                        >
                          <Select
                            showSearch
                            optionFilterProp="children"
                            listHeight={500}
                            // disabled={!form.getFieldValue("User")}
                            style={{
                              width: 130,
                            }}
                          >
                            {dataProd.map((item: { name: string; id: number }) => (
                              <Option key={item.id} value={item.id}>
                                {item.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      )}
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="Quantity"
                      name={[field.name, "quantity"]}
                      rules={[
                        {
                          required: true,
                          message: "Missing Quantity",
                        },
                      ]}
                    >
                      <InputNumber min={0} />
                    </Form.Item>
                    <Form.Item
                      // initialValue={price(field.name)}
                      label="Unit price"
                      // name={[field.name, "price"]}
                      rules={[
                        {
                          required: false,
                          message: "Missing price",
                        },
                      ]}
                    >
                      <label style={{ display: "none" }} />
                      {/* <InputNumber defaultValue={price(field.name)} /> */}
                      <Input readOnly type={"text"} value={price(field.name)} />
                      {/* <InputNumber value={`${price(field.name} min={0} /> */}
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                );
              })}

              <Form.Item>
                {dataProd.length > 0 && (
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Product
                  </Button>
                )}
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderCreate;
