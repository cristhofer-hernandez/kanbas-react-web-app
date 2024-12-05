import { useState } from "react";
import * as client from "./client";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../Database";
export default function Signin() {
    const [credentials, setCredentials] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const signin = async () => {
        console.log(credentials)
        const user =  await client.signin(credentials);
        if (!user) return;
        dispatch(setCurrentUser(user));
        console.log("This is the dispatched user:",  user);
        navigate("/Kanbas/Dashboard");
    };

    return (
        <div id="wd-signin-screen d-inline-flex align-items-center">
            <div className="row ">
                <h1>Sign in</h1>
            </div>
            <div className="row ms-2">
                <input id="wd-username"
                       placeholder="username"
                       className="form-control mb-2"
                       defaultValue={credentials.username}
                       onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}/>
                <br />
            </div>
            <div className="row ms-2">
            <input id="wd-password"
                   placeholder="password" type="password"
                   className="form-control mb-2"
                   defaultValue={credentials.password}
                   onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}/>
                <br />
            </div>
            <button onClick={signin} id="wd-signin-btn" className="btn btn-primary ms-2 mb-2 w-100" > Sign in </button>
            <Link id="wd-signup-link" className="ms-3" to="/Kanbas/Account/Signup">Sign up</Link>
        </div>
    );}
