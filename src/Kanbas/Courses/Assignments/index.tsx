import ModuleControlButtonsEnd from "./ModuleControlButtonsEnd"
import GreenCheckmark from "./GreenCheckmark"
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import { LuBookMarked } from "react-icons/lu";
import AssignmentsControls from "./AssignmentsControls";


export default function Assignments() {
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
                    <li className="wd-lesson list-group-item p-3 ps-1 text-start d-flex align-items-center">
                        <BsGripVertical />
                        <LuBookMarked className="me-3 ms-1  text-success"/>
                        <a className="wd-assignment fw-bold container text-decoration-none text-dark"
                           href="#/Kanbas/Courses/1234/Assignments/123">
                            A1
                            <br/>
                            <small className="wd-subtext text-muted">
                                <small className="text-danger">Multiple Modules</small> |
                                <small className="fw-bold"> Not avaialable until</small> May 6 at 12:00am |
                                <small className="fw-bold"> Due May 13 at 11:59pm | 100 pts</small>
                            </small>
                        </a>
                        <div className = "float-end text-nowrap">
                            <GreenCheckmark />
                            <IoEllipsisVertical className="ms-3"/>
                        </div>
                    </li>
                    <li className="wd-lesson list-group-item p-3 ps-1 text-start d-flex align-items-center">
                        <BsGripVertical />
                        <LuBookMarked className="me-3 ms-1 text-success"/>
                        <a className="wd-assignment fw-bold container text-decoration-none text-dark"
                            href="#/Kanbas/Courses/1234/Assignments/123">
                            A2
                            <br/>
                            <small className="wd-subtext text-muted">
                                <small className="text-danger">Multiple Modules</small> |
                                <small className="fw-bold"> Not avaialable until</small> May 6 at 12:00am |
                                <small className="fw-bold"> Due May 13 at 11:59pm | 100 pts</small>
                            </small>
                        </a>
                        <div className = "float-end text-nowrap">
                            <GreenCheckmark />
                            <IoEllipsisVertical className="ms-3"/>
                        </div>
                    </li>
                    <li className="wd-lesson list-group-item p-3 ps-1 text-start d-flex align-items-center">
                        <BsGripVertical />
                        <LuBookMarked className="me-3 ms-1 text-success"/>
                        <a className="wd-assignment fw-bold container text-decoration-none text-dark"
                            href="#/Kanbas/Courses/1234/Assignments/123">
                            A3
                            <br/>
                            <small className="wd-subtext text-muted">
                                <small className="text-danger">Multiple Modules</small> |
                                <small className="fw-bold"> Not avaialable until</small> May 6 at 12:00am |
                                <small className="fw-bold"> Due May 13 at 11:59pm | 100 pts</small>
                            </small>
                        </a>
                        <div className ="float-end text-nowrap">
                            <GreenCheckmark />
                            <IoEllipsisVertical className="ms-3"/>
                        </div>
                    </li>
                </li>
            </ul>
        </div>
    );}
