import { addAssignment, editAssignment, updateAssignment, deleteAssignment }
    from "./reducer";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import * as db from "../../Database";
import { Link, useParams } from "react-router-dom";
import AssignmentAdd from "./AssignmentAdder";
import AssignmentEditor from "./AssignmentEditor";
import AssignmentAdder from "./AssignmentAdder";

export default function AssignmentsControls(
    { assignmentName, setAssignmentName, setAssignmentAssignDate, assignmentAssignDate, setAssignmentDueDate,
        assignmentDueDate, setAssignmentPoints, assignmentPoints, setAssignmentType, assignmentType,
        setAssignmentDescription, assignmentDescription, addAssignment }:
    { assignmentName: string; setAssignmentName: (title: string) => void;
        setAssignmentAssignDate: (date: string) => void; assignmentAssignDate: string;
        setAssignmentDueDate: (date: string) => void; assignmentDueDate: string;
        setAssignmentPoints: (date: string) => void; assignmentPoints: string;
        setAssignmentType: (date: string) => void; assignmentType: string;
        setAssignmentDescription: (date: string) => void; assignmentDescription: string;
        addAssignment: () => void; }
) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";
    const { cid } = useParams();

    return (
        <div id="wd-assignments-controls-buttons" className="text-nowrap float-end d-inline-flex align-items-center">

            <form className="form-inline input-group my-2 my-lg-0 me-5 mt-1 d-inline-flex justify-content-start">
                <span id="wd-search-icon" className="input-group-text">
                    <CiSearch />
                </span>
                <input className="form-control mr-sm-2" type="search"
                       placeholder="Search..." aria-label="Search" style={{ height: "50px" }}/>
            </form>

    {(isFaculty &&
        <div id="wd-assignments-controls-buttons" className="ms-auto text-nowrap">
        {/*<Link key={`Kanbas/Courses/${ cid }/Assignments`} to={ `Add-Assignment` }>*/}
            <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger me-1"
                    data-bs-toggle="modal" data-bs-target="#wd-add-assignment-dialog">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }}/>
                Assignment
            </button>
        {/*</Link>*/}

        <button id="wd-add-group-btn" className="btn btn-lg btn-secondary me-1">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group</button>
            </div>
    )}

            <AssignmentAdder setAssignmentName={setAssignmentName}
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
                              addAssignment={addAssignment}/>

        </div>
    );}
