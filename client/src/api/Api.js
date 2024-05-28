
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/helper";

const BaseURL = "http://localhost:5000/api/v1";
// const BaseURL = "https://invoice-mern.vercel.app/api/v1";


export const Read_all_user_api = async ()=>{
  let URL = BaseURL + `/read-all-user`;
  try {
    const result = await axios.get(URL);
    if (result.status === 200) {
      if (result.data["status"] === true) {
        return result.data;
      } else {
        console.log("Invoice get fail!-1");
        return false;
      }
    } else {
      console.log("Invoice get fail!-2");
      return false;
    }
  } catch (err) {
    console.log("Invoice get fail!");
    return false;
  }
}