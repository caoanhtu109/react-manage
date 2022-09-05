import { Button, message, Popconfirm, Row, Space, Tag } from "antd";
import axios, { AxiosError } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { onDelete, onEdit } from "../../../assets/commonFunction/curdOnTable";
// import { Link } from "react-router-dom";
import {
  API_CATEGORY,
  API_PRODUCT,
  Category,
  fiel,
  // input,
  Product,
  rootState,
} from "../../../assets/@type/RootConstant";
import CollectionForm from "../../common/collection/Collection";
import TableComponent from "../../common/table/tablecommon";
import AdvancedSearchForm from "../../common/formSearchTable/formSearch";
import { useDispatch, useSelector } from "react-redux";
import { handleSearchProduct } from "../../../action/action";
// import { File } from "@babel/types";
const ProductPage = () => {
  const fiel: fiel[] = [
    { name: "name", title: "Name Product" },
    { name: "price", title: "Price", type: "number" },
    { name: "description", title: "Description", type: "textarea" },
    { name: "category", title: "Category", type: "select" },
    { name: "photo", title: "Image", type: "file" },
  ];
  const Search = useSelector<rootState>(state => state.search.Search.product) as { category: number[]; search: string };
  // console.log(Search.category);
  // console.log(useSelector<any>(state => state.search.Search.product));
  // console.log(productData);
  const dispatch = useDispatch();
  // const [Search, setSearch] = useState({ search: "", category: 0 });
  const [productEdit, setProductEdit] = useState<fiel[]>();
  const [productData, setProductData] = useState<Product[]>([]);
  // const [productColumn, setProductColumn] = useState([""]);
  const [pageSize, setPageSize] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);
  const [refesh, setRefesh] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<Category[]>();
  // console.log(productData);
  useEffect(() => {
    axios
      .get(API_CATEGORY)
      .then(res => {
        const { data } = res.data;
        setCategory(data);
        // console.log(data);
      })
      .catch(err => console.log(err));
  }, []);

  const onSearch = async (values: { Product: string; Category: string[] }) => {
    // console.log(values);
    const result = category?.reduce((a: number[], e: Category) => {
      const test = values?.Category?.some((s: string) => s === e.name);
      if (test) return [...a, e.id];
      return a;
    }, []) as number[] | null;
    // console.log(result);
    // let result;
    // values.Category && (result = category.find((a: any, e: any) => a.name == values.Category).id);
    if (
      (Search.search != values.Product && values.Product != undefined) ||
      (JSON.stringify(Search.category) != JSON.stringify(result) && values.Category != undefined)
      //  &&
      // JSON.stringify(values.Category) != JSON.stringify(["All"])
    ) {
      setCurrentPage(1);
      dispatch(
        handleSearchProduct({
          search: values.Product ? values.Product : "",
          category:
            // JSON.stringify(values.Category) != JSON.stringify(["All"]) &&
            values.Category != undefined && values.Category.length > 0 ? result : [],
        })
      );
      // setSearch({
      //   search: values.Product ? values.Product : "",
      //   category: values.Category ? category.find((a: any, e: any) => a.name == values.Category).id : 0,
      // });
    }
  };
  // console.log(JSON.stringify([]));
  const onClearSearch = async () => {
    // console.log(Search);
    if (Search.search != "" || Search.category.length != 0) {
      setCurrentPage(1);
      dispatch(
        handleSearchProduct({
          search: "",
          category: [],
        })
      );
      // setSearch({
      //   search: "",
      //   category: 0,
      // });
    }
  };

  const onCreate = async (values: {
    category: string[];
    description: string;
    name: string;
    photo: any;
    price: number;
  }) => {
    // console.log(values/);
    setVisible(false);
    try {
      const result = category?.reduce((a: number[], e: Category) => {
        const test = values.category.some((s: string) => s === e.name);
        if (test) return [...a, e.id];
        return a;
      }, []);
      //const x = values.category.map((e: string) => Number(e));
      const data = new FormData();
      data.append("photo", values.photo.fileList[0].originFileObj);
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("price", values.price as unknown as string);
      data.append("category", result as unknown as string);
      // console.log(data);
      const response = await axios.post(API_PRODUCT, data, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      message.success(response.data.message);
      setRefesh(e => e + 1);
    } catch (error) {
      const err = error as AxiosError;
      const arr = err.response?.data as { message: string; statusCode: 409 };
      message.error(arr.message);
    }
  };
  const onEditProduct = async (values: {
    id: number;
    category: string[];
    description: string;
    name: string;
    image: any;
    price: number;
  }) => {
    setVisibleEdit(false);
    try {
      const result = category?.reduce((a: number[], e: Category) => {
        const test = values.category?.some((s: string) => s === e.name);
        if (test) return [...a, e.id];
        return a;
      }, []);
      // console.log(values);
      // console.log({
      //   id: values.id,
      //   photo: values.image.fileList[0].originFileObj,
      //   name: values.name,
      //   description: values.description,
      //   price: values.price as unknown as string,
      //   category: result?.toString() as string,
      // });
      const data = new FormData();
      // console.log(x);
      if (values.image.fileList) {
        data.append("photo", values.image?.fileList[0]?.originFileObj);
      }
      data.append("name", values.name);
      data.append("description", values.description);
      data.append("price", values.price as unknown as string);
      data.append("category", result?.toString() as string);
      const response = await axios.put(`${API_PRODUCT}/${values.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success(response.data.message);
      // console.log(1);
      setRefesh(e => e + 1);
    } catch (error) {
      const err = error as AxiosError;
      const arr = err.response?.data as { message: string; statusCode: 409 };
      message.error(arr.message);
    }
  };
  const onChangePagination = (page: number) => {
    setCurrentPage(page);
  };

  React.useLayoutEffect(() => {
    setLoading(true);
    const response = axios.get(
      `${API_PRODUCT}?page=${currentPage}&search=${Search.search}&category=${JSON.stringify(Search.category)}`
    );
    response.then(res => {
      // const columns = Object.keys(res.data.data[0]);
      // console.log(columns);
      // console.log(res.data.data);
      const data = res.data.data.map((e: Product) => {
        return {
          key: e.id,
          ...e,
          category: e.category?.map((e: Category) => e.name),
          created: new Date(Date.parse(e.created_at)).toLocaleString(),
          updated: new Date(Date.parse(e.updated_at as string)).toLocaleString(),
          Action: "Action",
        };
      });
      // console.log(data);
      setPageSize(res.data.limit);
      setTotalData(res.data.totalCount);
      setCurrentPage(res.data.currentPage);
      setProductData(data);
      // setProductColumn([...columns, "Action"]);
      setLoading(false);
      // console.log(data);
    });
  }, [currentPage, refesh, Search]);
  // console.log(totalData);
  const columns = useMemo(() => {
    const output = ["name", "description", "price", "image", "category", "created", "updated", "Action"].map(e => {
      if (e == "image") {
        return {
          title: e as "sd",
          dataIndex: e,
          key: e,
          width: 160,
          render: (_: number, record: { image: string }) => {
            return (
              <img
                src={record.image}
                style={{
                  maxWidth: 100,
                }}
              />
            );
          },
        };
      }
      if (e == "category") {
        return {
          title: e,
          dataIndex: e,
          key: e,
          width: 300,
          render: (_: number, record: { category: string[] }) => {
            return (
              <>
                {record.category?.map(tag => (
                  <Tag color="green" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </>
            );
          },
        };
      }
      if (e == "Action") {
        return {
          title: e as "sd",
          dataIndex: e,
          key: e,
          width: 150,
          render: (_: number, record: { key: string; id: number }) => (
            <Space size="middle">
              <a
                onClick={() =>
                  onEdit(record.key, productData, setProductEdit, setVisibleEdit, [
                    { name: "id" },
                    { name: "name" },
                    { name: "price", type: "number" },
                    { name: "description", type: "textarea" },
                    { name: "category", type: "select" },
                    { name: "image", type: "file" },
                  ])
                }
              >
                Edit
              </a>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() =>
                  onDelete(record.id, API_PRODUCT, setRefesh, totalData, currentPage, pageSize, setCurrentPage)
                }
              >
                <a>Delete</a>
              </Popconfirm>
            </Space>
          ),
        };
      }
      if (e == "price") {
        return {
          title: e as "sd",
          dataIndex: e,
          key: e,
          width: 150,
        };
      }
      return {
        title: e,
        dataIndex: e,
        key: e,
        width: 300,
      };
    });
    return output;
  }, [productData]);

  return (
    <div className="listCategory">
      <div style={{ padding: 10 }}>
        <Row justify="space-between" align="bottom">
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            New Product
          </Button>
          <AdvancedSearchForm
            clear={onClearSearch}
            onFinish={onSearch}
            fiel={{ fiel1: "Product", fiel2: "Category" }}
            subSearch={category?.map((e: Category) => e.name)}
            visibleSub={true}
          />
        </Row>
        <CollectionForm
          text="Create"
          listfield={fiel}
          visible={visible}
          onCreate={onCreate}
          subSellec={category}
          onCancel={() => {
            setVisible(false);
          }}
        />
        <CollectionForm
          listfield={productEdit}
          visible={visibleEdit}
          text="Update"
          onCreate={onEditProduct}
          subSellec={category}
          onCancel={() => {
            setVisibleEdit(false);
          }}
        />
      </div>
      <TableComponent
        scrollX={true}
        onChangePagination={onChangePagination}
        loading={loading}
        totalData={totalData}
        pagination={{ pageIndex: currentPage, pageSize }}
        columns={columns}
        dataSource={productData}
        header="Product"
      ></TableComponent>
    </div>
  );
};

export default ProductPage;
