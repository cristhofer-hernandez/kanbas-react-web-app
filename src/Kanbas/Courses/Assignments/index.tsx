import ModuleControlButtonsEnd from "./ModuleControlButtonsEnd"
import GreenCheckmark from "./GreenCheckmark"
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import { LuBookMarked } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
import AssignmentsControls from "./AssignmentsControls";
import { Link, useParams, useNavigate} from "react-router-dom";
import * as db from "../../Database";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import {setCurrentUser} from "../../Account/reducer";
import {addAssignment} from "./reducer";
import {addModule} from "../Modules/reducer";
import AssignmentEditor from "./AssignmentEditor";


export default function Assignments(){
    const { cid } = useParams();
    const [assignments, setAssignments] = useState<any[]>(db.assignments);
    const [assignmentAssignDate, setAssignmentAssignDate] = useState("");
    const [assignmentDueDate, setAssignmentDueDate] = useState("");
    const [assignmentPoints, setAssignmentPoints] = useState("");
    const [assignmentType, setAssignmentType] = useState("");
    const [assignmentDescription, setAssignmentDescription] = useState("");
    const { assignment } = useSelector((state: any) => state.assignmentReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";
    const dispatch = useDispatch();
    const [assignmentName, setAssignmentName] = useState("");
    const [editingAssignment, setEditingAssignment] = useState(null);
    // const [editingAssignment, setEditingAssignment] = useState(null); // Stores the assignment being edited
    // const [editTitle, setEditTitle] = useState("");
    // const [editAssignDate, setEditAssignDate] = useState("");
    // const [editDueDate, setEditDueDate] = useState("");
    // const [editPoints, setEditPoints] = useState("");
    // const [editType, setEditType] = useState("");
    // const [editDescription, setEditDescription] = useState("");
    const editorLink = (assignment: { title: string; }) => {
        return isFaculty ? `/Kanbas/Courses/${cid}/Assignments/` : '';
    };
    const addAssignment = () => {
        setAssignments([ ...assignments, { _id: new Date().getTime().toString(),
            title: assignmentName, assignDate: assignmentAssignDate, dueDate: assignmentDueDate, points: assignmentPoints,
            type: assignmentType, description: assignmentDescription, course: cid} ]);
        setAssignmentName(assignmentName);
        console.log("Assignment added");
    };
    const deleteAssignment = (assignmentId: string) => {
        setAssignments(assignments.filter((a) => a._id !== assignmentId));
    };

    const editAssignment = (assignment: any) => {
        setEditingAssignment(assignment);
    };

    const updateAssignment = (updatedAssignment: any) => {
        setAssignments(assignments.map((a) => (a._id === updatedAssignment._id ? updatedAssignment : a)));
        setEditingAssignment(null); // Close editor after saving
    };
    // const editAssignment = (assignmentId: string) => {
    //     setAssignments(assignments.map((a) => (a._id === assignmentId ? { ...a, editing: true } : a)));
    // };
    //
    // const updateAssignment = (assignment: any) => {
    //     setAssignments(assignments.map((a) => (a._id === assignment._id ? assignment : a)));
    // };


    return (
        <div className="me-2">
            <AssignmentsControls  setAssignmentName={setAssignmentName}
                                  assignmentName={assignmentName}
                                  setAssignmentAssignDate={setAssignmentAssignDate}
                                  assignmentAssignDate = {assignmentAssignDate}
                                  setAssignmentDueDate = {setAssignmentDueDate}
                                  assignmentDueDate = {assignmentDueDate}
                                  setAssignmentPoints = {setAssignmentPoints}
                                  assignmentPoints = {assignmentPoints}
                                  setAssignmentType = {setAssignmentType}
                                  assignmentType = {assignmentType}
                                  setAssignmentDescription = {setAssignmentDescription}
                                  assignmentDescription = {assignmentDescription}
                                  addAssignment={addAssignment} />
            <br/><br/><br/><br/>
            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary text-start fw-bold">
                        <BsGripVertical className="mb-1 me-2"/>
                        ASSIGNMENTS
                        <ModuleControlButtonsEnd/>
                    </div>
                    {assignments
                        .filter((assignments: any) => assignments.course === cid)
                        .map((assignments: any) => (
                    <li className="wd-lesson list-group-item p-3 ps-1 text-start d-flex align-items-center">
                        <BsGripVertical />
                        <LuBookMarked className="me-3 ms-1 text-success"/>
                        <Link to={editorLink(assignments)}
                              className="wd-assignment fw-bold container text-decoration-none text-dark"
                              data-bs-toggle={isFaculty ? "modal" : ""} data-bs-target="#wd-add-assignment-dialog"
                              onClick={() => editAssignment(assignments)}>
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
            {editingAssignment && (
                <AssignmentEditor
                    assignment={editingAssignment}
                    updateAssignment={updateAssignment}
                />
            )}
        </div>
    );}

// <AssignmentEditor setEditTitle={setEditTitle}
//                   editTitle={editTitle}
//                   setEditAssignDate={setEditAssignDate}
//                   editAssignDate={editAssignDate}
//                   setEditDueDate={setEditDueDate}
//                   editDueDate={editDueDate}
//                   setEditPoints={setEditPoints}
//                   editPoints={editPoints}
//                   setEditType={setEditType}
//                   editType={editType}
//                   setEditDescription={setEditDescription}
//                   editDescription={editDescription}
//                   editAssignment={editAssignment}
//                   updateAssignment={updateAssignment}/>




