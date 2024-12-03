import { FaCalendarAlt } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import * as quizzesClient from "./client";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as coursesClient from "../client";
import {addQuizzes} from "./reducer";

export default function QuizEditor() {
    const { eid } = useParams();
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quiz, setQuiz] = useState<any>(null);
    const [isShuffleChecked, setIsShuffleChecked] = useState(false);
    const [isTimedChecked, setIsTimedChecked] = useState(false);
    const [isMultipleAttemptsChecked, setIsMultipleAttemptsChecked] = useState(false);
    const handleShuffle = (e: any) => {
        setIsShuffleChecked(e.target.checked);
    };

    const handleTimed = (e: any) => {
        setIsTimedChecked(e.target.checked);
    };

    const handleMultipleAttempts = (e: any) => {
        setIsMultipleAttemptsChecked(e.target.checked);
    };

    // const [title, setTitle] = useState("");
    // const [description, setDescription] = useState("");
    // const [points, setPoints] = useState(0);
    // const [type, setType] = useState("QUIZ");
    // const [dueDate, setDueDate] = useState("");
    // const [assigDate, setAssignDate] = useState("");

    const location = useLocation();
    const basePath = location.pathname.split('/').slice(0, -1).join('/');
    const createQuizForCourse = async () => {
        console.log("Course ID (cid):", cid);
        const course = await coursesClient.getCourseById(cid as string);
            // Confirm that the course exists (aid will be the course if we are adding an assignment instead of editing!
        if (!course) {
            console.error(`Course with ID ${cid} does not exist.`);
            return;
        }
        console.log(cid)
        // const newAssignment = { title: "New-Assignment", course: aid };
        const newQuiz = await coursesClient.createQuizzesForCourse(eid as string, quiz);
        setQuiz(newQuiz);
        dispatch(addQuizzes(newQuiz));
        navigate(-1);
    };

    //This causes a 404 error. I do not know why currently and I should find out
    //
    const getQuiz = async () => {
        console.log("This is the quiz ID: ", eid);
        const thisQuiz = await quizzesClient.getQuizById(eid as string);
        console.log("This is the OLD quiz object: ", thisQuiz)
        setQuiz(thisQuiz);
    };
    useEffect(() => {
        getQuiz();
        console.log("This is the NEW quiz object: ", quiz);
    }, [eid]);

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
        <div id="wd-add-assignment-dialog">
            <div className="container">
                <div className="row d-flex align-items-end justify-content-end">
                    <div className="col d-flex justify-content-end">
                        <h4 className="form-label me-2">Points</h4>
                        <h4 className="form-label me-2">Not Published</h4>
                        <button id="wd-calendar-icon col" className="input-group-text">
                            <IoEllipsisVertical />
                        </button>
                    </div>
                </div>

            <br />
            <hr/>

            {/* Tabs */}
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link to={`${basePath}/Editor`} className="nav-link active" aria-current="page">Active</Link>
                </li>
                <li className="nav-item">
                    <Link to={`${basePath}/QuestionEditor`} className="nav-link text-danger" aria-current="page">Questions</Link>
                </li>
            </ul>

            <br />

                {/* Quiz Name */}
                <div className="row d-flex align-items-center mb-4">
                    <div className="col ">
                        <input className="form-control w-50" id="wd-name"
                               defaultValue= {quiz?.title  || ""}
                               onChange={(e) => setQuiz({ ...quiz, name: e.target.value })}
                        />
                    </div>
                    <br /><br />
                </div>

                {/* Quiz Instructions */}
                <div className="row d-flex align-items-center mb-4">
                    <div className="col text-start">
                        <label className="form-label me-2 text-nowrap" htmlFor="wd-name">Quiz Instructions</label>
                        <textarea className="form-control w-100" id="wd-name" style={{ height: "150px"}}
                               defaultValue="Unnamed Quiz"
                               onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                        />
                    </div>
                    <br /><br />
                </div>

                {/* Quiz Type */}
                <div className="row d-flex align-items-center mb-4">
                    <div className="col-2 text-end text-nowrap">
                        <label className="form-label me-2 text-nowrap" htmlFor="wd-name">Quiz Type</label>
                    </div>
                    <div className="col-10 text-start">
                        <select className="form-select w-25" id="wd-submission-type"
                        >
                            <option
                                value={quiz?.type  || ""}
                            >Graded Quiz</option>
                            <option
                                value={quiz?.type  || ""}
                            >Practice Quiz</option>
                            <option
                                value={quiz?.type  || ""}
                            >Graded Survey</option>
                            <option
                                value={quiz?.type  || ""}
                            >Ungraded Survey</option>
                        </select>
                    </div>
                </div>

                {/* Assignment Group */}
                <div className="row d-flex align-items-center mb-4">
                    <div className="col-2 text-end text-nowrap">
                        <label className="form-label me-2 text-nowrap" htmlFor="wd-name">Assignment Group</label>
                    </div>
                    <div className="col-10 text-start">
                        <select className="form-select w-25" id="wd-submission-type"
                        >
                            <option
                                value={quiz?.group  || ""}
                            >QUIZZES</option>
                            <option
                                value={quiz?.group  || ""}
                            >ASSIGNMENTS</option>
                            <option
                                value={quiz?.group  || ""}
                            >EXAMS</option>
                            <option
                                value={quiz?.group  || ""}
                            >PROJECT</option>
                        </select>
                    </div>
                </div>

                {/* Assignment Group */}
                <div className="row d-flex align-items-center mb-4">
                    <div className="col-2 text-end text-nowrap">
                        {/*<label className="form-label me-2 text-nowrap" htmlFor="wd-name">Quiz Type</label>*/}
                    </div>
                    <div className="col-10 text-start">
                        <h4 className="fw-bold">Options</h4>
                            <div className="row d-flex align-items-center mb-4 mt-4">
                                <div className="col text-start mb-4">
                                    <input
                                        type="checkbox"
                                        checked={isShuffleChecked}
                                        onChange={(e) => {
                                            handleShuffle(e);
                                            setQuiz({ ...quiz, shuffle: isShuffleChecked })}}
                                    />
                                    <label className="ms-2">
                                        Shuffle Answers
                                    </label>
                                </div>
                                <div className="row d-flex align-items-center mb-4">
                                    <div className="col-2 d-flex text-start">
                                        <input
                                            type="checkbox"
                                            checked={isTimedChecked}
                                            onChange={(e) => {
                                                handleTimed(e);
                                                setQuiz({ ...quiz, timed: isTimedChecked })}}
                                        />
                                        <label className="ms-2">
                                            Time Limit
                                        </label>
                                    </div>
                                    <div className="col-2 d-flex text-end">
                                        <input className="form-control" id="wd-name" style={{ width: "3rem"}}
                                               type="number"
                                               defaultValue=""
                                               onChange={(e) => setQuiz({ ...quiz, minutes: e.target.value })}
                                        />
                                        <label className="ms-2 mt-2">
                                            Minutes
                                        </label>
                                    </div>
                                </div>
                                <div className="col text-start w-25" style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px"}}>
                                    <input
                                        type="checkbox"
                                        checked={isMultipleAttemptsChecked}
                                        onChange={(e) => {
                                            handleMultipleAttempts(e);
                                            setQuiz({ ...quiz, multiple_attempts: isMultipleAttemptsChecked })}}
                                    />
                                    <label className="ms-2">
                                        Allow Multiple Attempts
                                    </label>
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
                                           value={quiz?.due_date || ""}
                                           onChange={(e) => setQuiz({ ...quiz, due_date: e.target.value })}
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
                                                   value={quiz?.assign_date || ""}
                                                   onChange={(e) => setQuiz({ ...quiz, assign_date: e.target.value })}
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

            <div id="wd-assignments-controls-buttons" className="text-nowrap float-center d-inline-flex align-items-centerms-auto text-nowrap">
                <button id="wd-add-group-btn"
                        className="btn btn-lg btn-secondary me-1"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1)}}
                >
                    Cancel</button>

                <button
                    //THis DOES work, just change the try/catch to a conditional and it will work!
                    onClick={async () => {
                        try {
                            await createQuizForCourse();
                            }
                         catch (error) {
                            await saveQuiz();
                        }
                    }}
                        id="wd-add-assignment-btn"
                        className="btn btn-lg btn-danger me-1">
                    Save
                </button>
            </div>
        </div>

    );}