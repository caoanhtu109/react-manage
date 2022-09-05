import { Row, Button, Popconfirm, Space } from "antd";
// import input from "antd/lib/input";
import axios from "axios";
import React, { useMemo, useState } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_ORDER, Order } from "../../../assets/@type/RootConstant";
import { onDelete } from "../../../assets/commonFunction/curdOnTable";
// import { API_PRODUCT, fiel } from "../../../assets/@type/RootConstant";
// import AdvancedSearchForm from "../../common/formSearchTable/formSearch";
import TableComponent from "../../common/table/tablecommon";
// import Role from "../roles/Role";
// import CollectionForm from "../../common/collection/Collection";
// import { onEdit, onDelete } from "../../../assets/commonFunction/curdOnTable";
const Orders = () => {
  // const dispatch = useDispatch();
  const nagivate = useNavigate();
  // const [Search, setSearch] = useState({ search: "" });
  // const fiel: fiel[] = [{ name: "name", title: "Name Role" }];
  // const [roleEdit, setroleEdit] = useState<fiel[]>();
  const [orderData, setOderdata] = useState<Order[]>([]);
  // const [roleolum, setroleolum] = useState([""]);
  const [pageSize, setPageSize] = useState<number>(1);
  const [totalData, settotalData] = useState<number>(0);
  const [refesh, setRefesh] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const [visible, setVisible] = useState(false);
  // const [visibleedit, setVisibleedit] = useState(false);
  const [loading, setloading] = useState(true);
  // const data: any = [
  //   {
  //     iD: 1,
  //     username: "Anhtu",
  //     totalprice: 3000,
  //     status: "Payment",
  //     created: "8/5/2022, 8:26:37 AM",
  //     updated: "8/15/2022, 4:58:49 PM",
  //     Action: "Action",
  //   },
  // ];
  // const [loading, setLoading] = useState(true);
  // const [pageSize, setPageSize] = useState<number>(1);
  // const [totalData, setTotalData] = useState<number>(0);
  // const [refesh, setRefesh] = useState<number>(0);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  React.useLayoutEffect(() => {
    setloading(true);
    const response = axios.get(`${API_ORDER}?page=${currentPage}`);
    response.then(res => {
      // const columns = Object.keys(res.data.data[0]);
      // console.log(columns);
      console.log(res);
      const data = res.data.data.map((e: any) => {
        console.log(new Date(Date.parse(e.created_at)).toLocaleString());
        console.log(e.created_at);

        return {
          key: e.order_id,
          iD: e.order_id,
          userid: e.user_id,
          username: e.firstname,
          totalprice: e.total_price,
          status: e.status,
          Created: new Date(Date.parse(e.create_at)).toLocaleString(),
          Updated: new Date(Date.parse(e.update_at)).toLocaleString(),
          Action: "Action",
        };
      });
      setPageSize(res.data.limit);
      settotalData(res.data.totalCount);
      setCurrentPage(res.data.currentPage);
      setOderdata(data);
      // setroleolum([...columns, "Action"]);
      setloading(false);
      // console.log(data);
    });
  }, [currentPage, refesh]);
  const columns = useMemo(() => {
    const output = ["iD", "username", "totalprice", "status", "Created", "Updated", "Action"].map(e => {
      if (e == "username") {
        return {
          title: "user name",
          dataIndex: e,
          key: e,
          width: 300,
        };
      }
      if (e == "totalprice") {
        return {
          title: "total price",
          dataIndex: e,
          key: e,
          width: 300,
        };
      }
      if (e == "Action") {
        return {
          title: e as "sd",
          dataIndex: e,
          key: e,
          width: 150,
          render: (_: number, record: { key: string; iD: number }) => (
            <Space size="middle">
              <a
                onClick={() => {
                  nagivate(`./detail/${record.iD}`);
                }}
              >
                Details
              </a>
              <a
                onClick={() => {
                  nagivate(`./edit/${record.iD}`);
                }}
              >
                Edit
              </a>
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() =>
                  onDelete(record.iD, API_ORDER, setRefesh, totalData, currentPage, pageSize, setCurrentPage)
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
  }, [orderData]);
  const onChangePagination = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className="listUsers">
      <div style={{ padding: 10 }}>
        <Row justify="space-between" align="bottom">
          <Button
            type="primary"
            onClick={() => {
              nagivate("create");
            }}
          >
            New Oder
          </Button>
          {/* <AdvancedSearchForm
            clear={onClearSearch}
            onFinish={onFinish}
            fiel={{ fiel1: "Role", fiel2: "" }}
            // subSearch={Category?.map((e: any) => e.name)}
            visibleSub={false}
          /> */}
        </Row>
        {/* <CollectionForm
          text="Create"
          listfield={fiel}
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        /> */}
        {/* <CollectionForm
          listfield={roleEdit}
          visible={visibleedit}
          text="Update"
          onCreate={onEditRole}
          onCancel={() => {
            setVisibleedit(false);
          }}
        /> */}
      </div>
      <TableComponent
        scrollX={false}
        onChangePagination={onChangePagination}
        loading={loading}
        totalData={totalData}
        pagination={{ pageIndex: currentPage, pageSize: pageSize }}
        columns={columns}
        dataSource={orderData}
        header="Oders"
      ></TableComponent>
    </div>
  );
};
export default Orders;
