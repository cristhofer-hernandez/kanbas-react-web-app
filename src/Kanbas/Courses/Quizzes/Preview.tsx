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
import DatePicker from "react-datepicker";
import * as coursesClient from "../client";
import {addQuizzes} from "./reducer";
import {addResult} from "./resultsReducer"
import {createResultForQuiz} from "./client";
import * as resultsClient from "./resultsClient";
import {updateResult} from "./resultsClient";

export default function QuizPreview() {
    const { cid, eid, qid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quiz, setQuiz] = useState<any>(null);
    const location = useLocation();
    const basePath = location.pathname.split('/').slice(0, -1).join('/');
    const isUpdater = (basePath === `/Kanbas/Courses/${ cid }/Quizzes/${ eid }/Updater`)
    const [questions, setQuestions] = useState<any>([]);
    const [question, setQuestion] = useState<any>(null);
    const [questionCopy, setQuestionCopy] = useState<any>(null);
    const [answers, setAnswers] = useState<any>([]);
    const [checked, setChecked] = useState(false);
    const [blankAnswer, setBlankAnswer] = useState("");
    const [points, setPoints] = useState(0);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [result, setResult] = useState<any>(null);

    const updateQuestionCorrect = (question: any, answer: any) => {
        const saveQuestion = {
            ...question,
            correct_answer: answer.correct,
            answer_chosen: answer.answer,

        }
        setQuestionCopy(saveQuestion);

        // console.log("QuestionCopy changed in function: ", saveQuestion);

    };

    const updateTrueFalse = (question: any, answer: any, answerChosen: string) => {
        console.log("Was True or False chosen? :", answerChosen)
        const answerSelected = (answerChosen == "True");
        console.log("Was True or False chosen? :", answerSelected)
        console.log("What is the answer to the True/False question? :",  answer.correct )
        const isAnswerCorrect = answer.correct === answerSelected;

        const saveQuestion = {
            ...question,
            correct_answer: isAnswerCorrect,
            answer_chosen: answerChosen,

        }
        setQuestionCopy(saveQuestion);

        console.log("QuestionCopy changed in function: ", saveQuestion);
    };

    const checkBlankCorrect = (question: any, newAnswer: string) => {
        const isAnswerCorrect = question.answers.some((a: any) => a.answer === newAnswer);
        console.log("Did an answer match?", isAnswerCorrect)
        const saveQuestion = {
            ...question,
            correct_answer: isAnswerCorrect,
            answer_chosen: newAnswer,

        }
        setQuestionCopy(saveQuestion);


        console.log("QuestionCopy changed in function: ", saveQuestion);

    };

    const getQuiz = async () => {
        const thisQuiz = await quizzesClient.getQuizById(eid as string);
        // console.log("This is the OLD quiz object: ", thisQuiz)
        setQuiz(thisQuiz);
        setQuestions(thisQuiz.questions);
        setQuestion(thisQuiz.questions.find((q: any) => (q._id === qid)))
        // setQuestionCopy(thisQuiz.questions.find((q: any) => (q._id === qid)))
        // console.log("This is the first instance of question ", question)
        // console.log("This is the first instance of questionCopy ", questionCopy)
        console.log("This is the quiz ", thisQuiz)
    };

    const getQuestions = async () => {
        if (quiz) {
            setQuestions(quiz.questions);
            setQuestion(quiz.questions.find((q: any) => (q._id === qid)))
            console.log("This is the first instance of question ", question)
            console.log("This is the first instance of questionCopy ", questionCopy)
        }
    };

    useEffect(() => {
        getQuiz();
        getResult();
    }, [eid, qid]);

    useEffect(() => {
        getQuestions();
        console.log("This is the result that was retireved in the beggining", result)
    }, [quiz]);

    const getResult = async () => {
        try {
            const thisResult = await quizzesClient.findResultForQuizAndUser(eid as string, currentUser._id);
            console.log("This is the first instance of Result: ", thisResult);

            setResult(thisResult);
        } catch (error) {
            console.error("Error fetching result for quiz:", error);
        }
    };




    const getNextQuestionIndex = () => {
        const nextQuestionIndex = questions?.findIndex((q: any) => q._id === qid) + 1;
        if (nextQuestionIndex >= questions?.length) {
            return -1;
        }
        return nextQuestionIndex;
    };

    const getLastQuestionIndex = () => {
        const lastQuestionIndex = questions?.findIndex((q: any) => q._id === qid) - 1;
        if (lastQuestionIndex < 0) {
            return -1
        }

        return lastQuestionIndex;
    };

    const saveResult = async (submitting: boolean = false) => {
        try {
            console.log("This is the result right before it is updated and saved: ", result);
            const updatedQuestions = result.questions ? [...result.questions] : [];
            updatedQuestions.forEach((r: any, index: number) => {
                if (r._id === questionCopy._id) {
                    updatedQuestions[index] = { ...r, ...questionCopy };
                }
            });

            if (!submitting) {
                const saveResultWithQuestion = {
                    ...result,
                    questions: updatedQuestions,
                };
                await resultsClient.updateResult(saveResultWithQuestion);
                setResult(saveResultWithQuestion)
                console.log("Result updated successfully: ", saveResultWithQuestion);

            } else {
                const updatedPoints = updatedQuestions.reduce(
                    (sum: number, q: any) => {
                        if (q.correct_answer) {
                            return sum + Number(q.q_points || 0);
                        }
                        return sum;
                    },
                    0
                );

                const saveResultWithQuestion = {
                    ...result,
                    attempts_taken: (result.attempts_taken ?? 0) + 1,
                    points: updatedPoints,
                    questions: updatedQuestions,
                };

                await resultsClient.updateResult(saveResultWithQuestion);
                setResult(saveResultWithQuestion)
                console.log("Result updated successfully: ", saveResultWithQuestion);
            }

        } catch (error) {
            console.error("Error updating result:", error);
        }
    }

    return (
        <div id="wd-add-assignment-dialog">
            <div className="row text-start">
                <h1 className="fw-bold mb-4">{quiz?.name || "New Quiz"}</h1>
                <br /><br />
            </div>

            <br />

            {currentUser.role === "FACULTY" && (<div className="card" style={{ backgroundColor: "#f69697" }}>
                <div className="card-body text-start">
                    <CiCircleAlert />
                    This is a preview of the published version of the quiz.
                </div>
            </div>)}

            <hr />

            <br /><br />
            {questions?.filter((q: any) => (q._id === qid))
                .map((question: any) => (
                <div className="card mb-4">
                    <div className="card-header">
                        <div className="d-flex align-items-center justify-content-between ">
                            <div className=" ">
                                <h3>{question?.title || ""}</h3>
                            </div>
                            <div className=" ">
                                <h3>Points: {question?.q_points || ""} </h3>
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
                        <div>
                            {(question.q_type === "MultipleChoice") &&
                                    (<div key={index} className="d-flex ms-2 mb-2">
                                        <input
                                            className="form-check-input me-2"
                                            type="radio"
                                            name="answers"
                                            id={`index-${index}-${answer.answer}`}
                                            checked={questionCopy?.answer_chosen === answer.answer}
                                            onChange={(e) => {
                                                updateQuestionCorrect(question, answer);
                                                // console.log("QuestionCopy changed after updating answer: ", questionCopy);
                                                // console.log("question changed after updating answer: ", questionCopy);
                                            }}
                                            />
                                        <label className="d-flex align-items-center ms-2">
                                            {answer.answer}
                                        </label>
                                    </div>
                                )}

                            {(question.q_type === "TrueFalse") &&
                                (<div className="d-flex ms-2 mb-2">
                                        <div className="row d-flex align-items-center mb-2 me-2">
                                            <div className="col-auto text-start">
                                                <input
                                                    className="form-check-input me-2"
                                                    type="radio"
                                                    name="answers"
                                                    id="True"
                                                    value="True"
                                                    onChange={(e) => {
                                                        updateTrueFalse(question, answer, e.target.value);
                                                    }}
                                                />
                                                <label>True</label>
                                            </div>
                                        </div>
                                        <div className="row d-flex align-items-center mb-2 me-2">
                                            <div className="col-auto text-start">
                                                <input
                                                    className="form-check-input me-2"
                                                    type="radio"
                                                    name="answers"
                                                    id="False"
                                                    value="False"
                                                    onChange={(e) => {
                                                        updateTrueFalse(question, answer, e.target.value);
                                                    }}
                                                />
                                                <label>False</label>
                                            </div>
                                        </div>
                                    </div>
                                )}

                        </div>

                    ))}

                    {(question.q_type === "FillInTheBlank") &&
                        (<div className="d-flex ms-2 mb-2">
                                <input
                                    className="form-control w-25"
                                    name="answers"
                                    id="index"
                                    value={blankAnswer}
                                    onChange={(e) => {
                                        const newBlankAnswer = e.target.value;
                                        setBlankAnswer(newBlankAnswer);
                                        checkBlankCorrect(question, newBlankAnswer)
                                    }}
                                />
                            </div>
                        )}
                </div>
            ))}

            {questions && (getLastQuestionIndex() > -1) &&
                (<div id="wd-assignments-controls-buttons" className="text-nowrap float-start align-items-centerms-auto">
                    <Link to={`${basePath}/${questions[getLastQuestionIndex()]._id}`} className="nav-link text-danger" aria-current="page"
                          onClick={async () => {
                              await saveResult();
                          }}>
                        <button id="wd-add-group-btn"
                                className="btn btn-lg btn-secondary me-1"
                        >
                            &lt; Back </button>
                    </Link>

                </div>)}

            {questions && (getNextQuestionIndex() != -1) &&
                (<div id="wd-assignments-controls-buttons" className="text-nowrap float-end align-items-centerms-auto">
                <Link to={`${basePath}/${questions[getNextQuestionIndex()]._id}`} className="nav-link text-danger" aria-current="page"
                      onClick={async () => {
                          await saveResult();
                      }}>
                    <button id="wd-add-group-btn"
                            className="btn btn-lg btn-secondary me-1"
                    >
                        Next &gt;  </button>
                </Link>

            </div>)}

            <br /> < br/>
            <hr />

            <div id="wd-assignments-controls-buttons" className="text-nowrap float-end align-items-centerms-auto"
            >
                <Link to={`${basePath}`}
                      className="nav-link text-danger" aria-current="page"
                      onClick={async () => {
                          await saveResult(true);
                      }}
                >
                    <button id="wd-add-group-btn"
                            className="btn btn-lg btn-danger me-1"
                    >
                        Submit Quiz  </button>
                </Link>

            </div>

            <br /> < br/> <br /> <br />


            {(currentUser.role === "FACULTY") && (<div
                id="wd-assignments-controls-buttons"
                className="text-nowrap container-fluid d-flex justify-content-center align-items-center">
                <Link to={`${basePath}`} className="nav-link text-danger w-100" aria-current="page">
                    <button
                        id="wd-add-group-btn"
                        className="btn btn-lg btn-secondary w-100"
                    >
                        Keep Editing This Quiz
                    </button>
                </Link>
            </div>)}

            <br />

            <h3 className="text-start"> Questions </h3>
            {questions?.map((question: any) => (
                    <div className="text-start mb-1">
                        <Link to={`${ basePath }/${question._id}`} className="text-danger"
                              onClick={async () => {
                                  await saveResult();
                              }}
                        >
                            {question.title}
                        </Link>
                    </div>
                ))}


        </div>

    );}