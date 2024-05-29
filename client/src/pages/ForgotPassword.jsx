import React, { useRef, useState } from 'react';
import { ErrorToast, IsEmpty } from '../helper/helper';
import { forgot_password__Request__API } from '../api/Api';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let emailRef = useRef();
  const forgot_passwordRequestAPI__Fun = () => {
    setLoading(true);
    let email = emailRef.value;
    if (IsEmpty(email)) {
      ErrorToast('Email Required!');
      setLoading(false);
    } else {
      forgot_password__Request__API(email).then((result) => {
        setLoading(false);
        if (result === true) {
          navigate(`/otp-code/${email}`);
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
                        Enter your Email and instructions will be sent to you!
                      </div>
                      <div>
                        <div className="mb-4">
                          <label className="form-label">Email</label>
                          <input
                            ref={(input) => (emailRef = input)}
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                          />
                        </div>
                        <div className="text-center mt-4">
                          <button
                            className="btn btn-primary w-100"
                            onClick={forgot_passwordRequestAPI__Fun}
                          >
                            Send OTP
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

export default ForgotPassword;
