import { FaCalendarAlt } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import * as quizzesClient from "../client";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as coursesClient from "../../client";
import {addQuizzes} from "../reducer";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export default function FillInTheBlankEditor() {
    const { q_num, eid, cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quiz, setQuiz] = useState<any>(null);
    const [answers, setAnswers] = useState<any>([]);
    const [question, setQuestion ] = useState<any>({
        title: "",
        q_type: "FillInTheBlank",
        q_points: "10",
        q_description: "",
        quiz: "",
        // quiz: `${quiz._id}`,
        answers: answers,
    });


    const location = useLocation();
    const basePath = location.pathname.split('/').slice(0, -1).join('/');
    const pathExcludingLastTwo = location.pathname.split('/').slice(0, -2).join('/');
    const [notEnoughAnswers, setNotEnoughAnswers] = useState(false);
    const [answerFieldNotFilled, setAnswerFieldNotFilled] = useState(false);
    const [descriptionFieldNotFilled, setDescriptionFieldNotFilled] = useState(false);
    const [noCorrectChoice, setNoCorrectChoice] = useState(false);
    const [pointDifference, setPointDifference] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const handleSaveQuizClick = async () => {
        if (notEnoughAnswers || answerFieldNotFilled || descriptionFieldNotFilled) {
            setShowModal(true); // Show the modal if any condition is true
            return;
        }
    }

    const handleSelectedLinkChange = (e: any) => {
        const selected = e.target.value;
        navigate(`${basePath}/${selected}`)
    }

    const getQuiz = async () => {
        console.log("This is the quiz ID: ", eid);
        const thisQuiz = await quizzesClient.getQuizById(eid as string);
        console.log("This is the OLD quiz object (MC): ", thisQuiz)
        setQuiz(thisQuiz);
    };

    useEffect(() => {
        getQuiz();
    }, [eid]);

    useEffect(() => {
        if (quiz && quiz.questions && q_num) {
            // Find the question that matches the provided `q_num`
            const quest = quiz.questions.find((q: any) => q._id === q_num);
            if (quest) {
                setQuestion(quest);
            } else {
                console.warn("Question not found for q_num:", q_num);
            }
        }
    }, [quiz, q_num]);

    useEffect(() => {
        if (question && question.answers) {
            setAnswers(question.answers);
        }
    }, [question]);

    const updateAnswerField = (index: number, newField: string) => {
        setAnswers((answerArray: any[]) =>
            answerArray.map((answer, i) =>
                i === index ? {...answer, answer: newField} : answer)
        );
    };

    const updateAnswerCorrect = (index: number, newCorrect: boolean) => {
        setAnswers((answerArray: any[]) =>
            answerArray.map((answer, i) => ({
                ...answer,
                correct: i === index && newCorrect // Only set the clicked answer as correct
            }))
        );
    };

    const deleteAnswer = (answer: any) => {
        const ans = answers.filter((a: any) => a != answer);
        setAnswers(ans);
    }

    const handleEmpty = () => {
        if (answers.length < 1) {
            setNotEnoughAnswers(true);
            return true;
        }
        if (answers.find((a: any) => a.answer === "")) {
            setAnswerFieldNotFilled(true);
            return true;
        }
        if (question.q_description === "") {
            setDescriptionFieldNotFilled(true);
            return true;
        }
        setNotEnoughAnswers(false);
        setAnswerFieldNotFilled(false);
        setDescriptionFieldNotFilled(false);
        setNoCorrectChoice(false);
        return false
    }

    const handleEmptyName = () => {
        if (question.title === "") {
            console.log("The title is empty");
            const updatedQuestion = { ...question, title: `Question ${quiz.questions ? (quiz.questions.length + 1) : (1)}`, answers: answers };
            setQuestion(updatedQuestion);
            return updatedQuestion; // Return updated question
        }
        return question; // Return unchanged question if no update needed
    };


    const saveQuiz = async() => {
        try {
            if (handleEmpty()) {
                return;
            }

            const questionWithTitle = handleEmptyName();

            const addQuestionWithAnswers = {
                ...questionWithTitle,
                q_type: "FillInTheBlank",
                answers: answers,
            };

            const addQuizWithQuestion = {
                ...quiz,
                points: [...(quiz.questions || []), addQuestionWithAnswers]
                    .reduce((total, question) => total + Number(question.q_points || 0), 0),
                questions: [...(quiz.questions || []), addQuestionWithAnswers],
            };

            const saveQuestionWithAnswers = {
                ...questionWithTitle,
                q_type: "FillInTheBlank",
                answers: answers, // Directly use the updated `answers` state
            };

            const saveQuizWithQuestion = {
                ...quiz,
                points: (quiz.questions?.map((q: any) =>
                    q._id === question._id ? saveQuestionWithAnswers : q
                ) || [saveQuestionWithAnswers])
                    .reduce((total: any, quest: any) => total + Number(quest.q_points || 0), 0),
                questions: quiz.questions?.map((q: any) =>
                    q._id === question._id ? saveQuestionWithAnswers : q
                ) || [saveQuestionWithAnswers],
            };

            if(q_num) {
                setQuestion(saveQuestionWithAnswers);
                setQuiz(saveQuizWithQuestion);
                await quizzesClient.updateQuiz(saveQuizWithQuestion);
            } else {
                setQuestion(addQuestionWithAnswers);
                setQuiz(addQuizWithQuestion);
                await quizzesClient.updateQuiz(addQuizWithQuestion);
            }
            console.log("Assignment updated successfully")
            navigate(q_num ? `${pathExcludingLastTwo}` :`${basePath}`); // Navigate back after saving
        } catch (error) {
            console.error("Error updating assignment:", error);
        }
    }

    //This changes the selected option to the current selected option (MC/True or False/Fill in the Blank)
    useEffect(() => {
        // Extract the current editor type from the path (This is the location at the end of the link)
        const editorType = location.pathname.split("/").pop();

        // Update quiz.type based on the current link received from above
        setQuiz((prev: any) => ({ ...prev, type: editorType }));
    }, [location]);

    console.log("This is the quiz object that will have its Fill In the Blank Questions edited: ", quiz);
    return (
        <div id="wd-add-assignment-dialog">
            <div className="container">
                <div className="row d-flex align-items-end justify-content-start mb-4">
                    <div className="col-auto">
                        <input
                            className="form-control"
                            id="wd-name"
                            value={question?.title || ""}
                            onChange={(e) => setQuestion({ ...question, title: e.target.value, answers: answers })}
                        />
                    </div>
                    <div className="col-auto">
                        <select
                            className="form-select"
                            id="wd-submission-type"
                            value={"FillInTheBlank"}
                            onChange={(e) => {
                                handleSelectedLinkChange(e);
                            }}>
                            <option value="MultipleChoice">Multuple Choice</option>
                            <option value="TrueFalse">True/False</option>
                            <option value="FillInTheBlank">Fill In The Blank</option>
                        </select>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end">
                        pts:
                        <input
                            className="form-control ms-2 w-25"
                            id="wd-name"
                            value={question?.q_points || "1"}
                            onChange={(e) => {
                                setQuestion({ ...question, q_points: e.target.value, answers: answers });
                                setPointDifference(pointDifference - question?.q_points)
                            }}/>
                    </div>
                </div>

                <hr />

                <div className="row d-flex align-items-end justify-content-start ">
                    <div className="col-auto">
                        <p>Enter your question and multiple answers, then select the one correct answer.</p>
                    </div>
                </div>

                {/* Quiz Instructions */}
                <div className="row d-flex align-items-center mb-2">
                    <div className="col text-start">
                        <h5 className="fw-bold">Question:</h5>
                    </div>
                </div>

                <div className="row d-flex align-items-center mb-4">
                    <div className="col text-start">
                        <textarea className="form-control w-100" id="wd-name" style={{ height: "150px"}}
                                  value={question?.q_description || ""}
                                  onChange={(e) => setQuestion({ ...question, q_description: e.target.value, answers: answers })}
                        />
                    </div>
                </div>

                {/* Quiz Instructions */}
                <div className="row d-flex align-items-center mb-2">
                    <div className="col text-start">
                        <h5 className="fw-bold">Answers:</h5>
                    </div>
                </div>

                {answers.map((answer: any, index: number) =>
                    <div className="row d-flex align-items-center mb-4">
                        <div className="col-auto text-end text-nowrap">
                            <label className="form-label me-2 text-nowrap" htmlFor="wd-name">Possible Answer</label>
                        </div>
                        <div className="col-auto text-start">
                                <textarea className="form-control " id="wd-name" style={{ height: "10px"}}
                                          value={answer.answer || ""}
                                          onChange={(e) => updateAnswerField(index, e.target.value)}
                                />
                        </div>
                        <div className="col-auto text-start">
                            <FaTrash className="text-danger ms-2"
                                     onClick={() => deleteAnswer(answer)}/>
                        </div>
                    </div>
                )}


                <div className="ms-auto text-start text-nowrap">
                    {/*<Link key={`Kanbas/Courses/${ cid }/Quizzes`} to={`Details`}>*/}
                    <button id="wd-add-assignment-btn" className="btn btn-sm btn-secondary me-1"
                            onClick={(e) => {
                                setAnswers([...answers, { answer: "", correct: true }]);
                            }}>
                        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }}/>
                        Add Another Answer
                    </button>
                    {/*</Link>*/}
                </div>


                <br /><br />

                {/* Modal for any question errors */}
                {showModal &&
                    (<div className="modal show" style={{ display: "block" }} tabIndex={-1}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Question Error!</h5>
                                </div>
                                <div className="modal-body">
                                    {notEnoughAnswers ?
                                        "Please create at least one possible answer" :
                                        (answerFieldNotFilled ?
                                            "Please complete all of your answer choices" :
                                                "Please select one answer as the correct answer choice")}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            onClick={() => setShowModal(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>)}
                {/* Modal for any question errors */}

                <div id="wd-assignments-controls-buttons" className="text-nowrap float-start d-inline-flex align-items-centerms-auto text-nowrap">
                    <button id="wd-add-group-btn"
                            className="btn btn-sm btn-secondary me-1"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(q_num ? `${pathExcludingLastTwo}` :`${basePath}`);}}
                    >
                        Cancel</button>

                    <button
                        onClick={async () => {
                            handleSaveQuizClick();
                            await saveQuiz();
                        }}
                        id="wd-add-assignment-btn"
                        className="btn btn-sm btn-danger me-1">
                        Update Question
                    </button>
                </div>
            </div>
        </div>

    );}