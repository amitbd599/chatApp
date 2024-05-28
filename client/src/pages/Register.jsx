import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorToast, IsEmpty } from '../helper/helper';
import { reg__Request__API } from '../api/Api';

const Register = () => {
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let emailRef,
    passwordRef,
    firstNameRef,
    lastNameRef = useRef();

  const RegRequestAPI__Fun = () => {
    setLoading(true);

    let email = emailRef.value;
    let password = passwordRef.value;
    let firstName = firstNameRef.value;
    let lastName = lastNameRef.value;
    if (IsEmpty(email)) {
      ErrorToast('Email Required!');
      setLoading(false);
    } else if (IsEmpty(password)) {
      ErrorToast('Password Required!');
      setLoading(false);
    } else if (IsEmpty(firstName)) {
      ErrorToast('FirstName Required!');
      setLoading(false);
    } else if (IsEmpty(lastName)) {
      ErrorToast('LastName Required!');
      setLoading(false);
    } else {
      reg__Request__API({ email, password, firstName, lastName }).then(
        (result) => {
          if (result === true) {
            setLoading(false);
            navigate('/login');
          } else {
            setLoading(false);
          }
        },
      );
    }
  };
  return (
    <div className="auth-bg">
      <div className="container p-0">
        <div className="row justify-content-center g-0">
          <div className="col-xl-9 col-lg-8">
            <div className="authentication-page-content shadow-lg">
              <div className="d-flex flex-column h-100 px-4 pt-4">
                <div className="row justify-content-center my-auto">
                  <div className="col-sm-8 col-lg-6 col-xl-6">
                    <div className="py-md-5 py-4">
                      <div className="text-center mb-5">
                        <h3>Register Account</h3>
                        <p className="text-muted">
                          Get your free Vhato account now.
                        </p>
                      </div>
                      <div
                        className="needs-validation"
                        noValidate=""
                        action="index.html"
                      >
                        <div className="mb-3">
                          <label htmlFor="useremail" className="form-label">
                            Email
                          </label>
                          <input
                            ref={(input) => (emailRef = input)}
                            type="email"
                            className="form-control"
                            id="useremail"
                            placeholder="Enter email"
                            required=""
                          />
                          <div className="invalid-feedback">
                            Please Enter Email
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            FirstName
                          </label>
                          <input
                            ref={(input) => (firstNameRef = input)}
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            required=""
                          />
                          <div className="invalid-feedback">
                            Please Enter FirstName
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            LastName
                          </label>
                          <input
                            ref={(input) => (lastNameRef = input)}
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                            required=""
                          />
                          <div className="invalid-feedback">
                            Please Enter LastName
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="userpassword" className="form-label">
                            Password
                          </label>
                          <input
                            ref={(input) => (passwordRef = input)}
                            type="password"
                            className="form-control"
                            id="userpassword"
                            placeholder="Enter password"
                            required=""
                          />
                          <div className="invalid-feedback">
                            Please Enter Password
                          </div>
                        </div>

                        <div className="mb-3">
                          <button
                            onClick={RegRequestAPI__Fun}
                            className="btn btn-primary w-100 waves-effect waves-light"
                          >
                            Register
                          </button>
                        </div>
                      </div>
                      {/* end form */}
                      <div className="mt-5 text-center text-muted">
                        <p>
                          Already have an account ?{' '}
                          <Link
                            to="/login"
                            className="fw-medium text-decoration-underline"
                          >
                            Login
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* end col */}
                </div>
                {/* end row */}
                <div className="row">
                  <div className="col-xl-12">
                    <div className="text-center text-muted p-4">
                      <p className="mb-0">
                        © Vhato. Crafted with{' '}
                        <i className="mdi mdi-heart text-danger" /> by
                        Themesbrand
                      </p>
                    </div>
                  </div>
                  {/* end col */}
                </div>
                {/* end row */}
              </div>
            </div>
          </div>
          {/* end col */}
        </div>
        {/* end row */}
      </div>
      {/* end container-fluid */}
    </div>
  );
};

export default Register;
