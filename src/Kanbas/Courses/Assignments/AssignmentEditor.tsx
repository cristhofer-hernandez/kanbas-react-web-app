import { FaCalendarAlt } from "react-icons/fa";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import * as assignmentsClient from "./client";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as coursesClient from "../client";
import {addAssignments} from "./reducer";

export default function AssignmentEditor() {
    const { aid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location.pathname;
    const isUpdating = (pathname.substring(pathname.lastIndexOf('/') + 1) === "Updater");
    const [assignment, setAssignment] = useState<any>(null);

    const createAssignmentForCourse = async () => {
        const course = await coursesClient.getCourseById(aid as string);
            // Confirm that the course exists (aid will be the course if we are adding an assignment instead of editing!
        if (!course) {
            console.log(`Course with ID ${aid} does not exist.`);
            return;
        }
        console.log("This is the id of the assignment being created: ", aid)
        const newAssignment = await coursesClient.createAssignmentsForCourse(aid as string, assignment);
        setAssignment(newAssignment);
        dispatch(addAssignments(newAssignment));
        navigate(-1);
    };

    const getAssignment = async () => {
        const assignment = await assignmentsClient.getAssignmentById(aid as string);
        console.log("This is the id of the assignment currently: ", aid);
        setAssignment(assignment);
    };
    useEffect(() => {
        getAssignment()
    }, [aid]);

    const saveAssignment = async () => {
        try {
            await assignmentsClient.updateAssignment(assignment);
            console.log("Assignment updated successfully");
            navigate(-1); // Navigate back after saving
        } catch (error) {
            console.error("Error updating assignment:", error);
        }
    }

    return (
        <div id="wd-add-assignment-dialog">
            <div className="container">
                <div className="row text-start">
                <label className="form-label" htmlFor="wd-name">Assignment Name</label>
                <input className="form-control mb-2" id="wd-name"
                       value= {assignment?.title  || ""}
                       onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
                />
                           <br /><br />
                <textarea className="form-control" id="wd-description" style={{ height: "250px"}}
                          value= {assignment?.description  || ""}
                          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
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
                               value={assignment?.points || ""}
                               onChange={(e) => setAssignment({ ...assignment, points: e.target.value })}
                        />
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
                        >
                            <option
                                value={assignment?.type  || ""}
                            >ASSIGNMENTS</option>
                            <option
                                value={assignment?.type  || ""}
                            >QUIZZES</option>
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
                                <div className="input-group">
                                    <input className="form-control" id="wd-name"
                                           value={assignment?.dueDate || ""}
                                           onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
                                    />
                                    <button id="wd-calendar-icon col"
                                            className="input-group-text">
                                        <FaCalendarAlt />
                                    </button>
                                </div>

                                <br /><br />

                                <div className="row">
                                    <div className="col text-start">
                                        <label className="form-label me-2 text-nowrap card-text fw-bold"
                                               htmlFor="wd-name">
                                            Available From
                                        </label>
                                        <div className="input-group">
                                            <input className="form-control" id="wd-name"
                                                   value={assignment?.assignDate || ""}
                                                   onChange={(e) => setAssignment({ ...assignment, assignDate: e.target.value })}
                                            />
                                            <button id="wd-calendar-icon col"
                                                    className="input-group-text">
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
                    <button id="wd-add-group-btn"
                            className="btn btn-lg btn-secondary me-1"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(-1)}}
                    >
                        Cancel</button>

                    <button
                        onClick={async () => {
                            if (isUpdating) {
                                await saveAssignment();
                                }
                             else {
                                await createAssignmentForCourse();
                            }
                        }}
                            id="wd-add-assignment-btn"
                            className="btn btn-lg btn-danger me-1">
                        Save
                    </button>
                </div>
            </div>
        </div>

    );}