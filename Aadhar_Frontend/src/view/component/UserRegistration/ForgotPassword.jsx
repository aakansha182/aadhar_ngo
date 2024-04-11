import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setemail] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    alert("Check your given mail to update password");
    const resp = fetch('http://localhost:5000/forgetpassword', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email
      })
    });
  };

  return (
    <section className="section-container">
      <div className="form-container">
        <div className="form-wrapper">
          <h2 className="form-title">Forgot Password?</h2>
          <form onSubmit={submitHandler}>
            <div className="form-field">
              <label htmlFor="email" className="input-label">Email address:</label>
              <input
                type="email"
                id="email"
                className="input-field"
                placeholder="Email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
                name="email"
              />
            </div>
            <div className="form-field">
              <button type="submit" className="submit-button">Send</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
