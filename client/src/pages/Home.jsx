import React, { useEffect, useState } from 'react';
import { Read_all_user_api } from '../api/Api';
import { Link } from 'react-router-dom';

const Home = () => {
  let [user, setUser] = useState([]);

  useEffect(() => {
    Read_all_user_api().then((res) => {
      if (res?.status === true) {
        setUser(res?.data);
      }
    });
  }, []);

  console.log(user);
  return (
    <div className="layout-wrapper d-lg-flex">
      {/* Start left sidebar-menu */}
      <div className="side-menu flex-lg-column ">
        {/* LOGO */}
        <div className="navbar-brand-box">
          <a href="index.html" className="logo logo-dark">
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
          </a>
          <a href="index.html" className="logo logo-light">
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
          </a>
        </div>
        {/* end navbar-brand-box */}
        {/* Start side-menu nav */}
        <div className="flex-lg-column my-0 sidemenu-navigation">
          <ul className="nav nav-pills side-menu-nav" role="tablist">
            <li className="nav-item d-none d-lg-block">
              <a
                className="nav-link"
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
                className="nav-link active"
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
            <li className="nav-item mt-lg-auto">
              <a className="nav-link light-dark-mode" href="#">
                <i className="ri-moon-line" />
              </a>
            </li>
            <li className="nav-item dropdown profile-user-dropdown">
              <a
                className="nav-link dropdown-toggle bg-light"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img
                  src="assets/images/users/avatar-1.jpg"
                  alt=""
                  className="profile-user rounded-circle"
                />
              </a>
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
                <a
                  className="dropdown-item d-flex align-items-center justify-content-between"
                  href="auth-changepassword.html"
                >
                  Change Password{' '}
                  <i className="bx bx-lock-open text-muted ms-1" />
                </a>
                <div className="dropdown-divider" />
                <a
                  className="dropdown-item d-flex align-items-center justify-content-between"
                  href="auth-logout.html"
                >
                  Log out <i className="bx bx-log-out-circle text-muted ms-1" />
                </a>
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
            className="tab-pane"
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
                        <div className="flex-shrink-0">
                          <div className="dropdown">
                            <button
                              className="btn nav-btn text-white dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="bx bx-dots-vertical-rounded" />
                            </button>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a
                                className="dropdown-item d-flex align-items-center justify-content-between"
                                href="#"
                              >
                                Info{' '}
                                <i className="bx bx-info-circle ms-2 text-muted" />
                              </a>
                              <a
                                className="dropdown-item d-flex align-items-center justify-content-between"
                                href="#"
                              >
                                Setting{' '}
                                <i className="bx bx-cog text-muted ms-2" />
                              </a>
                              <div className="dropdown-divider" />
                              <a
                                className="dropdown-item d-flex align-items-center justify-content-between"
                                href="#"
                              >
                                Help{' '}
                                <i className="bx bx-help-circle ms-2 text-muted" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center border-bottom border-bottom-dashed pt-2 pb-4 mt-n5 position-relative">
                <div className="mb-lg-3 mb-2">
                  <img
                    src="assets/images/users/avatar-1.jpg"
                    className="rounded-circle avatar-lg img-thumbnail"
                    alt=""
                  />
                </div>
                <h5 className="fs-17 mb-1 text-truncate">Dushane Daniel</h5>
                <p className="text-muted fs-14 text-truncate mb-0">
                  Front end Developer
                </p>
              </div>
              {/* End profile user */}
              {/* Start user-profile-desc */}
              <div className="p-4 profile-desc" data-simplebar="">
                <div className="text-muted">
                  <p className="mb-3">
                    A professional profile is an introductory section on your
                    resume that highlights your relevant qualifications and
                    skills.
                  </p>
                </div>
                <div className="border-bottom border-bottom-dashed mb-4 pb-2">
                  <div className="d-flex py-2 align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <i className="bx bx-user align-middle text-muted fs-19" />
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0">Dushane Daniel</p>
                    </div>
                  </div>
                  <div className="d-flex py-2 align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <i className="ri-phone-line align-middle text-muted fs-19" />
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0">+(365) 1456 12584</p>
                    </div>
                  </div>
                  <div className="d-flex py-2 align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <i className="ri-message-2-line align-middle text-muted fs-19" />
                    </div>
                    <div className="flex-grow-1">
                      <p className="fw-medium mb-0">dushanedaniel@gmail.com</p>
                    </div>
                  </div>
                  <div className="d-flex py-2 align-items-center">
                    <div className="flex-shrink-0 me-3">
                      <i className="ri-map-pin-2-line align-middle text-muted fs-19" />
                    </div>
                    <div className="flex-grow-1">
                      <p className="mb-0">California, USA</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* end user-profile-desc */}
            </div>
            {/* End profile content */}
          </div>
          {/* End Profile tab-pane */}
          {/* Start chats tab-pane */}
          <div
            className="tab-pane show active"
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
                  {user.map((item, index) => (
                    <li
                      id="contact-id-1"
                      data-name="favorite"
                      className="mt-2"
                      key={index}
                    >
                      <Link
                        to="javascript: void(0);"
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
                              {item?.mobileNo}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
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
                        <div className="flex-shrink-0">
                          <div
                            className="avatar-xs p-0 rounded-circle profile-photo-edit"
                            data-bs-toggle="tooltip"
                            data-bs-trigger="hover"
                            data-bs-placement="bottom"
                            title="Change Background"
                          >
                            <input
                              id="profile-foreground-img-file-input"
                              type="file"
                              className="profile-foreground-img-file-input"
                            />
                            <label
                              htmlFor="profile-foreground-img-file-input"
                              className="profile-photo-edit avatar-xs"
                            >
                              <span className="avatar-title rounded-circle bg-light text-body">
                                <i className="bx bxs-pencil" />
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center p-3 p-lg-4 border-bottom pt-2 pt-lg-2 mt-n5 position-relative">
                <div className="mb-3 profile-user">
                  <img
                    src="assets/images/users/avatar-1.jpg"
                    className="rounded-circle avatar-lg img-thumbnail user-profile-image"
                    alt="user-profile-image"
                  />
                  <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                    <input
                      id="profile-img-file-input"
                      type="file"
                      className="profile-img-file-input"
                    />
                    <label
                      htmlFor="profile-img-file-input"
                      className="profile-photo-edit avatar-xs"
                    >
                      <span className="avatar-title rounded-circle bg-light text-body">
                        <i className="bx bxs-camera" />
                      </span>
                    </label>
                  </div>
                </div>
                <h5 className="fs-16 mb-1 text-truncate" />
                <div className="dropdown d-inline-block">
                  <a
                    className="text-muted dropdown-toggle d-block"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="bx bxs-circle text-success fs-10 align-middle" />{' '}
                    Active <i className="mdi mdi-chevron-down" />
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">
                      <i className="bx bxs-circle text-success fs-10 me-1 align-middle" />
                      Active
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bx bxs-circle text-warning fs-10 me-1 align-middle" />
                      Away
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="bx bxs-circle text-danger fs-10 me-1 align-middle" />{' '}
                      Do not disturb
                    </a>
                  </div>
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
                            <div
                              className="avatar-title bg-info-subtle 
             text-info text-info rounded"
                            >
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
                        <div className="float-end">
                          <a
                            href="#"
                            className="badge bg-light text-muted"
                            id="user-profile-edit-btn"
                          >
                            {' '}
                            <i
                              className="bx bxs-pencil align-middle"
                              id="edit-icon"
                            />
                          </a>
                        </div>
                        <div>
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label text-muted fs-13"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            defaultValue="Dushane Daniel"
                            placeholder="Enter name"
                            disabled=""
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label text-muted fs-13"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputPassword1"
                            defaultValue="dashanedaniel@vhato.com"
                            placeholder="Enter email"
                            disabled=""
                          />
                        </div>
                        <div className="mt-3">
                          <label
                            htmlFor="exampleInputPassword1"
                            className="form-label text-muted fs-13"
                          >
                            Phone No
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            defaultValue="+(245) 4577 14523"
                            placeholder="Enter phone no"
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
                            type="text"
                            className="form-control"
                            id="exampleInputPassword1"
                            defaultValue="California, USA"
                            placeholder="Location"
                            disabled=""
                          />
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
      <div className="user-chat w-100 overflow-hidden ">
        <div className="chat-content d-lg-flex">
          {/* start chat conversation section */}
          <div className="w-100 overflow-hidden position-relative">
            {/* conversation user */}
            <div id="users-chat" className="position-relative">
              <div className="py-3 user-chat-topbar">
                <div className="row align-items-center">
                  <div className="col-sm-4 col-8">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 d-block d-lg-none me-3">
                        <a
                          href="javascript: void(0);"
                          className="btn-primary user-chat-remove fs-18 p-1"
                        >
                          <i className="bx bx-chevron-left align-middle" />
                        </a>
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                            <img
                              src="assets/images/users/avatar-2.jpg"
                              className="rounded-circle avatar-sm"
                              alt=""
                            />
                            <span className="user-status" />
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <h6 className="text-truncate mb-0 fs-18">
                              <a
                                href="#"
                                className="user-profile-show text-reset"
                              >
                                Victoria Lane
                              </a>
                            </h6>
                            <p className="text-truncate text-muted mb-0">
                              <small>Online</small>
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
                ></ul>
              </div>

              {/* end chat conversation end */}
            </div>

            {/* start chat input section */}
            <div className="position-relative">
              <div className="chat-input-section p-4 border-top">
                <form id="chatinput-form" encType="multipart/form-data">
                  <div className="row g-0 align-items-center">
                    <div className="file_Upload" />
                    <div className="col-auto"></div>
                    <div className="col">
                      <div className="position-relative">
                        <div className="chat-input-feedback">
                          Please Enter a Message
                        </div>
                        <input
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
                </form>
              </div>
              <div className="replyCard">
                <div className="card mb-0">
                  <div className="card-body py-3">
                    <div className="replymessage-block mb-0 d-flex align-items-start">
                      <div className="flex-grow-1">
                        <h5 className="conversation-name" />
                        <p className="mb-0" />
                      </div>
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          id="close_toggle"
                          className="btn btn-sm btn-link mt-n2 me-n3 fs-18"
                        >
                          <i className="bx bx-x align-middle" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end chat input section */}
          </div>
          {/* end chat conversation section */}
          {/* start User profile detail sidebar */}
          <div className="user-profile-sidebar">
            <div className="p-3 border-bottom">
              <div className="user-profile-img">
                <img
                  src="assets/images/users/avatar-2.jpg"
                  className="profile-img rounded"
                  alt=""
                />
                <div className="overlay-content rounded">
                  <div className="user-chat-nav p-2">
                    <div className="d-flex w-100">
                      <div className="flex-grow-1">
                        <button
                          type="button"
                          className="btn nav-btn text-white user-profile-show d-none d-lg-block"
                        >
                          <i className="bx bx-x" />
                        </button>
                        <button
                          type="button"
                          className="btn nav-btn text-white user-profile-show d-block d-lg-none"
                        >
                          <i className="bx bx-left-arrow-alt" />
                        </button>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="dropdown">
                          <button
                            className="btn nav-btn text-white dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <i className="bx bx-dots-vertical-rounded" />
                          </button>
                          <div className="dropdown-menu dropdown-menu-end">
                            <a
                              className="dropdown-item d-flex justify-content-between align-items-center d-lg-none user-profile-show"
                              href="#"
                            >
                              View Profile{' '}
                              <i className="bx bx-user text-muted" />
                            </a>
                            <a
                              className="dropdown-item d-flex justify-content-between align-items-center d-lg-none"
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target=".audiocallModal"
                            >
                              Audio{' '}
                              <i className="bx bxs-phone-call text-muted" />
                            </a>
                            <a
                              className="dropdown-item d-flex justify-content-between align-items-center d-lg-none"
                              href="#"
                              data-bs-toggle="modal"
                              data-bs-target=".videocallModal"
                            >
                              Video <i className="bx bx-video text-muted" />
                            </a>
                            <a
                              className="dropdown-item d-flex justify-content-between align-items-center"
                              href="#"
                            >
                              Archive <i className="bx bx-archive text-muted" />
                            </a>
                            <a
                              className="dropdown-item d-flex justify-content-between align-items-center"
                              href="#"
                            >
                              Muted{' '}
                              <i className="bx bx-microphone-off text-muted" />
                            </a>
                            <a
                              className="dropdown-item d-flex justify-content-between align-items-center"
                              href="#"
                            >
                              Delete <i className="bx bx-trash text-muted" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto p-3">
                    <h5 className="user-name mb-0 text-truncate">
                      Victoria Lane
                    </h5>
                    <p className="fs-14 text-truncate user-profile-status mt-1 mb-0">
                      <i className="bx bxs-circle fs-10 text-success me-1 ms-0" />
                      Online
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* End profile user */}
            {/* Start user-profile-desc */}
            <div className="p-4 user-profile-desc" data-simplebar="">
              <div className="text-center border-bottom border-bottom-dashed">
                <div className="d-flex gap-2 justify-content-center mb-4">
                  <button type="button" className="btn avatar-sm p-0">
                    <span
                      className="avatar-title rounded bg-info-subtle 
         text-info text-info"
                    >
                      <i className="bx bxs-message-alt-detail" />
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn avatar-sm p-0 favourite-btn"
                  >
                    <span
                      className="avatar-title rounded bg-danger-subtle 
         text-danger text-body"
                    >
                      <i className="bx bx-heart" />
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn avatar-sm p-0"
                    data-bs-toggle="modal"
                    data-bs-target=".audiocallModal"
                  >
                    <span className="avatar-title rounded bg-success-subtle text-success">
                      <i className="bx bxs-phone-call" />
                    </span>
                  </button>
                  <button
                    type="button"
                    className="btn avatar-sm p-0"
                    data-bs-toggle="modal"
                    data-bs-target=".videocallModal"
                  >
                    <span
                      className="avatar-title rounded bg-warning-subtle 
         text-warning text-warning"
                    >
                      <i className="bx bx-video" />
                    </span>
                  </button>
                  <div className="dropdown">
                    <button
                      className="btn avatar-sm p-0 dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span
                        className="avatar-title bg-primary-subtle 
         text-primary  text-primary rounded"
                      >
                        <i className="bx bx-dots-horizontal-rounded" />
                      </span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a
                        className="dropdown-item d-flex justify-content-between align-items-center"
                        href="#"
                      >
                        Archive <i className="bx bx-archive text-muted" />
                      </a>
                      <a
                        className="dropdown-item d-flex justify-content-between align-items-center"
                        href="#"
                      >
                        Muted <i className="bx bx-microphone-off text-muted" />
                      </a>
                      <a
                        className="dropdown-item d-flex justify-content-between align-items-center"
                        href="#"
                      >
                        Delete <i className="bx bx-trash text-muted" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-muted pt-4">
                <h5 className="fs-12 text-muted text-uppercase">Status :</h5>
                <p className="mb-4">
                  A professional profile is a brief summary of your skills,
                  strengths, and key experiences.
                </p>
              </div>
              <div className="pb-4 border-bottom border-bottom-dashed mb-4">
                <h5 className="fs-12 text-muted text-uppercase mb-2">Info :</h5>
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <i className="ri-user-line align-middle fs-15 text-muted" />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fs-14 text-truncate mb-0"> Victoria Lane</h5>
                  </div>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <div className="flex-shrink-0">
                    <i className="ri-mail-line align-middle fs-15 text-muted" />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fs-14 text-truncate mb-0">
                      bellacote@vhato.com
                    </h5>
                  </div>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <div className="flex-shrink-0">
                    <i className="ri-phone-line align-middle fs-15 text-muted" />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fs-14 text-truncate mb-0">
                      +(345) 3216 48751
                    </h5>
                  </div>
                </div>
                <div className="d-flex align-items-center mt-3">
                  <div className="flex-shrink-0">
                    <i className="ri-mail-line align-middle fs-15 text-muted" />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="fs-14 text-truncate mb-0">
                      California, USA
                    </h5>
                  </div>
                </div>
              </div>
              <div className="pb-4 border-bottom border-bottom-dashed mb-4">
                <div className="d-flex">
                  <div className="flex-grow-1">
                    <h5 className="fs-12 text-muted text-uppercase">
                      Group in common
                    </h5>
                  </div>
                </div>
                <ul className="list-unstyled chat-list mx-n4">
                  <li>
                    <a href="javascript: void(0);">
                      <div className="d-flex align-items-center">
                        <img
                          src="assets/images/users/group-img.jpg"
                          alt=""
                          className="avatar-sm rounded-circle me-3"
                        />
                        <div className="flex-grow-1 overflow-hidden">
                          <h6 className="text-truncate mb-0">Landing Design</h6>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a href="javascript: void(0);">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 avatar-sm me-3">
                          <span className="avatar-title rounded-circle bg-light text-reset">
                            SM
                          </span>
                        </div>
                        <div className="flex-grow-1 overflow-hidden">
                          <h6 className="text-truncate mb-0">
                            Sales &amp; Marketing
                          </h6>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="pb-4 border-bottom border-bottom-dashed mb-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="flex-grow-1">
                    <h5 className="fs-12 text-muted text-uppercase mb-0">
                      Shared Images
                    </h5>
                  </div>
                  <div className="flex-shrink-0">
                    <a href="#" className="fs-12 fw-medium d-block">
                      Show all
                    </a>
                  </div>
                </div>
                <div className="profile-media-img">
                  <div className="row g-1">
                    <div className="col-lg-4 col-6">
                      <a href="#">
                        <img
                          src="assets/images/small/img-1.jpg"
                          alt="media img"
                          className="img-fluid rounded"
                        />
                      </a>
                    </div>
                    <div className="col-lg-4 col-6">
                      <a href="#">
                        <img
                          src="assets/images/small/img-2.jpg"
                          alt="media img"
                          className="img-fluid rounded"
                        />
                      </a>
                    </div>
                    <div className="col-lg-4 col-6">
                      <a href="#">
                        <img
                          src="assets/images/small/img-3.jpg"
                          alt="media img"
                          className="img-fluid rounded"
                        />
                      </a>
                    </div>
                    <div className="col-lg-4 col-6">
                      <a href="#">
                        <img
                          src="assets/images/small/img-4.jpg"
                          alt="media img"
                          className="img-fluid rounded"
                        />
                      </a>
                    </div>
                    <div className="col-lg-4 col-6">
                      <a href="#">
                        <img
                          src="assets/images/small/img-5.jpg"
                          alt="media img"
                          className="img-fluid rounded"
                        />
                      </a>
                    </div>
                    <div className="col-lg-4 col-6">
                      <div className="position-relative rounded overflow-hidden">
                        <a href="javascript:void(0);" className="d-block">
                          <img
                            src="assets/images/small/img-6.jpg"
                            alt="media img"
                            className="img-fluid rounded"
                          />
                          <div className="bg-overlay" />
                          <div className="position-absolute top-50 start-50 text-white translate-middle fs-16">
                            +10
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <h5 className="fs-11 text-muted text-uppercase mb-3">
                    Attached Files
                  </h5>
                </div>
                <div>
                  <div className="card mb-2 border border-dashed">
                    <div className="card-body p-2">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 ms-1 me-3">
                          <img
                            src="assets/images/pdf-file.png"
                            alt=""
                            className="avatar-xs"
                          />
                        </div>
                        <div className="flex-grow-1 overflow-hidden">
                          <h5 className="fs-14 text-truncate mb-1">
                            design-phase-1-approved.pdf
                          </h5>
                          <p className="text-muted fs-13 mb-0">12.5 MB</p>
                        </div>
                        <div className="flex-shrink-0 ms-3">
                          <div className="d-flex gap-2">
                            <div>
                              <a href="#" className="text-muted px-1">
                                <i className="bx bxs-download" />
                              </a>
                            </div>
                            <div className="dropdown">
                              <a
                                className="dropdown-toggle text-muted px-1"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-horizontal-rounded" />
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a
                                  className="dropdown-item d-flex align-items-center justify-content-between"
                                  href="#"
                                >
                                  Share{' '}
                                  <i className="bx bx-share-alt ms-2 text-muted" />
                                </a>
                                <a
                                  className="dropdown-item d-flex align-items-center justify-content-between"
                                  href="#"
                                >
                                  Bookmark{' '}
                                  <i className="bx bx-bookmarks text-muted ms-2" />
                                </a>
                                <div className="dropdown-divider" />
                                <a
                                  className="dropdown-item d-flex align-items-center justify-content-between"
                                  href="#"
                                >
                                  Delete{' '}
                                  <i className="bx bx-trash ms-2 text-muted" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card border border-dashed mb-2">
                    <div className="card-body p-2">
                      <div className="d-flex align-items-center">
                        <div className="flex-shrink-0 ms-1 me-3">
                          <img
                            src="assets/images/image-file.png"
                            alt=""
                            className="avatar-xs"
                          />
                        </div>
                        <div className="flex-grow-1 overflow-hidden">
                          <h5 className="fs-14 text-truncate mb-1">
                            Image-1.jpg
                          </h5>
                          <p className="text-muted fs-13 mb-0">4.2 MB</p>
                        </div>
                        <div className="flex-shrink-0 ms-3">
                          <div className="d-flex gap-2">
                            <div>
                              <a href="#" className="text-muted px-1">
                                <i className="bx bxs-download" />
                              </a>
                            </div>
                            <div className="dropdown">
                              <a
                                className="dropdown-toggle text-muted px-1"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <i className="bx bx-dots-horizontal-rounded" />
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a
                                  className="dropdown-item d-flex align-items-center justify-content-between"
                                  href="#"
                                >
                                  Share{' '}
                                  <i className="bx bx-share-alt ms-2 text-muted" />
                                </a>
                                <a
                                  className="dropdown-item d-flex align-items-center justify-content-between"
                                  href="#"
                                >
                                  Bookmark{' '}
                                  <i className="bx bx-bookmarks text-muted ms-2" />
                                </a>
                                <div className="dropdown-divider" />
                                <a
                                  className="dropdown-item d-flex align-items-center justify-content-between"
                                  href="#"
                                >
                                  Delete{' '}
                                  <i className="bx bx-trash ms-2 text-muted" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card p-2 border border-dashed mb-2">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 ms-1 me-3">
                        <img
                          src="assets/images/image-file.png"
                          alt=""
                          className="avatar-xs"
                        />
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <h5 className="fs-14 text-truncate mb-1">
                          Image-2.jpg
                        </h5>
                        <p className="text-muted fs-13 mb-0">3.1 MB</p>
                      </div>
                      <div className="flex-shrink-0 ms-3">
                        <div className="d-flex gap-2">
                          <div>
                            <a href="#" className="text-muted px-1">
                              <i className="bx bxs-download" />
                            </a>
                          </div>
                          <div className="dropdown">
                            <a
                              className="dropdown-toggle text-muted px-1"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="bx bx-dots-horizontal-rounded" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a
                                className="dropdown-item d-flex align-items-center justify-content-between"
                                href="#"
                              >
                                Share{' '}
                                <i className="bx bx-share-alt ms-2 text-muted" />
                              </a>
                              <a
                                className="dropdown-item d-flex align-items-center justify-content-between"
                                href="#"
                              >
                                Bookmark{' '}
                                <i className="bx bx-bookmarks text-muted ms-2" />
                              </a>
                              <div className="dropdown-divider" />
                              <a
                                className="dropdown-item d-flex align-items-center justify-content-between"
                                href="#"
                              >
                                Delete{' '}
                                <i className="bx bx-trash ms-2 text-muted" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card p-2 border border-dashed mb-0">
                    <div className="d-flex align-items-center">
                      <div className="flex-shrink-0 ms-1 me-3">
                        <img
                          src="assets/images/zip-file.png"
                          alt=""
                          className="avatar-xs"
                        />
                      </div>
                      <div className="flex-grow-1 overflow-hidden">
                        <h5 className="fs-14 text-truncate mb-1">
                          Landing-A.zip
                        </h5>
                        <p className="text-muted fs-13 mb-0">6.7 MB</p>
                      </div>
                      <div className="flex-shrink-0 ms-3">
                        <div className="d-flex gap-2">
                          <div>
                            <a href="#" className="text-muted px-1">
                              <i className="bx bxs-download" />
                            </a>
                          </div>
                          <div className="dropdown">
                            <a
                              className="dropdown-toggle text-muted px-1"
                              href="#"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="bx bx-dots-horizontal-rounded" />
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                              <a
                                className="dropdown-item d-flex align-items-center justify-content-between"
                                href="#"
                              >
                                Share{' '}
                                <i className="bx bx-share-alt ms-2 text-muted" />
                              </a>
                              <a
                                className="dropdown-item d-flex align-items-center justify-content-between"
                                href="#"
                              >
                                Bookmark{' '}
                                <i className="bx bx-bookmarks text-muted ms-2" />
                              </a>
                              <div className="dropdown-divider" />
                              <a
                                className="dropdown-item d-flex align-items-center justify-content-between"
                                href="#"
                              >
                                Delete{' '}
                                <i className="bx bx-trash ms-2 text-muted" />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end user-profile-desc */}
          </div>
          {/* end User profile detail sidebar */}
        </div>
        {/* end user chat content */}
      </div>
    </div>
  );
};

export default Home;
