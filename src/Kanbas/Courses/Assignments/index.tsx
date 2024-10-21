import ModuleControlButtonsEnd from "./ModuleControlButtonsEnd"
import GreenCheckmark from "./GreenCheckmark"
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import { LuBookMarked } from "react-icons/lu";
import AssignmentsControls from "./AssignmentsControls";
import { Link, useParams } from "react-router-dom";
import * as db from "../../Database";


export default function Assignments() {
    const { cid } = useParams();
    const assignments = db.assignments;
    return (
        <div className="me-2">
            <AssignmentsControls /> <br/><br/><br/><br/>
            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary text-start fw-bold">
                        <BsGripVertical className="mb-1 me-2"/>
                        ASSIGNMENTS
                        <ModuleControlButtonsEnd />
                    </div>
                    {assignments
                        .filter((assignments: any) => assignments.course === cid)
                        .map((assignments: any) => (
                    <li className="wd-lesson list-group-item p-3 ps-1 text-start d-flex align-items-center">
                        <BsGripVertical />
                        <LuBookMarked className="me-3 ms-1 text-success"/>
                        <Link key={`#/Kanbas/Courses/${ cid }/Assignments`} to={`${assignments.title}`}
                              className="wd-assignment fw-bold container text-decoration-none text-dark">
                            {assignments.title}
                            <br/>
                            <small className="wd-subtext text-muted">
                                <small className="text-danger">Multiple Modules</small> |
                                <small className="fw-bold"> Not avaialable until</small> {assignments.assignDate} |
                                <small className="fw-bold"> {assignments.dueDate} | {assignments.points} pts</small>
                            </small>
                        </Link>
                        <div className ="float-end text-nowrap">
                            <GreenCheckmark />
                            <IoEllipsisVertical className="ms-3"/>
                        </div>
                            <ul className="wd-lessons list-group rounded-0">
                            </ul>
                    </li>
                    ))}
                </li>
            </ul>
        </div>
    );}





