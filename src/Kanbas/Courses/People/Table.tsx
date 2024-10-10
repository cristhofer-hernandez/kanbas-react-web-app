import { FaUserCircle } from "react-icons/fa";
export default function PeopleTable() {
    return (
        <div id="wd-people-table">
            <table className="table table-striped">
                <thead className="text-start">
                <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
                </thead>
                <tbody>
                <tr><td className="wd-full-name text-nowrap text-start">
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">Tony</span>{" "}
                    <span className="wd-last-name">Stark</span></td>
                    <td className="wd-login-id text-start">001234561S</td>
                    <td className="wd-section text-start">S101</td>
                    <td className="wd-role text-start">STUDENT</td>
                    <td className="wd-last-activity text-start">2020-10-01</td>
                    <td className="wd-total-activity text-start">10:21:32</td> </tr>
                <tr><td className="wd-full-name text-nowrap text-start">
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">Bruce</span>{" "}
                    <span className="wd-last-name">Wayne</span></td>
                    <td className="wd-login-id text-start">004220441S</td>
                    <td className="wd-section text-start">S101</td>
                    <td className="wd-role text-start">STUDENT</td>
                    <td className="wd-last-activity text-start">2020-10-03</td>
                    <td className="wd-total-activity text-start">15:24:32</td> </tr>
                <tr><td className="wd-full-name text-nowrap text-start">
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">Steve</span>{" "}
                    <span className="wd-last-name">Rogers</span></td>
                    <td className="wd-login-id text-start">009812108S</td>
                    <td className="wd-section text-start">S103</td>
                    <td className="wd-role text-start">STUDENT</td>
                    <td className="wd-last-activity text-start">2020-10-02</td>
                    <td className="wd-total-activity text-start">08:00:39</td> </tr>
                <tr><td className="wd-full-name text-nowrap text-start">
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">Natasha</span>{" "}
                    <span className="wd-last-name">Romanoff</span></td>
                    <td className="wd-login-id text-start">008269335S</td>
                    <td className="wd-section text-start">T101</td>
                    <td className="wd-role text-start">TA</td>
                    <td className="wd-last-activity text-start">2020-10-05</td>
                    <td className="wd-total-activity text-start">28:49:01</td> </tr>
                {/* Add at least 3 more users such as Bruce Wayne, Steve Rogers, and Natasha Romanoff */}
                </tbody>
            </table>
        </div>
    );}