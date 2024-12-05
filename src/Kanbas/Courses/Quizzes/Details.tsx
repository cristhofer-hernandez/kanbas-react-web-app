import { FaCalendarAlt } from "react-icons/fa";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import * as quizzesClient from "./client";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as coursesClient from "../client";
import { CiEdit } from "react-icons/ci";
import {addQuizzes} from "./reducer";

export default function Details() {
    const { eid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const isEditing = (location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === "Updater");
    const [quiz, setQuiz] = useState<any>(null);

    const getQuiz = async () => {
        const thisQuiz = await quizzesClient.getQuizById(eid as string);
        setQuiz(thisQuiz);
    };
    useEffect(() => {
        getQuiz();
    }, [eid]);

    return (
        <div className="container">
            <div id="wd-add-assignment-dialog">
                <div id="wd-assignments-controls-buttons" className="text-nowrap d-inline-flex align-items-centerms-auto text-nowrap">
                    <button id="wd-add-group-btn"
                            className="btn btn-md btn-secondary me-4"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(-1)}}
                    >
                        Preview</button>

                    <Link key={`Quizzes`} to={isEditing ? `${location.pathname}/Updating` : `${location.pathname}/Adding`}>
                        <button
                                // onClick={saveAssignment}
                                id="wd-add-assignment-btn"
                                className="btn btn-md btn-secondary me-1">
                                <CiEdit />
                                Edit
                        </button>
                    </Link>
                </div>

                <br />
                <hr />
                <br />
                <div className="row text-start">
                    <h1 className="fw-bold mb-4">{quiz?.name || "New Quiz"}</h1>
                    <br /><br />
                </div>

                {/* Quiz Type */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end ">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">Quiz Type</label>
                    </div>
                    <div className="col text-start mb-2">
                        {quiz?.type || ""}
                    </div>
                    <br /><br />
                </div>

                {/* Points */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">Points</label>
                    </div>
                    <div className="col text-start mb-2">
                        {quiz?.points || "0"}
                    </div>
                    <br /><br />
                </div>

                {/* Assignment Group */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">Assignment Group</label>
                    </div>
                    <div className="col text-start mb-2">
                        {quiz?.group || ""}
                    </div>
                    <br /><br />
                </div>

                {/* Shuffle Answers */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">Shuffle Answers</label>
                    </div>
                    <div className="col text-start mb-2">
                        {(quiz?.shuffle && "Yes") || (!quiz?.shuffle && "No") || ""}
                    </div>
                    <br /><br />
                </div>


                {/* Time Limit */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">Time Limit</label>
                    </div>
                    <div className="col text-start mb-2">
                        {(quiz?.timed && quiz?.minutes) || (!quiz?.timed && "None") || ""}
                    </div>
                    <br /><br />
                </div>

                {/* Multiple Attempts */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">Multiple Attempts</label>
                    </div>
                    <div className="col text-start mb-2">
                        {(quiz?.multiple_attempts && "Yes") || (!quiz?.multiple_attempts && "No") || ""}
                    </div>
                    <br /><br />
                </div>

                {/* How Many Attempts */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name"> How Many Attempts </label>
                    </div>
                    <div className="col text-start mb-2">
                        {quiz?.multiple_attempts && quiz?.attempts_allowed || "1"}
                    </div>
                    <br /><br />
                </div>

                {/* Access Code */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name"> Access Code </label>
                    </div>
                    <div className="col text-start mb-2">
                        {quiz?.access_code || ""}
                    </div>
                    <br /><br />
                </div>

                {/* Show Correct Answers */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">Show Correct Answers</label>
                    </div>
                    <div className="col text-start mb-2">
                        {(quiz?.show_correct_answers && "Yes") || (!quiz?.show_correct_answers && "No")}
                    </div>
                    <br /><br />
                </div>

                {/* One Question At A Time */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">One Question At A Time</label>
                    </div>
                    <div className="col text-start mb-2">
                        {(quiz?.one_question_at_a_time && "Yes") || (!quiz?.one_question_at_a_time && "No")}
                    </div>
                    <br /><br />
                </div>

                {/* WebCam Required */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name"> WebCam Required </label>
                    </div>
                    <div className="col text-start mb-2">
                        {(quiz?.webcam_required && "Yes") || (!quiz?.webcam_required && "No")}
                    </div>
                    <br /><br />
                </div>

                {/* Lock Questions After Answering */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name"> Lock Questions After Answering </label>
                    </div>
                    <div className="col text-start mb-2">
                        {(quiz?.lock_questions && "Yes") || (!quiz?.lock_questions && "No")}
                    </div>
                    <br /><br />
                </div>

                <br />
                <br />

                {/* Quiz Dates */}
                <div className="row d-flex align-items-center">
                    <div className="col text-nowrap text-start fw-bold">
                        Due
                    </div>
                    <div className="col text-nowrap text-start fw-bold">
                        For
                    </div>
                    <div className="col text-nowrap text-start fw-bold">
                        Available From
                    </div>
                    <div className="col text-nowrap text-start fw-bold">
                        Until
                    </div>
                </div>

                <hr />

                <div className="row d-flex align-items-center">
                    <div className="col text-nowrap text-start">
                        {quiz?.due_date || "N/A"}
                    </div>
                    <div className="col text-nowrap text-start">
                        {quiz?.assign_to || "N/A"}
                    </div>
                    <div className="col text-nowrap text-start">
                        {quiz?.available_date || "N/A"}
                    </div>
                    <div className="col text-nowrap text-start">
                        {quiz?.until_date || "N/A"}
                    </div>
                </div>

                <hr />
            </div>

            <br /><br />
        </div>

    );}