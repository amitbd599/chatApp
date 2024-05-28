
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/helper";

const BaseURL = "http://localhost:5000/api/v1";
// const BaseURL = "https://invoice-mern.vercel.app/api/v1";

export const reg__Request__API = async (postBody) => {
  let URL = BaseURL + "/register";

  try {
    const result = await axios.post(URL, postBody, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === true) {
        SuccessToast("User create success!");
        return true;
      } else if (result.data["status"] === false && result.data["msg"] === "have account") {
        ErrorToast("Already have an account registered. No more accounts can be added!");
        return false;
      } else if (result.data["status"] === false && result.data[false]["keyPattern"]["email"] === 1) {
        ErrorToast("Email already registered!");
        return false;
      }
    } else {
      console.log("Login fail!-2");
      return false;
    }
  } catch (err) {
    ErrorToast("Login fail!");
    return false;
  }
};

export const login__Request__API = async (postBody) => {
  let URL = BaseURL + "/login";

  try {
    const result = await axios.post(URL, postBody, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === true) {
        SuccessToast("Login Success!");
        return true;
      } else if (result.data["status"] === "unauthorized") {
        ErrorToast("Email or password not match!");
        return false;
      }
    } else {
      console.log("Login fail!-2");
      return false;
    }
  } catch (err) {
    ErrorToast("Login fail!");
    return false;
  }
};


export const Read_all_user_api = async ()=>{
  let URL = BaseURL + `/read-all-user`;
  try {
    const result = await axios.get(URL, { withCredentials: true });
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