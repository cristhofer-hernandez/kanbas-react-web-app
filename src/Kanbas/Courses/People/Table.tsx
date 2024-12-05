import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useLocation, useParams } from "react-router";
import PeopleDetails from "./Details";

export default function PeopleTable({ users = [], show_details = true }: { users?: any[], show_details?: boolean }) {
    {console.log(users[0], "from People Table")}
    const { cid } = useParams();
    return (
        <div id="wd-people-table">
            <PeopleDetails show_details={show_details}/>

            <table className="table table-striped">
                <tbody>
                {users
                    .map((user: any) => (
                        <tr key={user._id}>
                            <td className="wd-full-name text-nowrap">
                                <Link to={show_details ? `/Kanbas/Account/Users/${user._id}` : `/Kanbas/Courses/${ cid }/People/${user._id}`} className="float-start text-decoration-none">
                                     <FaUserCircle className="me-2 fs-1 text-secondary" />
                                     <span className="wd-first-name">{user.firstName}</span>
                                     <span className="wd-last-name">{user.lastName}</span>
                                </Link>
                            </td>
                            {show_details && (
                                <td className="wd-login-id">{user.loginId}</td>
                            )}
                            <td className="wd-section">{user.section}</td>
                            <td className="wd-role">{user.role}</td>

                            {show_details && (
                                <>
                                    <td className="wd-last-activity">{user.lastActivity}</td>
                                    <td className="wd-total-activity">{user.totalActivity}</td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}