import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Redirect } from 'react-router-dom';
import { isEmail } from "validator";

import { register } from "../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vmobile = (value) => {
  if (value.length < 3) {
    return (
      <div className="alert alert-danger" role="alert">
        The mobile must be between 3 and 10 characters.
      </div>
    );
  }
};
const vcountory = (value) => {
  if (value.length < 2) {
    return (
      <div className="alert alert-danger" role="alert">
        Enter valid countory name.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {

  
  const form = useRef();
  const checkBtn = useRef();

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");
  const [profile, setprofile] = useState("path upload");
  const [countory, setcountory] = useState("");
  const [password, setPassword] = useState("");
 
 
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);
  const { isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setname(username);
  };
 const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangeMobile = (e) => {
    const mobile = e.target.value;
    setmobile(mobile);
  };
  
  const onChangeProfile = (e) => {
    const pictur = e.target.value;
    setprofile(pictur);
  };

  const onChangeCountry = (e) => {
    const countory = e.target.value;
    setcountory(countory);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(name,email,mobile,profile,countory, password))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Name</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={name}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Mobile</label>
                <Input
                  type="text"
                  className="form-control"
                  name="mobile"
                  value={mobile}
                  onChange={onChangeMobile}
                  validations={[required, vmobile]}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="username">Countory</label>
                <Input
                  type="text"
                  className="form-control"
                  name="countory"
                  value={countory}
                  onChange={onChangeCountry}
                  validations={[required, vcountory]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

            
              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
