import { Link } from "react-router-dom";
export default function Profile() {
    return (
        <div id="wd-profile-screen wd-signin-screen d-inline-flex align-items-center">
            <div className="row text-start ms-5">
                <h3>Profile</h3>
            </div>
            <div className="row ms-5">
                <input id="wd-username"
                       placeholder="username"
                       value="Alice"
                       className="form-control mb-2"/><br />
            </div>
            <div className="row ms-5">
                <input id="wd-username"
                       placeholder="password"
                       value="Password"
                       className="form-control mb-2"/><br />
            </div>
            <div className="row ms-5">
                <input id="wd-username"
                       placeholder="First Name"
                       value="Alice"
                       className="form-control mb-2"/><br />
            </div>
            <div className="row ms-5">
                <input id="wd-username"
                       placeholder="Last Name"
                       value="Wonderland"
                       className="form-control mb-2"/><br />
            </div>
            <div className="row ms-5">
                <input id="wd-username"
                       placeholder="First Name"
                       value="2000-01-01"
                       type="date"
                       className="form-control mb-2"/><br />
            </div>
            <div className="row ms-5">
                <input id="wd-username"
                       value="alice@wonderland"
                       type="email"
                       className="form-control mb-2"/><br />
            </div>
            <div className="row ms-5 ">
                <select className="wd-role form-select mb-3">
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="STUDENT">Student</option>
                </select>
                <br/>
            </div>


            <Link className="btn btn-danger w-75 ms-5" to="/Kanbas/Account/Signin" >
                Signout
            </Link>
        </div>

    );}
