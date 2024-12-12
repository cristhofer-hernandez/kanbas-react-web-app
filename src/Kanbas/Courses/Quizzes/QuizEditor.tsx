import { FaCalendarAlt } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import * as quizzesClient from "./client";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as coursesClient from "../client";
import {addQuizzes, deleteQuizzes} from "./reducer";
import * as quizClient from "./client";

export default function QuizEditor() {
    const { eid } = useParams();
    const { cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [quiz, setQuiz] = useState<any>({
        name: "New Quiz",
        type: "Graded Quiz",
        group: "",
        shuffle: false,
        timed: false,
        minutes: 0,
        multiple_attempts: false,
        attempts_allowed: 1,
        due_date: "",
        assign_date: "",
        available_date: "",
        until_date: "",
        points: 0,
        show_correct_answers: false,
        one_question_at_a_time: false,
        lock_questions: false,
        webcam_required: false,
        access_code: "",
        published: false,
        course: null,
        description: "",
        });

    const location = useLocation();
    const basePath = location.pathname.split('/').slice(0, -1).join('/');
    const isUpdating = (location.pathname.substring(location.pathname.lastIndexOf('/') + 1) === "Updating");
    const isUpdater = (basePath === `/Kanbas/Courses/${ cid }/Quizzes/${ eid }/Updater`)

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
        // navigate(isUpdater ? `/Kanbas/Courses/${ cid }/Quizzes/${ eid }/Updater` : `/Kanbas/Courses/${ cid }/Quizzes/${ eid }/Adder`);
    };

    const removeQuiz = async (quizId: string) => {
        await quizClient.deleteQuiz(quizId);
        dispatch(deleteQuizzes(quizId));
    };

    const deleteQuiz = (quizId: string) => {
        removeQuiz(quizId)
    };

    const getQuiz = async () => {
        const thisQuiz = await quizzesClient.getQuizById(eid as string);
        setQuiz((prevQuiz: any) => ({
            ...prevQuiz,
            ...thisQuiz,
        }));
    };

    useEffect(() => {
        getQuiz();
        console.log("This is the NEW quiz object: ", quiz);
    }, [eid]);

    const saveQuiz = async() => {
        try {
            await quizzesClient.updateQuiz(quiz);
            console.log("Assignment updated successfully");
            navigate(`/Kanbas/Courses/${ cid }/Quizzes/${ eid }/Updater`);
        } catch (error) {
            console.error("Error updating assignment:", error);
        }
    }

    const saveAndPublish = async (updatedQuiz: any) => {
        try {
            await quizzesClient.updateQuiz(updatedQuiz);
            console.log("Assignment updated successfully");
            navigate(`/Kanbas/Courses/${ cid }/Quizzes/${ eid }/Updater`);
        } catch (error) {
            console.error("Error updating assignment:", error);
        }
    }

    const createAndPublish = async (updatedQuiz: any) => {
        console.log("Course ID (cid):", cid);
        const course = await coursesClient.getCourseById(cid as string);
        // Confirm that the course exists (aid will be the course if we are adding an assignment instead of editing!
        if (!course) {
            console.error(`Course with ID ${cid} does not exist.`);
            return;
        }
        console.log(cid)
        // const newAssignment = { title: "New-Assignment", course: aid };
        const newQuiz = await coursesClient.createQuizzesForCourse(eid as string, updatedQuiz);
        setQuiz(newQuiz);
        dispatch(addQuizzes(newQuiz));
        // navigate(isUpdater ? `/Kanbas/Courses/${ cid }/Quizzes/${ eid }/Updater` : `/Kanbas/Courses/${ cid }/Quizzes/${ eid }/Adder`);
        navigate(`/Kanbas/Courses/${ cid }/Quizzes/`);
    };

    return (
        <div id="wd-add-assignment-dialog">
            <div className="container">
                <div className="row d-flex align-items-end justify-content-end">
                    <div className="col d-flex justify-content-end">
                        <h4 className="form-label me-4">Points: {quiz?.points}</h4>
                        <h4 className="form-label me-4">{quiz?.published ? "Published" : "Not Published"}</h4>
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
                    <Link to={isUpdater ? `${basePath}/Updating` : `${basePath}/Adding`} className="nav-link active"
                          aria-current="page">Details</Link>
                </li>
                <li className="nav-item">
                    <Link to={`${basePath}/QuestionEditor`} className="nav-link text-danger" aria-current="page"
                        // onClick={() => (quiz && !isUpdater) ? createQuizForCourse() : ""}
                    >
                        Questions</Link>
                </li>
            </ul>

            <br />

                {/* Quiz Name */}
                <div className="row d-flex align-items-center mb-4">
                    <div className="col ">
                        <input className="form-control w-50" id="wd-name"
                               value= {quiz?.name  || ""}
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
                                  value= {quiz?.description  || ""}
                               onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                        />
                    </div>
                    <br /><br />
                </div>

                {/* Quiz Type */}
                <div className="row d-flex align-items-center mb-4">
                    <div className="col-4 text-start text-nowrap">
                        <label className="form-label me-2 text-nowrap" htmlFor="wd-name">Quiz Type</label>
                    </div>
                    <div className="col-8 text-start">
                        <select className="form-select w-25" id="wd-submission-type"
                                value={quiz?.type || "Graded Quiz"}
                                onChange={(e) => setQuiz({ ...quiz, type: e.target.value })}
                        >
                            <option
                                value="Graded Quiz"
                            >Graded Quiz</option>
                            <option
                                value="Practice Quiz"
                            >Practice Quiz</option>
                            <option
                                value="Graded Survey"
                            >Graded Survey</option>
                            <option
                                value="Ungraded Survey"
                            >Ungraded Survey</option>
                        </select>
                    </div>
                </div>

                {/* Assignment Group */}
                <div className="row d-flex align-items-center mb-4">
                    <div className="col-4 text-start text-nowrap">
                        <label className="form-label me-2 text-nowrap" htmlFor="wd-name">Assignment Group</label>
                    </div>
                    <div className="col-8 text-start">
                        <select className="form-select w-25" id="wd-submission-type"
                                value={quiz?.group || "QUIZZES"}
                                onChange={(e) => setQuiz({ ...quiz, group: e.target.value })}
                        >
                            <option
                                value="QUIZZES"
                            >QUIZZES</option>
                            <option
                                value="ASSIGNMENTS"
                            >ASSIGNMENTS</option>
                            <option
                                value="EXAMS"
                            >EXAMS</option>
                            <option
                                value="PROJECT"
                            >PROJECT</option>
                        </select>
                    </div>
                </div>

                {/* Access Code */}
                <div className="row d-flex align-items-center mb-4">
                    <div className="col-4 text-start text-nowrap">
                        <label className="form-label me-2 text-nowrap" htmlFor="wd-name">Access Code</label>
                    </div>
                    <div className="col-8 text-start">
                        <input className="form-control w-50" id="wd-name"
                               value= {quiz?.access_code  || ""}
                               onChange={(e) => setQuiz({ ...quiz, access_code: e.target.value })}
                        />
                    </div>
                </div>

                {/* Options */}
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
                                        checked={quiz?.shuffle || false}
                                        onChange={(e) => {
                                            setQuiz({ ...quiz, shuffle: e.target.checked })}}
                                    />
                                    <label className="ms-2">
                                        Shuffle Answers
                                    </label>
                                </div>
                                <div className="row d-flex align-items-center mb-4">
                                    <div className="col d-flex text-start">
                                        <input
                                            type="checkbox"
                                            checked={quiz?.timed || false}
                                            onChange={(e) => {
                                                setQuiz({ ...quiz, timed: e.target.checked })}}
                                        />
                                        <label className="ms-2">
                                            Time Limit
                                        </label>
                                    </div>
                                    {quiz?.timed && (<div className="col d-flex text-end">
                                        <input className="form-control" id="wd-name" style={{ width: "5rem"}}
                                               type="number"
                                               value={quiz?.minutes || "10"}
                                               onChange={(e) => setQuiz({ ...quiz, minutes: e.target.value })}
                                        />
                                        <label className="ms-2 mt-2">
                                            Minutes
                                        </label>
                                    </div>)}
                                </div>

                                <div className="row d-flex align-items-center mb-4">
                                    <div className="col d-flex text-start">
                                        <input
                                            type="checkbox"
                                            checked={quiz?.show_correct_answers || false}
                                            onChange={(e) => {
                                                setQuiz({ ...quiz, show_correct_answers: e.target.checked })}}
                                        />
                                        <label className="ms-2">
                                            Show Correct Answers
                                        </label>
                                    </div>
                                </div>

                                <div className="row d-flex align-items-center mb-4">
                                    <div className="col d-flex text-start">
                                        <input
                                            type="checkbox"
                                            checked={quiz?.one_question_at_a_time || false}
                                            onChange={(e) => {
                                                setQuiz({ ...quiz, one_question_at_a_time: e.target.checked })}}
                                        />
                                        <label className="ms-2">
                                            One Question At A Time
                                        </label>
                                    </div>
                                </div>

                                <div className="row d-flex align-items-center mb-4">
                                    <div className="col d-flex text-start">
                                        <input
                                            type="checkbox"
                                            checked={quiz?.webcam_required || false}
                                            onChange={(e) => {
                                                setQuiz({ ...quiz, webcam_required: e.target.checked })}}
                                        />
                                        <label className="ms-2">
                                            Webcam Required
                                        </label>
                                    </div>
                                </div>

                                <div className="row d-flex align-items-center mb-4">
                                    <div className="col d-flex text-start">
                                        <input
                                            type="checkbox"
                                            checked={quiz?.lock_questions || false}
                                            onChange={(e) => {
                                                setQuiz({ ...quiz, lock_questions: e.target.checked })}}
                                        />
                                        <label className="ms-2">
                                            Lock Questions After Answering
                                        </label>
                                    </div>
                                </div>

                                <div className="col text-start w-25" style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px"}}>
                                    <input
                                        type="checkbox"
                                        checked={quiz?.multiple_attempts || false}
                                        onChange={(e) => {
                                            setQuiz({ ...quiz, multiple_attempts: e.target.checked })}}
                                    />
                                    <label className="ms-2">
                                        Allow Multiple Attempts
                                    </label>
                                    {quiz?.multiple_attempts && (<div className="col-2 d-flex text-end">
                                        <input className="form-control" id="wd-name" style={{ width: "5rem"}}
                                               type="number"
                                               value={quiz?.attempts_allowed || "3"}
                                               onChange={(e) => setQuiz({ ...quiz, attempts_allowed: e.target.value })}
                                        />
                                        <label className="ms-2 mt-2">
                                            Attempts
                                        </label>
                                    </div>)}

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
                                <input className="form-control" id="wd-name"
                                       defaultValue={quiz?.assign_to || ""}
                                       onChange={(e) => setQuiz({ ...quiz, assign_to: e.target.value })}/>
                                <br /><br />

                                <label className="form-label me-2 text-nowrap card-text fw-bold"
                                       htmlFor="wd-name">
                                    Due
                                </label>
                                <div className="input-group">
                                    <input className="form-control" id="wd-name"
                                           defaultValue={quiz?.due_date || ""}
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
                                                   defaultValue={quiz?.available_date || ""}
                                                   onChange={(e) => setQuiz({ ...quiz, available_date: e.target.value })}
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
                                                <input className="form-control" id="wd-name"
                                                       defaultValue={quiz?.until_date || ""}
                                                       onChange={(e) => setQuiz({ ...quiz, until_date: e.target.value })}
                                                />
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
                            if (!isUpdater && quiz) {
                                try {
                                    deleteQuiz(quiz._id)
                                } catch (error) {
                                    console.error("There is no quiz to delete", error)
                                }
                            }
                            navigate(basePath)}}
                >
                    Cancel</button>

                <button
                    //THis DOES work, just change the try/catch to a conditional and it will work!
                    onClick={async () => {
                        if (isUpdating) {
                            await saveQuiz();
                            }
                         else {
                            await createQuizForCourse();
                            navigate(`/Kanbas/Courses/${ cid }/Quizzes/`);
                        }
                    }}
                        id="wd-add-assignment-btn"
                        className="btn btn-lg btn-danger me-1">
                    Save
                </button>
                <button
                    //THis DOES work, just change the try/catch to a conditional and it will work!
                    onClick={async () => {
                        const publishedQuiz = { ...quiz, published: true };
                        if (isUpdating) {
                            await saveAndPublish(publishedQuiz);
                        }
                        else {
                            await createAndPublish(publishedQuiz);
                        }
                    }}
                    id="wd-add-assignment-btn"
                    className="btn btn-lg btn-success me-1">
                    Save & Publish
                </button>
            </div>
        </div>

    );}