import { Button, message, Popconfirm, Row, Space } from "antd";
import axios, { AxiosError } from "axios";
import React, { useMemo, useState } from "react";
import { onDelete, onEdit } from "../../../assets/commonFunction/curdOnTable";
// import { Link } from "react-router-dom";
import { API_ROLE, fiel, input, RegistCommon, Role } from "../../../assets/@type/RootConstant";
import CollectionForm from "../../common/collection/Collection";
import TableComponent from "../../common/table/tablecommon";
import AdvancedSearchForm from "../../common/formSearchTable/formSearch";
import { useDispatch } from "react-redux";
import { handleSearchUser } from "../../../action/action";
import { useNavigate } from "react-router-dom";

const Roles = () => {
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const [Search, setSearch] = useState({ search: "" });
  const fiel: fiel[] = [{ name: "name", title: "Name Role" }];
  const [roleEdit, setroleEdit] = useState<fiel[]>();
  const [roledata, setroledata] = useState<Role[]>([]);
  // const [roleolum, setroleolum] = useState([""]);
  const [pagasize, setpagasize] = useState<number>(1);
  const [totalData, settotalData] = useState<number>(0);
  const [refesh, setrefesh] = useState<number>(0);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [visible, setVisible] = useState(false);
  const [visibleedit, setVisibleedit] = useState(false);
  const [loading, setloading] = useState(true);
  // console.log(roleEdit);
  // const onEdit = (text: string) => {
  //     let count = 0;
  //     const Arr = roledata.filter((e) => {
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
  //     // setroleEdit(newArr)
  //     // setroleEdit()
  //     console.log(newArr);
  //     setroleEdit(newArr);
  //     setVisibleedit(true);
  // };
  // const onDelete = async (value: number) => {
  //     try {
  //         const response = await axios.delete(`${API_ROLE}/${value}`);
  //         setrefesh((e) => e + 1);
  //         message.success(response.data.message);
  //     } catch (error) {
  //         message.error("Delete fail");
  //     }
  // };
  const onNavigateSearch = (value: string) => {
    const result = roledata.find((a: Role) => {
      return a.name === value;
    })?.id;
    dispatch(
      handleSearchUser({
        search: "",
        role: result != null && result != undefined ? [result] : [],
      })
    );
    nagivate("../users");
  };
  const onFinish = async (values: { Role: string }) => {
    // console.log(values);
    if (Search.search != values.Role && values.Role != undefined) {
      // dispatch(handleSearchUser("a"));
      setcurrentPage(1);
      setSearch({
        search: values.Role,
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
  const onCreate = async (values: RegistCommon) => {
    setVisible(false);
    try {
      const response = await axios.post(API_ROLE, {
        name: values.name,
      });
      // console.log(response);
      message.success(response.data.message);
      setrefesh(e => e + 1);
    } catch (error) {
      const err = error as AxiosError;
      const arr = err.response?.data as { message: string; statusCode: number };
      message.error(arr.message);
    }
  };
  const onEditRole = async (values: input) => {
    setVisibleedit(false);
    try {
      const response = await axios.put(`${API_ROLE}/${values.id}`, {
        name: values.name,
      });
      // console.log(response);
      message.success(response.data.message);
      setrefesh(e => e + 1);
    } catch (error) {
      const err = error as AxiosError;
      // console.log(err);
      const arr = err.response?.data as { message: string; statusCode: number };
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
    const response = axios.get(`${API_ROLE}?page=${currentPage}&search=${Search.search}`);
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
      setroledata(data);
      // setroleolum([...columns, "Action"]);
      setloading(false);
      // console.log(data);
    });
  }, [currentPage, refesh, Search]);
  const columns = useMemo(() => {
    const output = ["name", "Created", "Updated", "Action"].map(e => {
      if (e == "name") {
        return {
          title: e as "sd",
          dataIndex: e,
          key: e,
          width: 100,
          render: (_: number, record: { name: string }) => {
            // console.log(record);
            return (
              <Space size="middle">
                <a onClick={() => onNavigateSearch(record.name)}>{record.name}</a>
              </Space>
            );
          },
        };
      } else if (e == "Action") {
        return {
          title: e,
          dataIndex: e,
          key: e,
          width: 100,
          render: (_: number, record: { key: string; id: number }) => (
            <Space size="middle">
              <a
                onClick={() =>
                  onEdit(record.key, roledata, setroleEdit, setVisibleedit, [{ name: "id" }, { name: "name" }])
                }
              >
                Edit
              </a>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() =>
                  onDelete(record.id, API_ROLE, setrefesh, totalData, currentPage, pagasize, setcurrentPage)
                }
              >
                <a>Delete</a>
              </Popconfirm>
            </Space>
          ),
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
  }, [roledata]);
  return (
    <div className="listUsers">
      <div style={{ padding: 10 }}>
        <Row justify="space-between" align="bottom">
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            New Role
          </Button>
          <AdvancedSearchForm
            clear={onClearSearch}
            onFinish={onFinish}
            fiel={{ fiel1: "Role", fiel2: "" }}
            // subSearch={Category?.map((e: any) => e.name)}
            visibleSub={false}
          />
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
        <CollectionForm
          listfield={roleEdit}
          visible={visibleedit}
          text="Update"
          onCreate={onEditRole}
          onCancel={() => {
            setVisibleedit(false);
          }}
        />
      </div>
      <TableComponent
        scrollX={false}
        onChangePagination={onChangePagination}
        loading={loading}
        totalData={totalData}
        pagination={{ pageIndex: currentPage, pageSize: pagasize }}
        columns={columns}
        dataSource={roledata}
        header="Roles"
      ></TableComponent>
    </div>
  );
};
export default Roles;
