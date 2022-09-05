// import { CaretRightOutlined } from "@ant-design/icons";
// import { DEFAULT_PAGESIZE } from "@utils/constants";
// import { Collapse, ConfigProvider, Table } from "antd";
// import vn from "antd/es/locale-provider/vi_VN";
import { Table } from "antd";
import { GetComponentProps } from "rc-table/lib/interface";
import React, { useRef } from "react";
// import styled from "styled-components";
// const { Panel } = Collapse;
import "./table.scss";
export default function TableComponent(props: {
  // renderExtraAction?: any;
  dataSource?: any[] | undefined;
  columns: object[];
  header?: string;
  totalData?: number;
  rowSelection?: any;
  onRow?: any;
  loading?: boolean;
  onChangePagination?: any;
  pagination?: any;
  scrollX?: boolean | string;
  rowKey?: any;
  expandable?: any;
  summary?: any;
  components?: any;
  scrollY?: any;
  rowClassName?: string;
  id?: string;
}) {
  const tableRef = useRef(null);
  const {
    // renderExtraAction,
    dataSource = [],
    columns,
    header,
    totalData,
    rowSelection,
    onRow,
    loading,
    onChangePagination,
    pagination,
    scrollX,
    // rowKey,
    expandable,
    summary,
    components,
    scrollY,
    rowClassName,
    // id,
  } = props;
  // xử lý sự kiện mousewheel khi focus vào bảng
  // useEffect(() => {
  //   if (scrollX) {
  //     const scrollBar = document.getElementsByClassName("scroll-bars");
  //     const children = scrollBar[0].children[0];
  //     tableRef.current.addEventListener("mouseover", () => {
  //       children.style.overflow = "hidden";
  //     });
  //     tableRef.current.addEventListener("mouseout", () => {
  //       children.style.overflow = "scroll";
  //     });
  //   }
  // }, [scrollX]);
  // const onWheel = useCallback(
  //   (e) => {
  //     if (scrollX) {
  //       const container = document.getElementsByClassName("ant-table-body");
  //       container[0].scrollTo({
  //         top: 0,
  //         left: container[0].scrollLeft + e.deltaY,
  //       });
  //     }
  //   },
  //   [scrollX]
  // );
  // xử lý sự kiện mousewheel khi focus vào bảng
  return (
    // <ContainerStyled id={id ? id : "collapse-container"}>
    //     <Collapse
    //         defaultActiveKey={["1"]}
    //         expandIcon={({ isActive }) => (
    //             <CaretRightOutlined
    //                 style={{ fontSize: 18 }}
    //                 rotate={isActive ? 90 : 0}
    //             />
    //         )}
    //         className="table-component-panel"
    //     >
    //         <Panel
    //             header={header}
    //             extra={renderExtraAction ? renderExtraAction() : null}
    //             collapsible={"header"}
    //             key="1"
    //         >
    //             <ConfigProvider locale={vn}>
    //                 <TableStyled
    //                     id="container"
    //                     // onWheel={onWheel}
    //                     ref={tableRef}
    //
    <Table
      title={() => header}
      loading={loading}
      rowSelection={rowSelection ? rowSelection : null}
      columns={columns}
      bordered={true}
      dataSource={dataSource}
      // rowKey={(record) =>
      //   record ? record[rowKey] ?? record.id : null
      // }
      scroll={{
        x: scrollX ? scrollX : true,
        y: scrollY ? scrollY : false,
      }}
      summary={summary ? summary : null}
      // onChange={onChangePagination}
      pagination={
        pagination
          ? {
              total: totalData,
              showTotal: (total: number) => {
                if (total > 1) {
                  return ` ${total} records`;
                } else {
                  return ` ${total} record`;
                }
              },
              // defaultpageSize: DEFAULT_PAGESIZE,
              onChange: onChangePagination,
              defaultCurrent: 1,
              current: parseInt(pagination.pageIndex),
              pageSize: parseInt(pagination.pageSize),
              showSizeChanger: false,
            }
          : false
      }
      onRow={onRow ? onRow : null}
      expandable={expandable ? expandable : null}
      components={components ? components : null}
      rowClassName={rowClassName ? rowClassName : ""}
    />
    //                 </TableStyled >
    //             </ConfigProvider>
    //         </Panel>
    //     </Collapse>
    // </ContainerStyled>
  );
}

// const ContainerStyled = styled.div`
//   padding: 10px;

// `;
// const TableStyled = styled.div`
//   .ant-table-thead {
//     .ant-table-cell {
//       background: #d9d9d9;
//       color: #1f1f1f;
//     }
//   }
// `;
// const TableStyled = styled.div`
//   .ant-table-thead {
//     .ant-table-cell {
//       background: #d9d9d9;
//       color: #1f1f1f;
//     }
//   }
// `;
