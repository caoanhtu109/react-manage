import React, { useState } from "react";
import "antd/dist/antd.css";
import "./edit-order.scss";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, message, Select, Space, Spin } from "antd";
import { API_ORDER, API_PRODUCT } from "../../../../assets/@type/RootConstant";
import axios, { AxiosError } from "axios";
// import { any } from "prop-types";
import { NumberLiteralType } from "typescript";
import { useNavigate, useParams } from "react-router-dom";
// import { isNumber } from "util";

// import { file } from "@babel/types";
const { Option } = Select;
const EditrOder = () => {
  const { id } = useParams();

  // console.log(id);
  // const [initData, setinitData] = useState<any>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [totalCount, setTotal] = useState<number>();
  const [dataUser, setDataUser] = useState<string>();
  const [dataProd, setDataProd] = useState<{ name: string; id: number }[]>([]);
  const [dataProd1, setDataProd1] = useState<{ name: string; id: number; price: number }[]>([]);
  const [form] = Form.useForm();
  React.useEffect(() => {
    const setdata = async () => {
      const resultProducts = await axios.get(`${API_PRODUCT}?page=${1}&search=${""}&category=${JSON.stringify([])}`);
      const dataProd = await resultProducts.data.data.map(
        (cur: { name: string; id: NumberLiteralType; price: string }) => {
          return {
            name: cur.name,
            id: cur.id,
            price: +cur.price,
          };
        }
      );
      console.log(resultProducts);
      // setDataProd(dataProd);
      // setDataProd1(dataProd);
      const responseField = await axios.get(`${API_ORDER}/${id}`);
      const resultField = await responseField.data.data.product?.map(
        (cur: { quantity: number; id: number; price: string; name: string }) => {
          return {
            quantity: cur.quantity,
            id: cur.name,
          };
        }
      );
      // console.log(resultField);
      const result = dataProd?.reduce(
        (init: { name: string; id: number; price: number }[], cur: { name: string; id: number; price: number }) => {
          const test = resultField?.every((res: { price: number; id: string; quantity: number }) => {
            return res.id !== cur.name;
          });
          if (test) return [...init, cur];
          return init;
        },
        []
      );
      // console.log(result);
      resultField === undefined ? setDataProd(dataProd) : setDataProd(result);
      setTotal(resultProducts.data.totalCount);
      setDataProd1(dataProd);
      setDataUser(responseField.data.data.firstname);
      setLoading(false);
      // setinitData(resultField);
      form.setFieldsValue({
        product: resultField,
      });
    };
    setdata();
  }, []);
  // React.useEffect(() => {
  //   console.log(`${API_ORDER}/${id}`);
  //   const responseField = axios.get(`${API_ORDER}/${id}`);
  //   responseField.then(res => {
  //     console.log(res);
  //     // console.log(res.data.product);
  //     const resultField = res.data.data.product.map(
  //       (cur: { quantity: number; id: NumberLiteralType; price: string }) => {
  //         return {
  //           quantity: cur.quantity,
  //           id: cur.id,
  //           price: +cur.price,
  //         };
  //       }
  //     );
  //     console.log(resultField);
  //     // setDataProd(result);
  //     // setDataProd1(result);
  //   });
  // }, []);
  // console.log(dataUser);
  // console.log(dataProd);

  const onFinish = async (values: { product: { id: number | string; quantiry: number }[] }) => {
    const result = values.product.map(resProd => {
      if (Number.isInteger(resProd.id)) return resProd;
      else {
        return { ...resProd, id: dataProd1.find(res => res.name === resProd.id)?.id };
      }
    });
    // console.log(result);
    try {
      // console.log("Received values of form:", values);
      const respone = await axios.put(`${API_ORDER}/${id}`, {
        product: result,
      });
      message.success(respone.data.message);
      navigate("../orders");
    } catch (error) {
      const err = error as AxiosError;
      const arr = err.response?.data as { message: string; statusCode: 409 };
      message.error(arr.message);
    }
  };

  // const handleChange = (value: any) => {
  // console.log(form.getFieldValue("product"));
  // console.log(value);
  // };
  // console.log(form.getFieldValue("Product"));
  return (
    <div className="container-oder">
      {/* <h3 style={{ display: "block" }}>Create order</h3>
      <label>sdas</label> */}
      {loading ? (
        <Spin />
      ) : (
        <Form form={form} name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
          <Form.Item
            // name="user_id"
            label="User"
            rules={[
              {
                required: true,
                message: "Missing User",
              },
            ]}
          >
            <Input readOnly type={"text"} value={dataUser} />
            {/* <Select showSearch optionFilterProp="children" listHeight={500}>
            {dataUser.map(user => (
              <Option key={user.value} value={user.value}>
                {user.label}
              </Option>
            ))}
          </Select> */}
            {/* onChange={handleChange}  */}
          </Form.Item>
          <Form.List name="product">
            {(fields, { add, remove }) => {
              console.log(fields);
              return (
                <>
                  {fields.map(field => {
                    // console.log(field);
                    const price = (value: number) => {
                      const id = form.getFieldValue("product")[value]?.id;
                      if (Number.isInteger(id)) {
                        const result =
                          dataProd1.find(cur => {
                            return cur.id === id;
                          })?.price || "";
                        // console.log(result);
                        return result;
                      } else {
                        const result =
                          dataProd1.find(cur => {
                            return cur.name === id;
                          })?.price || "";
                        // console.log(result);
                        return result;
                      }
                    };
                    return (
                      <Space key={field.fieldKey} align="baseline">
                        <Form.Item
                          noStyle
                          shouldUpdate={(prevValues, curValues) => {
                            // console.log("cur", curValues);
                            // console.log("pre", prevValues);
                            const result1 = prevValues?.product
                              ?.map((cur: { id: number }) => cur?.id)
                              .map((cur: string | number) => {
                                if (Number.isInteger(cur)) return cur;
                                else {
                                  const id = dataProd1.find(curd => curd.name === cur)?.id;
                                  return id;
                                }
                              })
                              ?.reduce((init: string[], cur: string) => {
                                const test = curValues?.product
                                  ?.map((cur: { id: number }) => cur?.id)
                                  .map((cur: string | number) => {
                                    if (Number.isInteger(cur)) return cur;
                                    else {
                                      const id = dataProd1.find(curData => curData.name === cur)?.id;
                                      return id;
                                    }
                                  })
                                  ?.every((s: string) => {
                                    return s !== cur;
                                  });
                                if (test) return [...init, cur];
                                return init;
                              }, []);
                            console.log(
                              result1
                              // curValues?.product
                              //   ?.map((a: { id: number }) => a?.id)
                              //   .map((a: string | number) => {
                              //     if (Number.isInteger(a)) return a;
                              //     else {
                              //       const id = dataProd1.find(b => b.name === a)?.id;
                              //       return id;
                              //     }
                              //   })
                            );
                            const option = result1.reduce((init: { name: string; id: number }[], cur: number) => {
                              // console.log(e);
                              const find = dataProd1.find(find => find.id == cur);
                              // console.log(b);
                              if (find) return [...init, find];
                              return init;
                            }, []);
                            // console.log(option);
                            if (prevValues.product[0] !== undefined) {
                              const res = prevValues?.product.map((cur: { id: string }) => {
                                // console.log(a);
                                return cur?.id;
                              });
                              // console.log(form.getFieldValue("product"));

                              // console.log(res);
                              // const result = dataProd?.reduce(
                              //   (a: { name: string; id: number }[], e: { name: string; id: number }) => {
                              //     const test = res.some((s: number) => {
                              //       // console.log(s);
                              //       // console.log(e.id);
                              //       return s !== e.id;
                              //     });

                              //     if (test) return { name: e.name, id: e.id };
                              //   }
                              // );
                              // console.log(dataProd);
                              const result = dataProd?.reduce(
                                (init: { name: string; id: number }[], cur: { name: string; id: number }) => {
                                  const exist = res?.every((s: number) => {
                                    return s !== cur.id;
                                  });
                                  if (exist) return [...init, { name: cur.name, id: cur.id }];
                                  return init;
                                },
                                []
                              );
                              // console.log(result);
                              // console.log(
                              //   result.some(arr => {
                              //     console.log(a);
                              //     return arr.id === a.id;
                              //   })
                              // );
                              if (!result.some(arr => arr.id === option[0]?.id)) {
                                setDataProd(result.concat(option));
                              } else {
                                setDataProd(result);
                                // const ab = curValues.product.filter((a: any, b: number) => {
                                //   return a?.product !== prevValues?.product[b]?.product;
                                // });
                                // console.log(ab);
                                // if (ab.length > 0) {
                                //   const find = dataProd1.find(a => {
                                //     return a.id === ab.product;
                                //   });
                                //   const result1 = curValues?.product?.map(
                                //     (a: { name?: string; product: number; price?: number }) => {
                                //       if (a.product === ab.product) {
                                //         return { ...a, price: find?.price };
                                //       }
                                //       return a;
                                //     }
                                //   );
                                //   form.setFieldsValue({
                                //     product: result1,
                                //   });
                                // }
                              }

                              // console.log(result);
                            }

                            //const res = prevValues?.Product.map((a: { Product: string }) => a.Product);
                            // console.log(prevValues.Product);
                            return (
                              // prevValues.Product !== prevValues.Product
                              JSON.stringify(prevValues.product) !== JSON.stringify(curValues.product)
                            );
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
                                value={10}
                                showSearch
                                optionFilterProp="children"
                                listHeight={500}
                                // defaultValue="a"
                                // disabled={!form.getFieldValue("User")}
                                style={{
                                  width: 130,
                                }}
                              >
                                {dataProd.map((item: { name: string; id: number }) => (
                                  <Option key={item.id} value={item.id}>
                                    {/* {dataProd1.find(a => a.id === item.id)?.name} */}
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
                    {dataProd?.length > 0 && (totalCount || 5) > form.getFieldValue("product")?.length && (
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Product
                      </Button>
                    )}
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default EditrOder;
