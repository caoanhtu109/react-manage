import { Button, message, Popconfirm, Row, Space } from "antd";
import axios, { AxiosError } from "axios";
import React, { useMemo, useState } from "react";
// import { onDelete, onEdit } from "../../../assets/commonFunction/curdOnTable";
// import { Link } from "react-router-dom";
import { onDelete, onEdit } from "../../../assets/commonFunction/curdOnTable";
import { API_CATEGORY, Category, fiel, input, RegistCommon } from "../../../assets/@type/RootConstant";
// import CollectionForm from "../../common/newcollection/NewCollection";
import CollectionForm from "../../common/collection/Collection";
import TableComponent from "../../common/table/tablecommon";
// import FormSearch from "../../common/formSearchTable/formSearch";
import AdvancedSearchForm from "../../common/formSearchTable/formSearch";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleSearchProduct } from "../../../action/action";

const CategoryPage = () => {
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const [Search, setSearch] = useState({ search: "" });
  const fiel: fiel[] = [{ name: "name", title: "Name Category" }];
  const [cattegoryEdit, setCattegoryEdit] = useState<fiel[]>();
  const [categorydata, setcategorydata] = useState<Category[]>([]);
  // const [categorycolum, setcategorycolum] = useState([""]);
  const [pagasize, setpagasize] = useState<number>(1);
  const [totalData, settotalData] = useState<number>(0);
  const [refesh, setrefesh] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [visible, setVisible] = useState(false);
  const [visibleedit, setVisibleedit] = useState(false);
  const [loading, setloading] = useState(true);
  // console.log(cattegoryEdit);
  // const onEdit = (text: string) => {
  //     let count = 0;
  //     const Arr = categorydata.filter((e) => {
  //         return e.key == text;
  //     });
  //     const newArr: fiel[] = [];
  //     for (const a in Arr[0]) {
  //         if (a == "id" || a == "name") {
  //             newArr[count] = { name: a, title: a };
  //             newArr[count].value = Arr[0][a];
  //             ++count;
  //         }
  //     }
  //     // setCattegoryEdit(newArr)
  //     // setCattegoryEdit()
  //     console.log(newArr);
  //     setCattegoryEdit(newArr);
  //     setVisibleedit(true);
  // };
  // const onDelete = async (value: number) => {
  //     try {
  //         const response = await axios.delete(`${API_CATEGORY}/${value}`);
  //         setrefesh((e) => e + 1);
  //         message.success(response.data.message);
  //     } catch (error) {
  //         message.error("Delete fail");
  //     }
  // };
  const onFinish = async (values: { Category: string }) => {
    // console.log(values);
    if (Search.search != values.Category && values.Category != undefined) {
      setcurrentPage(1);
      setSearch({
        search: values.Category,
      });
    }
    // console.log(values);
  };
  const onClearSearch = async () => {
    // console.log(Search);
    if (Search.search != "") {
      setcurrentPage(1);
      setSearch({
        search: "",
      });
    }
  };
  const onNavigateSearch = (value: string) => {
    const result = categorydata.reduce((a: number[], e: Category) => {
      if (e.name === value) return [...a, e.id];
      return a;
    }, []);
    // console.log({
    //   search: "",
    //   category: result,
    // });
    // console.log("dasd", result);
    dispatch(
      handleSearchProduct({
        search: "",
        category: result,
      })
    );
    nagivate("../products");
  };
  const onCreate = async (values: RegistCommon) => {
    setVisible(false);
    try {
      const response = await axios.post(API_CATEGORY, {
        name: values.name,
      });
      // console.log(response);
      message.success(response.data.message);
      setrefesh(e => e + 1);
    } catch (error) {
      const err = error as AxiosError;
      const arr = err.response?.data as { message: string; statusCode: 409 };
      message.error(arr.message);
    }
  };
  const onEditCategory = async (values: input) => {
    setVisibleedit(false);
    try {
      const response = await axios.put(`${API_CATEGORY}/${values.id}`, {
        name: values.name,
      });
      // console.log(response);
      message.success(response.data.message);
      setrefesh(e => e + 1);
    } catch (error) {
      const err = error as AxiosError;
      const arr = err.response?.data as { message: string; statusCode: 409 };
      message.error(arr.message);
    }
  };

  const onChangePagination = (page: number) => {
    setcurrentPage(page);
  };
  // console.log(typeof datacat)
  // const dispatch = useDispatch()
  React.useLayoutEffect(() => {
    setloading(true);
    const response = axios.get(`${API_CATEGORY}?page=${currentPage}&search=${Search.search}`);
    response.then(res => {
      // const columns = Object.keys(res.data.data[0]);
      // console.log(columns);
      // console.log(res);
      const data = res.data.data.map((e: input) => {
        return {
          key: e.id,
          ...e,
          Created: new Date(Date.parse(e.created_at)).toLocaleString(),
          Updated: new Date(Date.parse(e.updated_at)).toLocaleString(),
          Action: "Action",
        };
      });
      setpagasize(res.data.limit);
      settotalData(res.data.totalCount);
      setcurrentPage(res.data.currentPage);
      setcategorydata(data);
      // setcategorycolum(["name", "Created", "Updated", "Action"]);
      setloading(false);
      // console.log(data);
    });
  }, [currentPage, refesh, Search]);
  const columns = useMemo(() => {
    const output = ["name", "Created", "Updated", "Action"].map(e => {
      if (e == "Action") {
        return {
          title: e as "sd",
          dataIndex: e,
          key: e,
          width: 100,
          render: (_: number, record: { key: string; id: number }) => (
            <Space size="middle">
              <a
                onClick={() =>
                  onEdit(record.key, categorydata, setCattegoryEdit, setVisibleedit, [{ name: "id" }, { name: "name" }])
                }
              >
                Edit
              </a>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() =>
                  onDelete(record.id, API_CATEGORY, setrefesh, totalData, currentPage, pagasize, setcurrentPage)
                }
              >
                <a>Delete</a>
              </Popconfirm>
            </Space>
          ),
        };
      } else if (e == "name") {
        return {
          title: e as "sd",
          dataIndex: e,
          key: e,
          width: 100,
          render: (_: number, record: { name: string; id: number }) => {
            // console.log(record);
            return (
              <Space size="middle">
                <a onClick={() => onNavigateSearch(record.name)}>{record.name}</a>
              </Space>
            );
          },
        };
      } else {
        return {
          title: e,
          dataIndex: e,
          key: e,
          width: 300,
        };
      }
    });
    return output;
  }, [categorydata]);
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
            New Category
          </Button>
          <AdvancedSearchForm
            clear={onClearSearch}
            onFinish={onFinish}
            fiel={{ fiel1: "Category", fiel2: "" }}
            // subSearch={Category?.map((e: any) => e.name)}
            visibleSub={false}
          />
          {/* <AdvancedSearchForm visibleSub={true} /> */}
        </Row>
        <CollectionForm
          text="Create"
          listfield={fiel}
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
        {visibleedit && (
          <CollectionForm
            listfield={cattegoryEdit}
            visible={true}
            text="Update"
            onCreate={onEditCategory}
            onCancel={() => {
              setVisibleedit(false);
            }}
          />
        )}
      </div>
      <TableComponent
        scrollX={false}
        scrollY={false}
        onChangePagination={onChangePagination}
        loading={loading}
        totalData={totalData}
        pagination={{ pageIndex: currentPage, pageSize: pagasize }}
        columns={columns}
        dataSource={categorydata}
        header="Categories"
      ></TableComponent>
    </div>
  );
};
export default CategoryPage;
