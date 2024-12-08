import { FaPlus } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import * as quizzesClient from "./client";
import "react-datepicker/dist/react-datepicker.css";
import { CiCircleAlert } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import DatePicker from "react-datepicker";

export default function QuizSubmission() {
    const { cid, eid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quiz, setQuiz] = useState<any>(null);
    const location = useLocation();
    const basePath = location.pathname.split('/').slice(0, -1).join('/');
    const isUpdater = (basePath === `/Kanbas/Courses/${ cid }/Quizzes/${ eid }/Updater`)
    const [questions, setQuestions] = useState<any>(null);

    const getQuiz = async () => {
        console.log("This is the quiz ID: ", eid);
        const thisQuiz = await quizzesClient.getQuizById(eid as string);
        console.log("This is the OLD quiz object: ", thisQuiz)
        setQuiz(thisQuiz);
        setQuestions(thisQuiz.questions);
    };
    useEffect(() => {
        getQuiz();
        console.log("This is the quiz object that will have its questions edited: ", quiz);
    }, [eid]);



    console.log("This is the quiz object that will have its questions edited: ", quiz);
    return (
        <div id="wd-add-assignment-dialog">
            <div className="row text-start">
                <h1 className="fw-bold mb-4">{quiz?.name || "New Quiz"}</h1>
                <br /><br />
            </div>

            <br />

            <div className="card" style={{ backgroundColor: "#f69697" }}>
                <div className="card-body text-start">
                    <CiCircleAlert />
                    This is a preview of the published version of the quiz.
                </div>
            </div>

            <hr />

            <br /><br />
            {questions?.map((question: any) => (
                <div className="card mb-4">
                    <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between ">
                            <div className=" ">
                                <h3>{question?.title || ""}</h3>
                            </div>
                            <div className="">
                                <h3>Points: {question?.q_points || ""} </h3>
                            </div>
                            <div className="">
                                {question.correct_answer ? (<FaCheck className="text-success"/>)
                                    : (<FaXmark className="text-danger"/>)}
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="blockquote mb-0 text-start">
                            <p>{question?.q_description || ""}</p>
                        </div>
                    </div>
                    <hr/>
                    {question.answers?.map((answer: any, index: number) => (
                        <div key={index} className="d-flex ms-2">
                            <p className="d-flex align-items-center ms-2">
                                {answer.answer}
                                <strong className="ms-2">
                                    {question.q_type === "MultipleChoice" || question.q_type === "FillInTheBlank"
                                        ? (answer.correct ? "(Correct)" : "(Incorrect)")
                                        : (answer.correct ? "True" : "False")}
                                </strong>
                            </p>
                        </div>
                    ))}
                    <div className="d-flex ms-2 mb-2">
                        <strong className="d-flex align-items-center ms-2">
                            You Chose:
                        </strong>
                        <div className="ms-2">
                            {question.answer_chosen}
                        </div>
                    </div>
                </div>
            ))}

            <br /> < br/>
            <hr />

            <div id="wd-assignments-controls-buttons" className="text-nowrap float-start align-items-centerms-auto"
            >
                <Link to={`${basePath}`} className="nav-link text-danger" aria-current="page">
                    <button id="wd-add-group-btn"
                            className="btn btn-lg btn-secondary me-1"
                    >
                        &lt; Back To Editor  </button>
                </Link>

            </div>

            <br /> < br/>



        </div>

    );}