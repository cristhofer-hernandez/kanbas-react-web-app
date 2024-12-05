import ModuleControlButtonsEnd from "./ModuleControlButtonsEnd"
import GreenCheckmark from "./GreenCheckmark"
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import { LuBookMarked } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
import AssignmentsControls from "./AssignmentsControls";
import { Link, useParams, useNavigate} from "react-router-dom";
import * as coursesClient from "../client";
import * as assignmentsClient from "./client";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { setAssignments, addAssignments, editAssignment, updateAssignment, deleteAssignments }
    from "./reducer";
import {createAssignmentsForCourse} from "../client";


export default function Assignments(){
    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [assignmentName, setAssignmentName] = useState("");
    const isFaculty = currentUser?.role === "FACULTY";
    const dispatch = useDispatch();

    const editorLink = (assignment: any) => {
        return isFaculty ? `/Kanbas/Courses/${cid}/Assignments/${assignment._id}/Updater` : '';
    };

    const fetchAssignments = async () => {
        console.log(cid);
        const assignments = await coursesClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };
    useEffect(() => {
        fetchAssignments();
    }, []);

    const createAssignmentForCourse = async () => {
        if (!cid) return;
        const newAssignment = { title: assignmentName, course: cid };
        const assignment = await coursesClient.createAssignmentsForCourse(cid, newAssignment);
        dispatch(addAssignments(assignment));
    };

    const removeAssignment = async (assignmentId: string) => {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignments(assignmentId));
    };

    const deleteAssignment = (assignmentId: string) => {
        removeAssignment(assignmentId)
    };

    return (
        <div className="me-2">
            <AssignmentsControls />
            <br/><br/><br/><br/>
            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary text-start fw-bold">
                        <BsGripVertical className="mb-1 me-2"/>
                        ASSIGNMENTS
                        <ModuleControlButtonsEnd/>
                    </div>
                    {assignments
                        .map((assignments: any) => (
                    <li className="wd-lesson list-group-item p-3 ps-1 text-start d-flex align-items-center">
                        <BsGripVertical />
                        <LuBookMarked className="me-3 ms-1 text-success"/>
                        <Link to={editorLink(assignments)}
                              className="wd-assignment fw-bold container text-decoration-none text-dark">
                            {assignments.title}
                            <br/>
                            <small className="wd-subtext text-muted">
                                <small className="text-danger">Multiple Modules</small> |
                                <small className="fw-bold"> Not avaialable until</small> {assignments.assignDate} |
                                <small className="fw-bold"> {assignments.dueDate} | {assignments.points} pts</small>
                            </small>
                        </Link>
                        {(isFaculty &&
                        <div className ="float-end text-nowrap">
                            <GreenCheckmark />
                            <FaTrash className="text-danger ms-3" onClick={() => deleteAssignment(assignments._id)}/>
                            <IoEllipsisVertical className="ms-3"/>
                        </div>
                            )}
                            <ul className="wd-lessons list-group rounded-0">
                            </ul>
                    </li>
                    ))}
                </li>
            </ul>
        </div>
    );}





