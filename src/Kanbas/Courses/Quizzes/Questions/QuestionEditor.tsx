import { FaPlus } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import * as quizzesClient from "../client";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

export default function QuestionEditor() {
    const { cid, eid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quiz, setQuiz] = useState<any>(null);
    const location = useLocation();
    const basePath = location.pathname.split('/').slice(0, -1).join('/');
    const isUpdater = (basePath === `/Kanbas/Courses/${ cid }/Quizzes/${ eid }/Updater`)
    const [questions, setQuestions] = useState<any>(null);

    const deleteQuestion = (question: any) => {
        const quest = questions.filter((q: any) => q != question);
        setQuestions(quest);
    }

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

    // useEffect(() => {
    //     if (quiz) {
    //         // Find the question that matches the provided `q_num`
    //         // const updatedQuiz = quiz.find((q: any) => q._id === eid);
    //         setQuiz(quiz)
    //         } else {
    //         console.warn("Cannot find quiz with ID: ", eid);
    //     }
    // }, [quiz, eid]);

    const saveQuiz = async() => {

        try {
            console.log(questions);
            const saveQuizWithQuestions = {
                ...quiz,
                questions: questions
            };
            await quizzesClient.updateQuiz(saveQuizWithQuestions);
            console.log("Assignment updated successfully");
            setQuiz(saveQuizWithQuestions);
            navigate(isUpdater ? `/Kanbas/Courses/${ cid }/Quizzes/${ eid }/Updater` :
                `/Kanbas/Courses/${ cid }/Quizzes/${ eid }/Adder`);
        } catch (error) {
            console.error("Error updating assignment:", error);
        }
    }


    console.log("This is the quiz object that will have its questions edited: ", quiz);
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
                        <Link to={isUpdater ? `${basePath}/Updating` : `${basePath}/Adding`} className="nav-link text-danger" aria-current="page">Active</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={`${basePath}/QuestionEditor`} className="nav-link active" aria-current="page">Questions</Link>
                    </li>
                </ul>

                <br />


                <div id="wd-assignments-controls-buttons" className="text-nowrap float-center d-inline-flex align-items-centerms-auto text-nowrap">
                    <Link to={`${basePath}/QuestionEditor/MultipleChoiceEditor`} className="nav-link text-danger" aria-current="page">
                        <button id="wd-add-group-btn"
                                className="btn btn-lg btn-secondary me-1"
                        >
                          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }}/>
                           New Question </button>
                    </Link>
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
                            <div className=" ">
                                <h3>Points: {question?.q_points || ""} </h3>
                            </div>
                            <Link to={(question?.q_type === "Multiple Choice") ? `${basePath}/QuestionEditor/${question?._id}/MultipleChoiceEditor` :
                                      (question?.q_type === "True/False") ? `${basePath}/QuestionEditor/${question?._id}/TrueFalseEditor` :
                                      `${basePath}/QuestionEditor/${question?._id}/FillInTheBlankEditor` }>
                                <div>
                                    <FaPencil className="text-primary"/>
                                </div>
                            </Link>
                            <div className="">
                                <FaTrash className="text-danger ms-2"
                                         onClick={() => deleteQuestion(question)}/>
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
                                    {answer.correct ? "(Correct)" : "(Incorrect)"}
                                </strong>
                            </p>
                        </div>
                    ))}
                </div>
                ))}

            <hr />

            <div id="wd-assignments-controls-buttons" className="text-nowrap float-center d-inline-flex align-items-centerms-auto text-nowrap">
                <button id="wd-add-group-btn"
                        className="btn btn-lg btn-secondary me-1"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(-1)}}
                >
                    Cancel</button>

                <button
                    onClick={async () => {
                        await saveQuiz();
                    }}
                    id="wd-add-assignment-btn"
                    className="btn btn-lg btn-danger me-1">
                    Save
                </button>
            </div>
        </div>

    );}