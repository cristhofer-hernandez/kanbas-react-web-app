import { FaPlus } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import * as quizzesClient from "./client";
import "react-datepicker/dist/react-datepicker.css";
import { CiCircleAlert } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import DatePicker from "react-datepicker";
import * as resultsClient from "./resultsClient"
import {addResult, deleteResult} from "./resultsReducer";
import * as quizClient from "./client";
import {deleteQuizzes} from "./reducer";
import {createResultForQuiz, findResultForQuiz} from "./client";

export default function Result() {
    const { cid, eid, qid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quiz, setQuiz] = useState<any>(null);
    const [result, setResult] = useState<any>(null);
    const location = useLocation();
    const basePath = location.pathname.split('/').slice(0, -2).join('/');
    const facultyBasePath = location.pathname.split('/').slice(0, -1).join('/');
    const isUpdater = (basePath === `/Kanbas/Courses/${ cid }/Quizzes/${ eid }/Updater`)
    const [questions, setQuestions] = useState<any>(null);

    const getQuiz = async () => {
        try {
            const thisQuiz = await quizzesClient.getQuizById(eid as string);
            setQuiz(thisQuiz);
            console.log("This is the quiz: ", thisQuiz)
        }
        catch (error) {
                console.error("Error fetching quiz:", error);
            }
    };

    const getResult = async () => {
        try {
            const thisResult = await quizzesClient.findResultForQuizAndUser(eid as string, currentUser._id);
            console.log("This is the result object: ", thisResult);

            if (!thisResult && quiz) {
                const newResult = {
                    attempts_taken: 0,
                    points: 0,
                    quiz: quiz._id,
                    user: currentUser._id,
                    questions: quiz.questions,
                }

                setResult(newResult);
                setQuestions(quiz.questions);
                console.log("Result created: ", newResult);
                console.log("These are the questions", quiz.questions)
            } else {
                setResult(thisResult)
                setQuestions(thisResult.questions);
            }

        } catch (error) {
            console.error("Error fetching result for quiz:", error);
        }
    };

    const createResultForQuizAndUser = async () => {
        if (quiz && currentUser) {
            console.log("This is the result: ", result)
            const newResult = await quizzesClient.createResultForQuiz(quiz._id, currentUser._id, result);
            setResult(newResult);
            dispatch(addResult(newResult));

        }
    };

    const findResultForQuizAndUser = async () => {
        if (quiz && currentUser && result.attempts_taken === 0) {
            try {
                console.log("A new result was created")
                await createResultForQuizAndUser();
            } catch (error) {
                console.error("This result cannot be found");
            }

        }

    };

    const removeResult = async (resultId: string) => {
        await resultsClient.deleteResults(resultId);
        dispatch(deleteResult(resultId));
    };

    const deleteThisResult = (resultId: string) => {
        if (result) {
            removeResult(resultId)
        }
    };


    useEffect(() => {
        getQuiz();
    }, [eid]);

    useEffect(() => {
        getResult();
    }, [quiz]);

    return (
        <div id="wd-add-assignment-dialog">
            <div className="row text-start">
                <h1 className="fw-bold mb-4">{quiz?.name || "New Quiz"}</h1>
                <br /><br />
            </div>

            <br />

            {result && result.attempts_taken == 0 &&
                (<div className="card" style={{ backgroundColor: "#f69697" }}>
                    <div className="card-body text-start">
                        <CiCircleAlert />
                        You have not attempted this quiz yet.
                    </div>
                </div>)
            }

            {quiz && result && ((result.attempts_taken < quiz.attempts_allowed) || currentUser.role === "FACULTY")
                ? (<button id="wd-add-group-btn"
                    className="btn btn-lg btn-danger me-1 mt-2"
                    onClick={async (e) => {
                        await findResultForQuizAndUser();
                        try {
                            navigate(`${location.pathname}/${questions ? questions[0]._id : ""}`);
                        } catch (error) {
                            console.warn("This quiz has no questions", error)
                        }
                    }}
            >
                Take Quiz  </button>) :

                (<div className="card" style={{ backgroundColor: "#f69697" }}>
                    <div className="card-body text-start">
                        <CiCircleAlert />
                        You have exhausted your attempts.
                    </div>
                </div>)
            }

            <hr />

            <br /><br />
            {result && result.attempts_taken > 0 && (questions?.map((question: any) => (
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
            )))}

            <br /> < br/>

            {result &&
                (<div className=" me-3 mb-2 text-end">
                    <h3 className=" align-items-center ms-2">
                        Score: {result.points}
                    </h3>
                </div>)}
            <hr />

            {currentUser.role !== "FACULTY" && (
                <div id="wd-assignments-controls-buttons" className="text-nowrap float-start align-items-centerms-auto"
            >
                <Link to={`${basePath}`} className="nav-link text-danger" aria-current="page">
                    <button id="wd-add-group-btn"
                            className="btn btn-lg btn-secondary me-1"
                    >
                        &lt; Back To Quizzes  </button>
                </Link>

            </div>)}

            {currentUser.role === "FACULTY" && (
                <div id="wd-assignments-controls-buttons" className="text-nowrap float-start align-items-centerms-auto"
                >
                    <Link to={facultyBasePath} className="nav-link text-danger" aria-current="page">
                        <button id="wd-add-group-btn"
                                className="btn btn-lg btn-secondary me-1"
                        >
                            &lt; Back To Quiz Details  </button>
                    </Link>

                </div>)}


            <br /> < br/>



        </div>

    );}