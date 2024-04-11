import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/resetpassword/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: password,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data[0] > 0) {
          alert("Password Successfully Changed!!");
          navigate("/login");
        } else {
          alert("Couldn't reset your password");
        }
      });
  };

  return (
    <section className="section-container">
      <div className="form-container">
        <div className="form-wrapper">
          <h2 className="form-title">Reset Password</h2>
          <form onSubmit={submitHandler} className="mt-8">
            <div className="space-y-5">
              <div className="form-field">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <div className="input-wrapper">
                  <input
                    type="password"
                    id="password"
                    className="input-field"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    name="password"
                  />
                </div>
              </div>

              <div className="form-field">
                <button type="submit" className="submit-button">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
