import { message } from "antd";
import axios, { AxiosError } from "axios";
import { fiel } from "../@type/RootConstant";
import { common } from "../@type/typeF";

const onEdit = (
  text: string,
  iputdata: any[],
  setData: common,
  setVisible: common,
  renderfiel: { name: string; type?: string }[]
) => {
  let count = 0;
  const Arr = iputdata.filter(e => {
    return e.key == text;
  });
  const newArr: fiel[] = [];
  for (const a in Arr[0]) {
    for (let b = 0; b < renderfiel.length; b++) {
      if (a == renderfiel[b].name) {
        newArr[count] = { name: a, title: a, type: renderfiel[b].type };
        newArr[count].value = Arr[0][renderfiel[b].name];
        ++count;
      }
    }
  }
  // setCattegoryEdit(newArr)
  // setCattegoryEdit()
  // console.log(newArr);
  setData(newArr);
  setVisible(true);
};
const onDelete = async (
  value: number,
  api: string,
  refesh: common,
  total: number,
  current: number,
  limit: number,
  setCurrent: common
) => {
  try {
    // console.log(value);
    const response = await axios.delete(`${api}/${value}`);
    if (current > 1 && total % limit == 1) {
      setCurrent(current - 1);
    } else {
      refesh((e: number) => e + 1);
    }
    // console.log(response);
    message.success(response.data.message);
  } catch (error) {
    const err = error as AxiosError;
    const arr = err.response?.data as { message: string; statusCode: 409 };
    message.error(arr.message);
  }
};

// const onChangePagination = (page: number, setcurrentPage: common) => {
//   setcurrentPage(page);
// };
// const onCreate = async (values: RegistCommon, api: string, refesh: common, setVisible: common) => {
//   try {
//     const response = await axios.post(api, {
//       name: values.name,
//     });
//     // console.log(response);
//     message.success(response.data.message);
//     refesh((e: number) => e + 1);
//   } catch (error) {
//     message.error("Create fail");
//   }
//   setVisible(false);
// };
export { onEdit, onDelete };
