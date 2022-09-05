import { Button, message, Popconfirm, Row, Space, Tag } from "antd";
import axios, { AxiosError } from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { onDelete, onEdit } from "../../../assets/commonFunction/curdOnTable";
// import { Link } from "react-router-dom";
import { API_ROLE, API_USER, inputUser, fiel, Role, rootState, User } from "../../../assets/@type/RootConstant";
import CollectionForm from "../../common/collection/Collection";
import TableComponent from "../../common/table/tablecommon";
// import { Search } from "react-router-dom";
import AdvancedSearchForm from "../../common/formSearchTable/formSearch";
import { handleSearchUser } from "../../../action/action";
import { useDispatch, useSelector } from "react-redux";
const Users = () => {
  const SearchR = useSelector<rootState>(state => state.search.Search.user) as { role: number[]; search: string };
  const dispatch = useDispatch();
  // const [Search, setSearch] = useState({ search: "", role: 0 });
  const [role, setrole] = useState<Role[]>([]);
  const [userEdit, setuserEdit] = useState<fiel[]>();
  const [userData, setuserData] = useState<User[]>([]);
  // const [productColumn, setProductColumn] = useState([""]);
  const [pageSize, setPageSize] = useState<number>(1);
  const [totalData, setTotalData] = useState<number>(0);
  const [refesh, setRefesh] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(API_ROLE)
      .then(res => {
        const { data } = res.data;
        setrole(data);
        // console.log(data);
      })
      .catch(err => console.log(err));
  }, []);
  const fiel: fiel[] = [
    { name: "firstname", title: "First Name" },
    { name: "lastname", title: "Last Name" },
    { name: "email", title: "email", type: "email" },
    { name: "phone", title: "Phone", type: "phone" },
    { name: "roles", title: "Roles", type: "select" },
    { name: "address", title: "address", type: "textarea" },
  ];
  const onSearch = async (values: { User: string; Role: string[] }) => {
    // console.log(values);
    const result = role?.reduce((a: number[], e: Role) => {
      const test = values?.Role?.some((s: string) => s === e.name);
      if (test) return [...a, e.id];
      return a;
    }, []) as number[] | null;
    if (
      (SearchR.search != values.User && values.User != undefined) ||
      (JSON.stringify(SearchR.role) != JSON.stringify(result) && values.Role != undefined)
    ) {
      setCurrentPage(1);
      dispatch(
        handleSearchUser({
          search: values.User ? values.User : "",
          role: values.Role != undefined ? (result as number[]) : [],
        })
      );
      // setSearch({
      //   search: values.User ? values.User : "",
      //   role: values.Role ? result : 0,
      // });
    }
  };
  const onClearSearch = async () => {
    // console.log(Search);
    if (SearchR.search != "" || SearchR.role.length != 0) {
      setCurrentPage(1);
      dispatch(
        handleSearchUser({
          search: "",
          role: [],
        })
      );
    }
  };
  const onCreate = async (values: inputUser) => {
    console.log(values);
    // let a = "";
    // for (let i = 0; i < values.role.length; ++i) {
    //   a += role.reduce((a, e) => {
    //     if (e?.name == values.role[i]) {
    //       if (a == "") {
    //         return (a = +e.id?.toString());
    //       } else {
    //         return a + "," + e.id?.toString();
    //       }
    //     } else {
    //       return "" + a;
    //     }
    //   }, "");
    // }
    const result = role.reduce((a: number[], e: Role) => {
      const test = values.roles.some((s: string) => s === e.name);
      if (test) return [...a, e.id];
      return a;
    }, []);
    // console.log(typeof result);
    setVisible(false);
    try {
      //const x = values.role.map((e: string) => Number(e));
      // const data = new FormData();
      // if (values.photo) {
      //   console.log("first");
      //   data.append("photo", values.photo.fileList[0].originFileObj);
      // }
      // data.append("photo", values.photo.fileList[0].originFileObj);
      // data.append("name", values.name);
      // data.append("description", values.description);
      // data.append("price", values.price);
      // data.append("role", result);
      // console.log(data);
      const response = await axios.post(API_USER, {
        lastname: values.lastname,
        firstname: values.firstname,
        email: values.email,
        phone: values.phone,
        address: values.address,
        roles: result,
        // password: "dsadsa",
      });
      message.success(response.data.message);
      setRefesh(e => e + 1);
    } catch (error) {
      const err = error as AxiosError;
      const arr = err.response?.data as { message: string; statusCode: number };
      message.error(arr.message);
    }
  };

  const onEditUser = async (values: inputUser) => {
    console.log(values);
    const result = role.reduce((a: number[], e: Role) => {
      const test = values.roles?.some((s: string) => s === e.name);
      if (test) return [...a, e.id];
      return a;
    }, []);
    // console.log(values);
    // console.log({
    //   name: values.username,
    //   email: values.email,
    //   phone: values.phone,
    //   address: values.address,
    //   roles: result,
    //   password: "dsadsa",
    // });
    setVisibleEdit(false);
    try {
      //const x = values.category.map((e: string) => Number(e));
      const response = await axios.put(API_USER + "/" + values.id, {
        lastname: values.lastname,
        firstname: values.firstname,
        email: values.email,
        phone: values.phone,
        address: values.address,
        roles: result,
        // password: "dsadsa",
      });
      message.success(response.data.message);
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
    // console.log(`${API_USER}?page=${currentPage}&search=${SearchR.search}&role=${SearchR.role}`);
    const response = axios.get(
      `${API_USER}?page=${currentPage}&search=${SearchR.search}&role=${JSON.stringify(SearchR.role)}`
    );
    response.then(res => {
      // console.log(res);
      // const columns = Object.keys(res.data.data[0]);
      // console.log(columns);
      const data = res.data.data?.map((e: User) => {
        // console.log(e.roles);
        // const x = e.roles.map((e: any) => e.name);
        return {
          key: e.id,
          id: e.id,
          username: e.lastname ? e.firstname + " " + e.lastname : e.firstname,
          lastname: e.lastname,
          firstname: e.firstname,
          email: e.email,
          phone: e.phone,
          address: e.address,
          roles: e.roles?.map((e: Role) => e.name),
          created: new Date(Date.parse(e.created_at)).toLocaleString(),
          updated: new Date(Date.parse(e.updated_at)).toLocaleString(),
          Action: "Action",
        };
      });
      // console.log(data);
      setPageSize(res.data.limit);
      setTotalData(res.data.totalCount);
      setCurrentPage(res.data.currentPage);
      setuserData(data);
      // setProductColumn([...columns, "Action"]);
      setLoading(false);
      // console.log(data);
    });
    // return () => {
    //   onClearSearch();
    // };
  }, [currentPage, refesh, SearchR]);
  // console.log(userData);
  const columns = useMemo(() => {
    const output = ["user name", "email", "phone", "address", "roles", "created", "updated", "Action"].map(e => {
      // if (e == "image") {
      //   return {
      //     title: e,
      //     dataIndex: e,
      //     key: e,
      //     width: 160,
      //     render: (_: number, record: { image: string }) => {
      //       return (
      //         <img
      //           src={record.image}
      //           style={{
      //             maxWidth: 100,
      //           }}
      //         />
      //       );
      //     },
      //   };
      // }
      if (e == "roles") {
        return {
          title: e,
          dataIndex: e,
          key: e,
          width: 150,
          render: (_: number, record: { roles: string[] }) => {
            return (
              <>
                {record.roles?.map(tag => (
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
                  onEdit(record.key, userData, setuserEdit, setVisibleEdit, [
                    { name: "id" },
                    { name: "lastname" },
                    { name: "firstname" },
                    { name: "email", type: "email" },
                    { name: "phone", type: "phone" },
                    { name: "roles", type: "select" },
                    { name: "address", type: "textarea" },
                  ])
                }
              >
                Edit
              </a>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() =>
                  onDelete(record.id, API_USER, setRefesh, totalData, currentPage, pageSize, setCurrentPage)
                }
              >
                <a>Delete</a>
              </Popconfirm>
            </Space>
          ),
        };
      }
      if (e == "user name") {
        return {
          title: "user name",
          dataIndex: "username",
          key: e,
          width: 200,
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
  }, [userData]);
  // console.log(userEdit);
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
            New User
          </Button>
          <AdvancedSearchForm
            clear={onClearSearch}
            onFinish={onSearch}
            fiel={{ fiel1: "User", fiel2: "Role" }}
            subSearch={role?.map((e: Role) => e.name)}
            visibleSub={true}
          />
        </Row>
        <CollectionForm
          subSellec={role}
          text="Create"
          listfield={fiel}
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
        <CollectionForm
          subSellec={role}
          listfield={userEdit}
          visible={visibleEdit}
          text="Update"
          onCreate={onEditUser}
          onCancel={() => {
            setVisibleEdit(false);
          }}
        />
      </div>
      <TableComponent
        scrollX={false}
        onChangePagination={onChangePagination}
        loading={loading}
        totalData={totalData}
        pagination={{ pageIndex: currentPage, pageSize }}
        columns={columns}
        dataSource={userData}
        header="Users"
      ></TableComponent>
    </div>
  );
};

export default Users;
