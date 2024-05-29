import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorToast, IsEmpty } from '../helper/helper';
import { login__Request__API } from '../api/Api';

const Login = () => {
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let emailRef,
    passwordRef = useRef();

  const loginRequestAPI__Fun = () => {
    setLoading(true);

    let email = emailRef.value;
    let password = passwordRef.value;
    if (IsEmpty(email)) {
      ErrorToast('Email Required!');
      setLoading(false);
    } else if (IsEmpty(password)) {
      ErrorToast('Password Required!');
      setLoading(false);
    } else {
      login__Request__API({ email, password }).then((result) => {
        if (result === true) {
          setLoading(false);
          navigate('/');
        } else {
          setLoading(false);
        }
      });
    }
  };
  return (
    <div className="auth-bg">
      <div className="container p-0">
        <div className="row justify-content-center g-0">
          <div className="col-xl-9 col-lg-8">
            <div className="authentication-page-content shadow-lg">
              <div className="d-flex flex-column h-100 px-4 pt-4">
                <div className="row justify-content-center">
                  <div className="col-sm-8 col-lg-6 col-xl-6">
                    <div className="py-md-5 py-4">
                      <div className="text-center mb-5">
                        <h3>Welcome Back !</h3>
                        <p className="text-muted">
                          Sign in to continue to Vhato.
                        </p>
                      </div>
                      <div action="index.html">
                        <div className="mb-3">
                          <label htmlFor="username" className="form-label">
                            Username
                          </label>
                          <input
                            ref={(input) => (emailRef = input)}
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter email address"
                          />
                        </div>
                        <div className="mb-3">
                          <div className="float-end">
                            <Link to="/forgot-password" className="text-muted">
                              Forgot password?
                            </Link>
                          </div>
                          <label htmlFor="userpassword" className="form-label">
                            Password
                          </label>
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <input
                              ref={(input) => (passwordRef = input)}
                              type="password"
                              className="form-control pe-5"
                              placeholder="Enter Password"
                              id="password-input"
                            />
                            <button
                              className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted"
                              type="button"
                              id="password-addon"
                            >
                              <i className="ri-eye-fill align-middle" />
                            </button>
                          </div>
                        </div>

                        <div className="text-center mt-4">
                          <button
                            className="btn btn-primary w-100"
                            onClick={loginRequestAPI__Fun}
                          >
                            Log In
                          </button>
                        </div>
                      </div>
                      {/* end form */}
                      <div className="mt-5 text-center text-muted">
                        <p>
                          Don't have an account ?{' '}
                          <Link
                            to="/register"
                            className="fw-medium text-decoration-underline"
                          >
                            {' '}
                            Register
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

export default Login;
