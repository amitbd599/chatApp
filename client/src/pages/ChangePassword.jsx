import React, { useRef, useState } from 'react';
import { ErrorToast, IsEmpty } from '../helper/helper';
import { reset_password__Request__API } from '../api/Api';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ChangePassword = () => {
  const { email, otp } = useParams();
  let [loading, setLoading] = useState(false);
  let passwordRef,
    confPasswordRef = useRef();
  const navigate = useNavigate();
  const reset_RequestAPI__Fun = () => {
    setLoading(true);
    let password = passwordRef.value;
    let confPassword = confPasswordRef.value;
    if (IsEmpty(email)) {
      ErrorToast('Params email not found!');
      setLoading(false);
    } else if (IsEmpty(otp)) {
      ErrorToast('Params otp not found!');
      setLoading(false);
    } else if (IsEmpty(password)) {
      ErrorToast('Password required!');
      setLoading(false);
    } else if (IsEmpty(confPassword)) {
      ErrorToast('Confirm password required!');
      setLoading(false);
    } else if (password !== confPassword) {
      ErrorToast('Password not match!');
      setLoading(false);
    } else {
      reset_password__Request__API(email, otp, password).then((result) => {
        setLoading(false);
        if (result === true) {
          navigate(`/login`);
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
                <div className="row justify-content-center my-auto">
                  <div className="col-sm-8 col-lg-6 col-xl-6">
                    <div className="py-md-5 py-4">
                      <div className="text-center mb-5">
                        <h3>Reset Password</h3>
                        <p className="text-muted">Reset Password with Vhato.</p>
                      </div>
                      <div
                        className="alert alert-info text-center my-4"
                        role="alert"
                      >
                        Enter New Password!
                      </div>
                      <div>
                        <div className="mb-4">
                          <label className="form-label">Email</label>
                          <input
                            ref={(input) => (passwordRef = input)}
                            type="password"
                            className="form-control"
                            id="email"
                            placeholder="Enter password"
                          />
                        </div>
                        <div className="mb-4">
                          <label className="form-label">
                            Re-enter password
                          </label>
                          <input
                            ref={(input) => (confPasswordRef = input)}
                            type="password"
                            className="form-control"
                            id="email"
                            placeholder="Re-enter password"
                          />
                        </div>
                        <div className="text-center mt-4">
                          <button
                            className="btn btn-primary w-100"
                            onClick={reset_RequestAPI__Fun}
                          >
                            Reset Password
                          </button>
                        </div>
                      </div>

                      {/* end form */}
                      <div className="mt-5 text-center text-muted">
                        <p>
                          Remember It ?{' '}
                          <Link
                            to="/login"
                            className="fw-medium text-decoration-underline"
                          >
                            {' '}
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

export default ChangePassword;
