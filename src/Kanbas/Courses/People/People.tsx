import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { FaPlus } from "react-icons/fa6";
import PeopleTable from "./Table";
import * as coursesClient from "../client"
import * as client from "../../Account/client";
export default function People() {
    const { cid } = useParams();
    const location = useLocation();
    const [users, setUsers] = useState<any[]>([]);
    const [role, setRole] = useState("");
    const [name, setName] = useState("");

    const filterUsersByRole = async (role: string) => {
        setRole(role);
        if (role) {
            const users = await client.findUsersByRole(role);
            setUsers(users);
        } else {
            fetchUsersForThisCourse();
        }
    };

    const filterUsersByName = async (name: string) => {
        setName(name);
        if (name) {
            const users = await client.findUsersByPartialName(name);
            setUsers(users);
        } else {
            fetchUsersForThisCourse();
        }
    };


    const fetchUsersForThisCourse = async () => {
        const users = await coursesClient.findUsersForCourse(cid!);
        setUsers(users);
        console.log(users);
    };
    useEffect(() => {
        fetchUsersForThisCourse();
    }, [cid]);
    return (
        <div>
            <h3>Users</h3>
            <div className="mb-5">
                <input onChange={(e) => filterUsersByName(e.target.value)} placeholder="Search people"
                       className="form-control float-start w-25 me-2 wd-filter-by-name" />

                <select value={role} onChange={(e) =>filterUsersByRole(e.target.value)}
                        className="form-select float-start w-25 wd-select-role
                        +" >
                    <option value="">All Roles</option>
                    <option value="STUDENT">Students</option>
                    <option value="TA">Assistants</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="ADMIN">Administrators</option>
                </select>
            </div>
            <PeopleTable users={users} show_details={false} />
        </div>
    );}
