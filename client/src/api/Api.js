
import axios from "axios";
import { ErrorToast, SuccessToast } from "../helper/helper";

const BaseURL = "http://localhost:5000/api/v1";
// const BaseURL = "https://chat-app-rho-rosy.vercel.app/api/v1";

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

export const logout__Request__API = async () => {
  let URL = BaseURL + "/logout";

  try {
    const result = await axios.get(URL, { withCredentials: true, credentials: "include", });
    if (result.status === 200) {
      if (result.data["status"] === true) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    ErrorToast("Something went wrong!");
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

export const profile_update__Request__API = async (postBody) => {
  let URL = BaseURL + "/user-update";

  try {
    const result = await axios.post(URL, postBody, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === true) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    ErrorToast("profile update fail!");
    return false;
  }
};

export const Read_user_by_id_api = async (id)=>{
  let URL = BaseURL + `/read-user-by/`+ id;
  try {
    const result = await axios.get(URL, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === true) {
        return result.data;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}
export const Read_user_api = async ()=>{
  let URL = BaseURL + `/read-user`;
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

export const Read_Cobain_api = async (id)=>{
  const read_sender = await axios.post(
    `${BaseURL}/read-sender-chat`,
    { receiverID: id },
    {
      withCredentials: true,
    },
  );
  const read_receiver = await axios.post(
    `${BaseURL}/read-receiver-chat`,
    { senderID: id },
    {
      withCredentials: true,
    },
  );
  let data_1 = read_sender?.data?.data;
  let data_2 = read_receiver?.data?.data;
  let combinedData = data_1.concat(data_2);
  combinedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return combinedData;
 
}

export const forgot_password__Request__API = async (email) => {
  let URL = BaseURL + `/forgot-password/${email}`;

  try {
    const result = await axios.post(URL, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === true) {
        SuccessToast("OTP send success!");
        return true;
      } else {
        ErrorToast("No user found!");
        return false;
      }
    } else {
      ErrorToast("OTP send fail!");
      return false;
    }
  } catch (err) {
    ErrorToast("OTP send fail!");
    return false;
  }
};

export const otp__Request__API = async (email, otp) => {
  let URL = BaseURL + `/otp-verify/${email}/${otp}`;

  try {
    const result = await axios.post(URL, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === true) {
        SuccessToast("OTP verify success!");
        return true;
      } else {
        ErrorToast("OTP verify fail!");
        return false;
      }
    } else {
      ErrorToast("OTP verify fail!");
      return false;
    }
  } catch (err) {
    ErrorToast("OTP verify fail!");
    return false;
  }
};

export const reset_password__Request__API = async (email, otp, password) => {
  let URL = BaseURL + `/reset-password/${email}/${otp}`;

  try {
    const result = await axios.post(URL, { password }, { withCredentials: true });
    if (result.status === 200) {
      if (result.data["status"] === true) {
        SuccessToast("Password change success!");
        return true;
      } else {
        ErrorToast("Password change fail!");
        return false;
      }
    } else {
      ErrorToast("Password change fail!");
      return false;
    }
  } catch (err) {
    ErrorToast("Password change fail!");
    return false;
  }
};
