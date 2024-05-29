import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import {
  Read_Cobain_api,
  Read_all_user_api,
  Read_user_api,
  Read_user_by_id_api,
  logout__Request__API,
  profile_update__Request__API,
} from '../api/Api';
import { Link } from 'react-router-dom';
import { ErrorToast, IsEmpty, SuccessToast, getBase64 } from '../helper/helper';
import { FaXmark } from 'react-icons/fa6';
import axios from 'axios';
import SkeletonLoader from '../helper/SkeletonLoader';

// const ENDPOINT = 'http://localhost:5000';
// const BaseURL = 'http://localhost:5000/api/v1';

const ENDPOINT = 'https://7da47a0d-603c-470a-9129-c9b38fc6eb4a-00-2yv2f4l8tiww9.janeway.replit.dev';
const BaseURL = 'https://7da47a0d-603c-470a-9129-c9b38fc6eb4a-00-2yv2f4l8tiww9.janeway.replit.dev/api/v1';

const Home = () => {
  let [activeUserChatID, setActiveUserChatID] = useState(null);
  let [loading, setLoading] = useState(false);
  let [user, setUser] = useState([]);
  let [singleUser, setSingleUser] = useState([]);
  let [singleUserByID, SetSingleUserByID] = useState([]);
  let [chatSide, setChatSide] = useState(false);
  // let [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    Read_all_user_api().then((res) => {
      if (res?.status === true) {
        setUser(res?.data);
        setLoading(false);
        Read_Cobain_api(res?.data[0]?._id).then((res_2) => {
          if (res_2) {
            setMessages(res_2);
            setActiveUserChatID(res?.data[0]?._id);
            setLoading(false);
          }
        });
        Read_user_by_id_api(res?.data[0]?._id).then((res_3) => {
          if (res_3?.status === true) {
            SetSingleUserByID(res_3?.data[0]);
            setLoading(false);
          }
        });
      }
    });
    Read_user_api().then((res) => {
      if (res?.status === true) {
        setSingleUser(res?.data[0]);
        setImg(res?.data[0]?.img);
        setLoading(false);
      }
    });
  }, []);

  // socket start
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const sendMessage = async (id) => {
    let senderID = singleUser?._id;
    let receiverID = id;
    const newMessage = { senderID, receiverID, message };
    await axios.post(`${BaseURL}/create-chat`, newMessage, {
      withCredentials: true,
    });
    const socket = socketIOClient(ENDPOINT);
    socket.emit('chat message', newMessage);
    // setData(newMessage);
    setMessage('');
  };

  // socket end
  const deleteAllCookies = () => {
    logout__Request__API().then((result) => {
      if (result) {
        window.location.href = '/login';
      }
    });
  };

  let passwordRef,
    confirm_passwordRef,
    firstNameRef,
    lastNameRef,
    mobileNoRef,
    bioRef,
    locationRef = useRef();

  let [img, setImg] = useState('');
  const bgHandel = (event) => {
    const file = event.target.files[0];
    if (file.size > 200 * 1024) {
      ErrorToast('File size exceeds 200KB.');
    } else {
      getBase64(event.target.files[0]).then((base64Img) => {
        setImg(base64Img);
      });
    }
  };

  const profileUpdate = () => {
    setLoading(true);
    let password = passwordRef.value;
    let confirm_password = confirm_passwordRef.value;
    let firstName = firstNameRef.value;
    let lastName = lastNameRef.value;
    let mobileNo = mobileNoRef.value;
    let bio = bioRef.value;
    let location = locationRef.value;
    if (IsEmpty(password)) {
      ErrorToast('Password required!');
      setLoading(false);
    } else if (IsEmpty(confirm_password)) {
      ErrorToast('Password required!');
      setLoading(false);
    } else if (password !== confirm_password) {
      ErrorToast('New password & confirm password not match!');
      setLoading(false);
    } else if (IsEmpty(firstName)) {
      ErrorToast('First name required!');
      setLoading(false);
    } else if (IsEmpty(lastName)) {
      ErrorToast('Last name required!');
      setLoading(false);
    } else if (IsEmpty(mobileNo)) {
      ErrorToast('Phone number required!');
      setLoading(false);
    } else if (IsEmpty(bio)) {
      ErrorToast('Bio required!');
      setLoading(false);
    } else if (IsEmpty(location)) {
      ErrorToast('Location required!');
      setLoading(false);
    } else {
      let body = {
        password,
        firstName,
        lastName,
        mobileNo,
        img,
        bio,
        location,
      };

      profile_update__Request__API(body).then((result) => {
        if (result === true) {
          SuccessToast('Profile updated');
          Read_user_api().then((res) => {
            if (res?.status === true) {
              setSingleUser(res?.data[0]);
              setImg(res?.data[0]?.img);
              setLoading(false);
            }
          });
        }
      });
    }
  };

  let filterUser = user.filter((item) => item?._id !== singleUser?._id);

  let getID = async (id) => {
    setChatSide(true);
    Read_Cobain_api(id).then((res) => {
      if (res) {
        setMessages(res);
        setActiveUserChatID(id);
      }
    });

    Read_user_by_id_api(id).then((res) => {
      if (res?.status === true) {
        SetSingleUserByID(res?.data[0]);
      }
    });
  };

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on('chat message', (msg) => {
      msg.receiverID = activeUserChatID;
      const date = new Date();
      msg.createdAt = date.toISOString();
      // data.senderID = singleUser?._id;
      setMessages((messages) => [...messages, msg]);
    });

    return () => socket.disconnect();
  }, []);

  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function convertToBDTime(isoString) {
    const date = new Date(isoString);
    const options = {
      timeZone: 'Asia/Dhaka',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
    };
    const bdTimeString = date.toLocaleString('en-US', options);

    return bdTimeString;
  }
  return (
    <div className="layout-wrapper d-lg-flex">
      {/* Start left sidebar-menu */}
      <div className="side-menu flex-lg-column ">
        {/* LOGO */}
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={30}
                height={30}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M7.291 20.824L2 22l1.176-5.291A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.956 9.956 0 0 1-4.709-1.176zm.29-2.113l.653.35A7.955 7.955 0 0 0 12 20a8 8 0 1 0-8-8c0 1.334.325 2.618.94 3.766l.349.653-.655 2.947 2.947-.655zM7 12h2a3 3 0 0 0 6 0h2a5 5 0 0 1-10 0z" />
              </svg>
            </span>
          </Link>
          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={30}
                height={30}
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M7.291 20.824L2 22l1.176-5.291A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.956 9.956 0 0 1-4.709-1.176zm.29-2.113l.653.35A7.955 7.955 0 0 0 12 20a8 8 0 1 0-8-8c0 1.334.325 2.618.94 3.766l.349.653-.655 2.947 2.947-.655zM7 12h2a3 3 0 0 0 6 0h2a5 5 0 0 1-10 0z" />
              </svg>
            </span>
          </Link>
        </div>
        {/* end navbar-brand-box */}
        {/* Start side-menu nav */}
        <div className="flex-lg-column my-0 sidemenu-navigation">
          <ul className="nav nav-pills side-menu-nav" role="tablist">
            <li className="nav-item d-none d-lg-block">
              <a
                className="nav-link active"
                id="pills-user-tab"
                data-bs-toggle="pill"
                href="#pills-user"
                role="tab"
              >
                <i className="ri-user-3-line" />
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link "
                id="pills-chat-tab"
                data-bs-toggle="pill"
                href="#pills-chat"
                role="tab"
              >
                <i className="ri-discuss-line" />
              </a>
            </li>

            <li className="nav-item d-none d-lg-block">
              <a
                className="nav-link"
                id="pills-setting-tab"
                data-bs-toggle="pill"
                href="#pills-setting"
                role="tab"
              >
                <i className="ri-settings-4-line" />
              </a>
            </li>
            <li className="nav-item mt-lg-auto"></li>
            <li className="nav-item dropdown profile-user-dropdown">
              <Link
                className="nav-link dropdown-toggle bg-light"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src={
                    loading
                      ? singleUser?.img
                      : '/assets/images/users/user-dummy-img.jpg'
                  }
                  className="profile-user rounded-circle"
                  alt=""
                />
              </Link>
              <div className="dropdown-menu">
                <a
                  className="dropdown-item d-flex align-items-center justify-content-between"
                  id="pills-user-tab"
                  data-bs-toggle="pill"
                  href="#pills-user"
                  role="tab"
                >
                  Profile <i className="bx bx-user-circle text-muted ms-1" />
                </a>
                <a
                  className="dropdown-item d-flex align-items-center justify-content-between"
                  id="pills-setting-tab"
                  data-bs-toggle="pill"
                  href="#pills-setting"
                  role="tab"
                >
                  Setting <i className="bx bx-cog text-muted ms-1" />
                </a>

                <div className="dropdown-divider" />
                <button
                  onClick={deleteAllCookies}
                  className="dropdown-item d-flex align-items-center justify-content-between"
                >
                  Log out <i className="bx bx-log-out-circle text-muted ms-1" />
                </button>
              </div>
            </li>
          </ul>
        </div>
        {/* end side-menu nav */}
      </div>
      {/* end left sidebar-menu */}
      {/* start chat-leftsidebar */}
      <div className="chat-leftsidebar ">
        <div className="tab-content">
          {/* Start Profile tab-pane */}
          <div
            className="tab-pane show active"
            id="pills-user"
            role="tabpanel"
            aria-labelledby="pills-user-tab"
          >
            {/* Start profile content */}
            <div>
              <div className="user-profile-img">
                <img
                  src="assets/images/4902908.jpg"
                  className="profile-img"
                  style={{ height: 160 }}
                  alt=""
                />
                <div className="overlay-content">
                  <div>
                    <div className="user-chat-nav p-2 ps-3">
                      <div className="d-flex w-100 align-items-center">
                        <div className="flex-grow-1">
                          <h5 className="text-white mb-0">My Profile</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center border-bottom border-bottom-dashed pt-2 pb-4 mt-n5 position-relative">
                <div className="mb-lg-3 mb-2">
                  <img
                    src={
                      loading
                        ? '/assets/images/users/user-dummy-img.jpg'
                        : singleUser?.img
                    }
                    className="rounded-circle avatar-lg img-thumbnail"
                    alt=""
                  />
                </div>
                {loading === false ? (
                  <>
                    <h5 className="fs-17 mb-1 text-truncate">
                      {singleUser?.firstName} {singleUser?.lastName}
                    </h5>
                    <p className="text-muted fs-14 text-truncate mb-0">
                      {singleUser?.email}
                    </p>
                    <p className="text-muted fs-12 text-truncate mb-0">
                      {singleUser?.mobileNo}
                    </p>
                  </>
                ) : (
                  <div className="px-4">
                    <SkeletonLoader item={5} />
                  </div>
                )}
              </div>
              {/* End profile user */}
              {/* Start user-profile-desc */}
              <div className="p-4 profile-desc" data-simplebar="">
                <div className="text-muted">
                  {loading === false ? (
                    <p className="mb-3">{singleUser?.bio}</p>
                  ) : (
                    <div className="px-4">
                      <SkeletonLoader item={1} />
                    </div>
                  )}
                </div>
                <div className="border-bottom border-bottom-dashed mb-4 pb-2">
                  {loading === false ? (
                    <>
                      <div className="d-flex py-2 align-items-center">
                        <div className="flex-shrink-0 me-3">
                          <i className="bx bx-user align-middle text-muted fs-19" />
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0">
                            {singleUser?.firstName} {singleUser?.lastName}
                          </p>
                        </div>
                      </div>
                      <div className="d-flex py-2 align-items-center">
                        <div className="flex-shrink-0 me-3">
                          <i className="ri-phone-line align-middle text-muted fs-19" />
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0"> {singleUser?.mobileNo}</p>
                        </div>
                      </div>
                      <div className="d-flex py-2 align-items-center">
                        <div className="flex-shrink-0 me-3">
                          <i className="ri-message-2-line align-middle text-muted fs-19" />
                        </div>
                        <div className="flex-grow-1">
                          <p className="fw-medium mb-0"> {singleUser?.email}</p>
                        </div>
                      </div>
                      <div className="d-flex py-2 align-items-center">
                        <div className="flex-shrink-0 me-3">
                          <i className="ri-map-pin-2-line align-middle text-muted fs-19" />
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0"> {singleUser?.location}</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <SkeletonLoader item={10} />
                    </div>
                  )}
                </div>
              </div>
              {/* end user-profile-desc */}
            </div>
            {/* End profile content */}
          </div>
          {/* End Profile tab-pane */}
          {/* Start chats tab-pane */}
          <div
            className="tab-pane "
            id="pills-chat"
            role="tabpanel"
            aria-labelledby="pills-chat-tab"
          >
            {/* Start chats content */}
            <div>
              <div className="px-4 pt-4">
                <div className="d-flex align-items-start">
                  <div className="flex-grow-1">
                    <h4 className="mb-4">Messages</h4>
                  </div>
                </div>
              </div>

              {/* Chat inner */}
              <div className="chat-message-list">
                <ul
                  className="list-unstyled chat-list chat-user-list"
                  id="favourite-users"
                >
                  {loading === false ? (
                    <>
                      {filterUser.map((item, index) => (
                        <li
                          id="contact-id-1"
                          data-name="favorite"
                          className="mt-2"
                          key={index}
                        >
                          <Link
                            onClick={() => getID(item?._id)}
                            to="#"
                            className="unread-msg-user"
                          >
                            <div className="d-flex align-items-center">
                              <div className="chat-user-img online align-self-center me-2 ms-0">
                                <img
                                  src={item?.img}
                                  className="rounded-circle avatar-xs"
                                  alt=""
                                />
                                <span className="user-status" />
                              </div>
                              <div className="overflow-hidden me-2">
                                <p className="text-truncate chat-username mb-0">
                                  {item?.firstName} {item?.lastName}
                                </p>
                                <p className="text-truncate text-muted fs-13 mb-0">
                                  {item?.email}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </>
                  ) : (
                    <div className="px-4">
                      <SkeletonLoader item={38} />
                    </div>
                  )}
                </ul>
              </div>
            </div>
            {/* Start chats content */}
          </div>
          {/* End chats tab-pane */}
          {/* Start contacts tab-pane */}

          {/* End contacts tab-pane */}
          {/* Start calls tab-pane */}
          <div
            className="tab-pane"
            id="pills-calls"
            role="tabpanel"
            aria-labelledby="pills-calls-tab"
          >
            {/* Start Contact content */}
            <div>
              <div className="px-4 pt-4">
                <div className="d-flex align-items-start">
                  <div className="flex-grow-1">
                    <h4 className="mb-3">Calls</h4>
                  </div>
                </div>
              </div>
              {/* end p-4 */}
              {/* Start contact lists */}
              <div
                className="chat-message-list chat-call-list"
                data-simplebar=""
              >
                <ul className="list-unstyled chat-list" id="callList"></ul>
              </div>
              {/* end contact lists */}
            </div>
            {/* Start Contact content */}
          </div>
          {/* End calls tab-pane */}

          {/* Start settings tab-pane */}
          <div
            className="tab-pane"
            id="pills-setting"
            role="tabpanel"
            aria-labelledby="pills-setting-tab"
          >
            {/* Start Settings content */}
            <div>
              <div className="user-profile-img">
                <img
                  src="assets/images/small/img-4.jpg"
                  className="profile-img profile-foreground-img"
                  style={{ height: 160 }}
                  alt=""
                />
                <div className="overlay-content">
                  <div>
                    <div className="user-chat-nav p-3">
                      <div className="d-flex w-100 align-items-center">
                        <div className="flex-grow-1">
                          <h5 className="text-white mb-0">Settings</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center p-3 p-lg-4 border-bottom pt-2 pt-lg-2 mt-n5 position-relative">
                <div className="mb-3 profile-user">
                  <img
                    src={singleUser?.img}
                    className="rounded-circle avatar-lg img-thumbnail user-profile-image"
                    alt="user-profile"
                  />
                </div>
              </div>
              {/* End profile user */}
              {/* Start User profile description */}
              <div className="user-setting" data-simplebar="">
                <div id="settingprofile" className="accordion accordion-flush">
                  <div className="accordion-item">
                    <div className="accordion-header" id="headerpersonalinfo">
                      <a
                        className="accordion-button fs-14 fw-medium"
                        data-bs-toggle="collapse"
                        href="#personalinfo"
                        aria-expanded="true"
                        aria-controls="personalinfo"
                      >
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-3 avatar-xs">
                            <div className="avatar-title bg-info-subtle  text-info text-info rounded">
                              <i className="bx bxs-user" />
                            </div>
                          </div>
                          Personal Info
                        </div>
                      </a>
                    </div>
                    <div
                      id="personalinfo"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headerpersonalinfo"
                      data-bs-parent="#settingprofile"
                    >
                      <div className="accordion-body edit-input">
                        <div>
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label text-muted fs-13"
                          >
                            FirstName
                          </label>
                          <input
                            ref={(input) => (firstNameRef = input)}
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            defaultValue={singleUser?.firstName}
                            placeholder="Enter first name"
                            disabled=""
                          />
                        </div>

                        <div className="mt-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label text-muted fs-13"
                          >
                            LastName
                          </label>
                          <input
                            ref={(input) => (lastNameRef = input)}
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            defaultValue={singleUser?.lastName}
                            placeholder="Enter last name"
                            disabled=""
                          />
                        </div>

                        <div className="mt-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label text-muted fs-13"
                          >
                            MobileNo
                          </label>
                          <input
                            ref={(input) => (mobileNoRef = input)}
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            defaultValue={singleUser?.mobileNo}
                            placeholder="Enter mobile No"
                            disabled=""
                          />
                        </div>

                        <div className="mt-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label text-muted fs-13"
                          >
                            Bio
                          </label>
                          <input
                            ref={(input) => (bioRef = input)}
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            defaultValue={singleUser?.bio}
                            placeholder="Enter bio"
                            disabled=""
                          />
                        </div>

                        <div className="mt-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label text-muted fs-13"
                          >
                            Location
                          </label>
                          <input
                            ref={(input) => (locationRef = input)}
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            defaultValue={singleUser?.location}
                            placeholder="Enter location"
                            disabled=""
                          />
                        </div>

                        <div className="mt-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label text-muted fs-13"
                          >
                            Password
                          </label>
                          <input
                            ref={(input) => (passwordRef = input)}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            defaultValue=""
                            placeholder="Enter password"
                            disabled=""
                          />
                        </div>
                        <div className="mt-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label text-muted fs-13"
                          >
                            Confirm Password
                          </label>
                          <input
                            ref={(input) => (confirm_passwordRef = input)}
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            defaultValue=""
                            placeholder="Enter Confirm password"
                            disabled=""
                          />
                        </div>

                        <div className="mt-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label text-muted fs-13"
                          >
                            Change profile image
                          </label>
                          {!!img === false ? (
                            <input
                              id="bg"
                              type="file"
                              className="hidden"
                              onChange={(event) => bgHandel(event)}
                            />
                          ) : (
                            <div className="show_img">
                              <div className="image_inner">
                                <img
                                  src={img}
                                  alt="Selected"
                                  className="w-[100px] rounded-xl"
                                />
                              </div>

                              {img && (
                                <div className="close_btn">
                                  <FaXmark
                                    onClick={() => setImg('')}
                                    className=""
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="mt-4 mb-4">
                          <button onClick={profileUpdate} className="my_btn">
                            Update profile
                            <div className="arrow-wrapper">
                              <div className="arrow" />
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end profile-setting-accordion */}
              </div>
              {/* End User profile description */}
            </div>
            {/* Start Settings content */}
          </div>
          {/* End settings tab-pane */}
        </div>
        {/* end tab content */}
      </div>
      {/* end chat-leftsidebar */}
      {/* Start User chat */}
      <div
        className={`user-chat w-100 overflow-hidden ${
          chatSide && 'user-chat-show'
        } `}
      >
        <div className="chat-content d-lg-flex">
          {/* start chat conversation section */}
          <div className="w-100 overflow-hidden position-relative ">
            {/* conversation user */}
            <div id="users-chat" className="position-relative ">
              <div className="py-3 user-chat-topbar">
                <div className="row align-items-center">
                  <div className="col-sm-4 col-8">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 d-block d-lg-none me-3">
                        <Link
                          onClick={() => setChatSide(false)}
                          to="#"
                          className="btn-primary user-chat-remove fs-18 p-1"
                        >
                          <i className="bx bx-chevron-left align-middle" />
                        </Link>
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                            <img
                              src={singleUserByID?.img}
                              className="rounded-circle avatar-sm"
                              alt=""
                            />
                            <span className="user-status" />
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <h6 className="text-truncate mb-0 fs-18">
                              <span className="user-profile-show text-reset">
                                {singleUserByID?.firstName}{' '}
                                {singleUserByID?.lastName}
                              </span>
                            </h6>
                            <p className="text-truncate text-muted mb-0">
                              <small>{singleUserByID?.email}</small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end chat user head */}
              {/* start chat conversation */}
              <div
                className="chat-conversation p-3 p-lg-4 "
                id="chat-conversation"
                data-simplebar=""
              >
                <ul
                  className="list-unstyled chat-conversation-list"
                  id="users-conversation"
                >
                  {messages.map((item, index) => (
                    <li
                      key={index}
                      className={`chat-list ${
                        item?.senderID === singleUser?._id ? 'right' : 'left'
                      }`}
                    >
                      <div className="conversation-list">
                        {item?.senderID !== singleUser?._id && (
                          <div className="chat-avatar">
                            <img src={singleUserByID?.img} alt="" />
                          </div>
                        )}

                        <div className="user-chat-content">
                          <div className="ctext-wrap">
                            <div className="ctext-wrap-content">
                              <p className="mb-0 ctext-content">
                                {item.message}
                              </p>
                              <div ref={chatEndRef} />
                            </div>
                            <div className="align-self-start message-box-drop d-flex"></div>
                          </div>
                          <div className="conversation-name">
                            <small className="text-muted time">
                              {convertToBDTime(item?.createdAt)}
                            </small>
                            <span className="text-success check-message-icon">
                              <i className="bx bx-check-double" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* end chat conversation end */}
            </div>

            {/* start chat input section */}
            <div className="position-relative">
              <div className="chat-input-section p-4 border-top">
                <div id="chatinput-form" encType="multipart/form-data">
                  <div className="row g-0 align-items-center">
                    <div className="file_Upload" />
                    <div className="col-auto"></div>
                    <div className="col">
                      <div className="position-relative">
                        <div className="chat-input-feedback">
                          Please Enter a Message
                        </div>
                        <input
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          autoComplete="off"
                          type="text"
                          className="form-control  bg-light border-0 chat-input"
                          autofocus=""
                          id="chat-input"
                          placeholder="Type your message..."
                        />
                      </div>
                    </div>
                    <div className="col-auto">
                      <div className="chat-input-links ms-2 gap-md-1">
                        <div className="links-list-item">
                          <button
                            onClick={() => sendMessage(activeUserChatID)}
                            type="submit"
                            className="btn btn-primary btn-lg chat-send waves-effect waves-light"
                            data-bs-toggle="collapse"
                            data-bs-target=".chat-input-collapse1.show"
                          >
                            <i
                              className="bx bxs-send align-middle"
                              id="submit-btn"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end chat input section */}
          </div>
        </div>
        {/* end user chat content */}
      </div>
    </div>
  );
};

export default Home;
