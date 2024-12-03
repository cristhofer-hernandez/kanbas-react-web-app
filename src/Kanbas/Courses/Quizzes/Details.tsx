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
    const [quiz, setQuiz] = useState<any>(null);
    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [points, setPoints] = useState(0);
    // const [type, setType] = useState("QUIZ");
    // const [dueDate, setDueDate] = useState("");
    // const [assigDate, setAssignDate] = useState("");
    const createQuizForCourse = async () => {
        console.log("Course ID (qid):", eid);
        const course = await coursesClient.getCourseById(eid as string);
        // Confirm that the course exists (aid will be the course if we are adding an assignment instead of editing!
        if (!course) {
            console.error(`Course with ID ${eid} does not exist.`);
            return;
        }
        console.log(eid)
        // const newAssignment = { title: "New-Assignment", course: aid };
        const newQuiz = await coursesClient.createQuizzesForCourse(eid as string, quiz);
        setQuiz(newQuiz);
        dispatch(addQuizzes(newQuiz));
        navigate(-1);
    };

    //This Causes a 404 Error, find out the issue

    const saveQuiz = async() => {
        try {
            await quizzesClient.updateQuiz(quiz);
            console.log("Assignment updated successfully");
            navigate(-1); // Navigate back after saving
        } catch (error) {
            console.error("Error updating assignment:", error);
        }
    }

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

                    <Link key={`Quizzes`} to={`${location.pathname}/Editor`}>
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
                    <h1 className="fw-bold mb-4">Quiz Name</h1>
                    <br /><br />
                </div>

                {/* Quiz Type */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end ">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">Quiz Type</label>
                    </div>
                    <div className="col text-start mb-2">
                        Quiz Type
                    </div>
                    <br /><br />
                </div>

                {/* Points */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">Points</label>
                    </div>
                    <div className="col text-start mb-2">
                        Points
                    </div>
                    <br /><br />
                </div>

                {/* Assignment Group */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">Assignment Group</label>
                    </div>
                    <div className="col text-start mb-2">
                        QUIZZES
                    </div>
                    <br /><br />
                </div>

                {/* Shuffle Answers */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">Shuffle Answers</label>
                    </div>
                    <div className="col text-start mb-2">
                        Shuffle Answers
                    </div>
                    <br /><br />
                </div>


                {/* Time Limit */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">Time Limit</label>
                    </div>
                    <div className="col text-start mb-2">
                        Time Limit
                    </div>
                    <br /><br />
                </div>

                {/* Multiple Attempts */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">Multiple Attempts</label>
                    </div>
                    <div className="col text-start mb-2">
                        Points
                    </div>
                    <br /><br />
                </div>

                {/* How Many Attempts */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name"> How Many Attempts </label>
                    </div>
                    <div className="col text-start mb-2">
                        How Many Attempts
                    </div>
                    <br /><br />
                </div>

                {/* Access Code */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name"> Access Code </label>
                    </div>
                    <div className="col text-start mb-2">
                        Access Code
                    </div>
                    <br /><br />
                </div>

                {/* View Responses */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">View Responses</label>
                    </div>
                    <div className="col text-start mb-2">
                        View Responses
                    </div>
                    <br /><br />
                </div>

                {/* Show Correct Answers */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">Show Correct Answers</label>
                    </div>
                    <div className="col text-start mb-2">
                        Show Correct Answers
                    </div>
                    <br /><br />
                </div>

                {/* One Question At A Time */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name">One Question At A Time</label>
                    </div>
                    <div className="col text-start mb-2">
                        One Question At A Time
                    </div>
                    <br /><br />
                </div>

                {/* Require Respondus LockDown */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name"> Require Respondus LockDown</label>
                    </div>
                    <div className="col text-start mb-2">
                        Require Respondus LockDown
                    </div>
                    <br /><br />
                </div>

                {/* WebCam Required */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name"> WebCam Required </label>
                    </div>
                    <div className="col text-start mb-2">
                        WebCam Required
                    </div>
                    <br /><br />
                </div>

                {/* Lock Questions After Answering */}
                <div className="row d-flex align-items-center">
                    <div className="col text-end">
                        <label className="form-label me-2 text-nowrap fw-bold" htmlFor="wd-name"> Lock Questions After Answering </label>
                    </div>
                    <div className="col text-start mb-2">
                        Lock Questions After Answering
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
                        Due
                    </div>
                    <div className="col text-nowrap text-start">
                        For
                    </div>
                    <div className="col text-nowrap text-start">
                        Available From
                    </div>
                    <div className="col text-nowrap text-start">
                        Until
                    </div>
                </div>

                <hr />
            </div>

            <br /><br />
        </div>

    );}