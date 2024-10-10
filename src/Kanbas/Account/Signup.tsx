import React from "react";
import { Link } from "react-router-dom";
export default function Signup() {
    return (
        <div id="wd-signin-screen d-inline-flex align-items-center">
            <div className="row ms-5 text-start">
                <h1>Sign Up</h1>
            </div>
            <div className="row ms-5">
                <input id="wd-username"
                       placeholder="username"
                       className="form-control mb-2"/><br />
            </div>
            <div className="row ms-5">
                <input id="wd-password"
                       placeholder="password" type="password"
                       className="form-control mb-2"/><br />
            </div>
            <div className="row text-start ms-5">
                <Link id="wd-signin-btn"
                      to="/Kanbas/Account/Signin"
                      className="btn btn-primary w-100">
                    Sign Up </Link><br />
                <Link id="wd-signup-link" to="/Kanbas/Account/Signin">Sign in</Link>
            </div>
        </div>
    );}
