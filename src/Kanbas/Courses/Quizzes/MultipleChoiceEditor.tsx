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
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export default function MultipleChoiceEditor() {
    const { eid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quiz, setQuiz] = useState<any>(null);
    const [questionType, setQuestionType] = useState("MultipleChoiceEditor");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(0);
    const [type, setType] = useState("QUIZ");
    const [dueDate, setDueDate] = useState("");
    const [assigDate, setAssignDate] = useState("");

    const location = useLocation();
    const basePath = location.pathname.split('/').slice(0, -1).join('/');

    const handleSelectedLinkChange = (e: any) => {
        const selected = e.target.value;

        navigate(`${basePath}/${selected}`)
    }

    const createQuizForCourse = async () => {
        console.log("Course ID (eid):", eid);
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

    //This causes a 404 error. I do not know why currently and I should find out

    // const getQuiz = async () => {
    //     const quiz = await quizzesClient.getQuizById(eid as string);
    //     console.log(quiz);
    //     setQuiz(quiz);
    // };
    // useEffect(() => {
    //     getQuiz()
    // }, [eid]);

    const saveQuiz = async() => {
        try {
            await quizzesClient.updateQuiz(quiz);
            console.log("Assignment updated successfully");
            navigate(-1); // Navigate back after saving
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

    return (
        <div id="wd-add-assignment-dialog">
            <div className="container">
                <div className="row d-flex align-items-end justify-content-start mb-4">
                    <div className="col-auto">
                        <input
                            className="form-control"
                            id="wd-name"
                            defaultValue="Unnamed Question"
                            onChange={(e) => setQuiz({ ...quiz, points: e.target.value })}
                        />
                    </div>
                    <div className="col-auto">
                        <select
                            className="form-select"
                            id="wd-submission-type"
                            value={quiz?.type || ""}
                            onChange={(e) => {
                                setQuiz({ ...quiz, type: e.target.value });
                                handleSelectedLinkChange(e);
                            }}>
                            <option value="MultipleChoiceEditor">Multuple Choice</option>
                            <option value="TrueFalseEditor">True/False</option>
                            <option value="FillInTheBlankEditor">Fill In The Blank</option>
                        </select>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end">
                        pts:
                        <input
                            className="form-control ms-2 w-25"
                            id="wd-name"
                            defaultValue=""
                        />
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
                                  defaultValue="Unnamed Question"
                                  onChange={(e) => setQuiz({ ...quiz, points: e.target.value })}
                        />
                    </div>
                </div>

                {/* Quiz Instructions */}
                <div className="row d-flex align-items-center mb-2">
                        <div className="col text-start">
                            <h5 className="fw-bold">Answers:</h5>
                        </div>
                    </div>

                    <div className="row d-flex align-items-center mb-4">
                        <div className="col-auto text-end text-nowrap">
                            <label className="form-label me-2 text-nowrap" htmlFor="wd-name">Possible Answer</label>
                        </div>
                        <div className="col-auto text-start">
                                <textarea className="form-control " id="wd-name" style={{ height: "10px"}}
                                          defaultValue="Unnamed Answer"
                                          onChange={(e) => setQuiz({ ...quiz, points: e.target.value })}
                                />
                        </div>
                        <div className="col-auto text-start">
                            <input
                                className="form-check-input me-2"
                                type="radio"
                                name="answers"
                                id="answer1"
                                value="answer1"
                            />
                            <label>Correct Answer</label>
                        </div>
                        <div className="col-auto text-start">
                            {/*<FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />*/}
                            {/*<FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>*/}
                            <FaTrash className="text-danger ms-2" />
                        </div>
                    </div>

                    <div className="row d-flex align-items-center mb-4">
                        <div className="col-auto text-end text-nowrap">
                            <label className="form-label me-2 text-nowrap" htmlFor="wd-name">Possible Answer</label>
                        </div>
                        <div className="col-auto text-start">
                                <textarea className="form-control " id="wd-name" style={{ height: "10px"}}
                                          defaultValue="Unnamed Answer"
                                          onChange={(e) => setQuiz({ ...quiz, points: e.target.value })}
                                />
                        </div>
                        <div className="col-auto text-start">
                            <input
                                className="form-check-input me-2"
                                type="radio"
                                name="answers"
                                id="answer2"
                                value="answer2"
                            />
                            <label>Correct Answer</label>
                        </div>
                        <div className="col-auto text-start">
                            {/*<FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />*/}
                            {/*<FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>*/}
                            <FaTrash className="text-danger ms-2" />
                        </div>
                    </div>

                    <div className="row d-flex align-items-center mb-4">
                        <div className="col-auto text-end text-nowrap">
                            <label className="form-label me-2 text-nowrap" htmlFor="wd-name">Possible Answer</label>
                        </div>
                        <div className="col-auto text-start">
                                <textarea className="form-control " id="wd-name" style={{ height: "10px"}}
                                          defaultValue="Unnamed Answer"
                                          onChange={(e) => setQuiz({ ...quiz, points: e.target.value })}
                                />
                        </div>
                        <div className="col-auto text-start">
                            <input
                                className="form-check-input me-2"
                                type="radio"
                                name="answers"
                                id="answer3"
                                value="answer3"
                            />
                            <label>Correct Answer</label>
                        </div>
                        <div className="col-auto text-start">
                            {/*<FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />*/}
                            {/*<FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>*/}
                            <FaTrash className="text-danger ms-2" />
                        </div>
                    </div>

                    <div className="row d-flex align-items-center mb-4">
                        <div className="col-auto text-end text-nowrap">
                            <label className="form-label me-2 text-nowrap" htmlFor="wd-name">Possible Answer</label>
                        </div>
                        <div className="col-auto text-start">
                                <textarea className="form-control " id="wd-name" style={{ height: "10px"}}
                                          defaultValue="Unnamed Answer"
                                          onChange={(e) => setQuiz({ ...quiz, points: e.target.value })}
                                />
                        </div>
                        <div className="col-auto text-start">
                            <input
                                className="form-check-input me-2"
                                type="radio"
                                name="answers"
                                id="answer4"
                                value="answer4"
                            />
                            <label>Correct Answer</label>
                        </div>
                        <div className="col-auto text-start">
                            {/*<FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />*/}
                            {/*<FaTrash className="text-danger me-2 mb-1" onClick={() => deleteModule(moduleId)}/>*/}
                            <FaTrash className="text-danger ms-2" />
                        </div>
                </div>

                <br />

                <div className="ms-auto text-start text-nowrap">
                    {/*<Link key={`Kanbas/Courses/${ cid }/Quizzes`} to={`Details`}>*/}
                        <button id="wd-add-assignment-btn" className="btn btn-sm btn-secondary me-1">
                            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }}/>
                            Add Another Answer
                        </button>
                    {/*</Link>*/}
                </div>


            <br /><br />

                <div id="wd-assignments-controls-buttons" className="text-nowrap float-start d-inline-flex align-items-centerms-auto text-nowrap">
                    <button id="wd-add-group-btn"
                            className="btn btn-sm btn-secondary me-1"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(-1)}}
                    >
                        Cancel</button>

                    <button
                        onClick={async () => {
                            try {
                                await createQuizForCourse();
                            }
                            catch (error) {
                                await saveQuiz();
                            }
                        }}
                        id="wd-add-assignment-btn"
                        className="btn btn-sm btn-danger me-1">
                        Update Question
                    </button>
                </div>
            </div>
        </div>

    );}