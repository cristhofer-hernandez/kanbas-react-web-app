import { FaCalendarAlt } from "react-icons/fa";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import * as db from "../../Database";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";




export default function AssignmentAdder(
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
    const { aid } = useParams();
    const navigate = useNavigate();
    const assignments = db.assignments;




    return (
        <div id="wd-add-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="modal-body">
                            {/* Assignment Name */}
                            <div className="container">
                                <div className="row text-start">
                                    <label className="form-label" htmlFor="wd-name">Assignment Name</label>
                                    <input className="form-control mb-2" id="wd-name" value= {assignmentName}
                                           onChange={(e) => setAssignmentName(e.target.value)}/><br /><br />
                                    <textarea className="form-control" id="wd-description" style={{ height: "250px"}}
                                              value= {assignmentDescription}
                                              onChange={(e) => setAssignmentDescription(e.target.value)}
                                    >
                                </textarea>
                                </div>

                                <br />

                                {/* Points */}
                                <div className="row d-flex align-items-center mb-4">
                                    <div className="col text-end">
                                        <label className="form-label me-2 text-nowrap" htmlFor="wd-name">Points</label>
                                    </div>
                                    <div className="col ">
                                        <input className="form-control w-100" id="wd-name"
                                               value={assignmentPoints}
                                               onChange={(e) => setAssignmentPoints(e.target.value)}/>
                                    </div>
                                    <br /><br />
                                </div>

                                {/* Assignment Group */}
                                <div className="row d-flex align-items-center mb-4">
                                    <div className="col text-end text-nowrap">
                                        <label className="form-label me-2 text-nowrap" htmlFor="wd-name">Assignment Group</label>
                                    </div>
                                    <div className="col">
                                        <select className="form-select w-100" id="wd-submission-type"
                                                onChange={(e) => setAssignmentType(e.target.value)}>
                                            <option value={assignmentType}>ASSIGNMENTS</option>
                                            <option value={assignmentType}>QUIZZES</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Display Grade As */}
                                <div className="row d-flex align-items-center mb-4">
                                    <div className="col text-end text-nowrap">
                                        <label className="form-label me-2 text-nowrap" htmlFor="wd-name">
                                            Display Grade As
                                        </label>
                                    </div>
                                    <div className="col">
                                        <select className="form-select w-100" id="wd-submission-type">
                                            <option value="PERCENTAGE">Percentage</option>
                                            <option value="PASS/FAIL">Pass/Fail</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Submission Type */}
                                <div className="row mb-4">
                                    <div className="col text-end text-nowrap">
                                        <label className="form-label me-2" htmlFor="wd-name">Submission Type</label>
                                    </div>
                                    <div className="col">
                                        <div className="card">
                                            <div className="card-body m-2">

                                                <div className="row text-start">
                                                    <select className="form-select" id="wd-submission-type">
                                                        <option value="ONLINE">Online</option>
                                                        <option value="PAPER">Paper</option>
                                                    </select>
                                                </div>
                                                <br /><br />


                                                <div className="row text-start">
                                                    <label className="fw-bold fs-6 mb-1" htmlFor="wd-online-entry-options">
                                                        Online Entry Options
                                                    </label><br />
                                                    <label id="wd-online-entry-options">
                                                        <input className="form-check-input mt-1 me-2"
                                                               type="checkbox" id="wd-points" value={100} />
                                                        Text Entry
                                                    </label><br />
                                                    <label id="wd-online-entry-options">
                                                        <input className="form-check-input mt-1 me-2"
                                                               type="checkbox" id="wd-points" value={100} />
                                                        Website URL
                                                    </label><br />
                                                    <label id="wd-online-entry-options">
                                                        <input className="form-check-input mt-1 me-2"
                                                               type="checkbox" id="wd-points" value={100} />
                                                        Media Recordings
                                                    </label><br />
                                                    <label id="wd-online-entry-options">
                                                        <input className="form-check-input mt-1 me-2"
                                                               type="checkbox" id="wd-points" value={100} />
                                                        Student Annotation
                                                    </label><br />
                                                    <label id="wd-online-entry-options">
                                                        <input className="form-check-input mt-1 me-2"
                                                               type="checkbox" id="wd-points" value={100} />
                                                        File Uploads
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Assign */}
                                <div className="row ">
                                    <div className="col text-end">
                                        <label className="form-label me-2 text-nowrap" htmlFor="wd-name">Assign</label>
                                    </div>
                                    <div className="col">
                                        <div className="card">
                                            <div className="card-body text-start">
                                                <label className="form-label me-2 text-nowrap card-text fw-bold"
                                                       htmlFor="wd-name">
                                                    Assign To
                                                </label>
                                                <input className="form-control" id="wd-name"/><br /><br />

                                                <label className="form-label me-2 text-nowrap card-text fw-bold"
                                                       htmlFor="wd-name">
                                                    Due
                                                </label>
                                                <input className="form-control" id="wd-name"
                                                       value={assignmentDueDate}
                                                       onChange={(e) => setAssignmentDueDate(e.target.value)}/><br /><br />

                                                <div className="row">
                                                    <div className="col text-start">
                                                        <label className="form-label me-2 text-nowrap card-text fw-bold"
                                                               htmlFor="wd-name">
                                                            Available From
                                                        </label>
                                                        <div className="input-group">
                                                            <input className="form-control" id="wd-name"
                                                                   value={assignmentAssignDate}
                                                                   onChange={(e) => setAssignmentAssignDate(e.target.value)}/>
                                                            <button id="wd-calendar-icon col" className="input-group-text">
                                                                <FaCalendarAlt />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="col text-start">
                                                        <label className="form-label me-2 text-nowrap card-text fw-bold"
                                                               htmlFor="wd-name">
                                                            Until
                                                        </label>
                                                        <div className="input-group">
                                                            <input className="form-control" id="wd-name"/>
                                                            <button id="wd-calendar-icon col" className="input-group-text">
                                                                <FaCalendarAlt />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <br /><br />

                                </div>
                            </div>

                            <br /><br />

                            <div className="modal-footer">
                                <div id="wd-assignments-controls-buttons" className="text-nowrap float-end d-inline-flex align-items-centerms-auto text-nowrap">
                                    {/*<Link to={'..'} onClick={(e) => {*/}
                                    {/*    // e.preventDefault();*/}
                                    {/*    // navigate(-1);*/}
                                    {/*}}>*/}
                                    <button id="wd-add-group-btn"
                                            className="btn btn-lg btn-secondary me-1" data-bs-dismiss="modal">
                                        Cancel</button>
                                    {/*</Link>*/}
                                    {/*<Link to={'..'} onClick={(e) => {*/}
                                    {/*    // e.preventDefault();*/}
                                    {/*    // navigate(-1);*/}
                                    {/*}}>*/}
                                    <button onClick={addAssignment} id="wd-add-assignment-btn"
                                            className="btn btn-lg btn-danger me-1" data-bs-dismiss="modal">
                                        Save</button>
                                    {/*</Link>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );}