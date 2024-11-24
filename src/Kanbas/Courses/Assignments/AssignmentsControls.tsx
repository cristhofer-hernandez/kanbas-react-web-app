import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as coursesClient from "../client";
import {addAssignments} from "./reducer";

export default function AssignmentsControls() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";
    const { cid } = useParams();
    const dispatch = useDispatch();

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
        <Link key={`Kanbas/Courses/${ cid }/Assignments`} to={`${cid}`}>
            <button id="wd-add-assignment-btn" className="btn btn-lg btn-danger me-1">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }}/>
                Assignment
            </button>
        </Link>

        <button id="wd-add-group-btn" className="btn btn-lg btn-secondary me-1">
                <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
                Group</button>
            </div>
    )}

        </div>
    );}
