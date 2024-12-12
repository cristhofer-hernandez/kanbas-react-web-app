import ModuleControlButtonsEnd from "./ModuleControlButtonsEnd"
import GreenCheckmark from "./GreenCheckmark"
import { IoEllipsisVertical } from "react-icons/io5";
import { BsGripVertical } from "react-icons/bs";
import { LuBookMarked } from "react-icons/lu";
import { FaTrash } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import QuizControls from "./QuizControls";
import { Link, useParams, useNavigate} from "react-router-dom";
import * as coursesClient from "../client";
import * as quizClient from "./client";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import quizzesReducer, { setQuizzes, addQuizzes, editQuizzes, updateQuizzes, deleteQuizzes }
    from "./reducer";
import * as quizzesClient from "./client";


export default function Quizzes(){
    const { cid } = useParams();
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [quizName, setQuizName] = useState("");
    const [quiz, setQuiz] = useState<any>(null);
    const [published, setPublished] = useState(false);
    const isFaculty = currentUser?.role === "FACULTY";
    const dispatch = useDispatch();

    const editorLink = (quiz: any) => {
        return isFaculty ? `${quiz._id}/Updater` :
            `${quiz._id}/Results`;
    };

    const fetchQuizzes = async () => {
        console.log(cid);
        const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
        console.log(quizzes);
    };
    useEffect(() => {
        fetchQuizzes();
    }, []);


    const removeQuiz = async (quizId: string) => {
        await quizClient.deleteQuiz(quizId);
        dispatch(deleteQuizzes(quizId));
    };

    const deleteQuiz = (quizId: string) => {
        removeQuiz(quizId)
    };

    const publishQuiz = async (updatedQuiz: any) => {
        try {
            await quizzesClient.updateQuiz(updatedQuiz);
            const updatedQuizzes = quizzes.map((q: any) =>
                q._id === updatedQuiz._id ? {...q, published: updatedQuiz.published} : q
            );
            dispatch(setQuizzes(updatedQuizzes)); // Update Redux state to reflect the change
            console.log("This is the updated quiz: ", updatedQuiz);
        } catch (error) {
            console.error("Error updating quiz:", error);
        }
    };


    return (
        <div className="me-2">
            <QuizControls />
            <br/><br/><br/><br/>
            <ul id="wd-modules" className="list-group rounded-0">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary text-start fw-bold">
                        <BsGripVertical className="mb-1 me-2"/>
                        QUIZZES
                        <ModuleControlButtonsEnd/>
                    </div>
                    {quizzes
                        .map((quiz: any) => (quiz.published || currentUser.role !== "STUDENT") && (
                    <li className="wd-lesson list-group-item p-3 ps-1 text-start d-flex align-items-center">
                        <BsGripVertical />
                        <LuBookMarked className="me-3 ms-1 text-success"/>
                        <Link to={editorLink(quiz)}
                              className="wd-assignment fw-bold container text-decoration-none text-dark">
                            {/* onClick={() => {editing=true}}> */}
                            {quiz.name}
                            <br/>
                            <small className="wd-subtext text-muted">
                                <small className="text-danger">Multiple Modules</small> |
                                <small className="fw-bold"> Not avaialable until</small> {quiz.assign_date} |
                                <small className="fw-bold"> {quiz.due_date} | {quiz.points} pts</small>
                            </small>
                        </Link>
                        {(isFaculty &&
                        <div className ="float-end text-nowrap">
                            {/*<GreenCheckmark />*/}
                            {(quiz.published) ?
                                (<FaCheckCircle className="text-success"
                                                onClick={() => {
                                                    const updatedQuiz = { ...quiz, published: false }
                                                    setQuiz(updatedQuiz)
                                                    dispatch(updateQuizzes(updatedQuiz))
                                                    publishQuiz(updatedQuiz);
                                                }}/>) :
                                (<FaCircleXmark className="text-danger"
                                                onClick={() => {
                                                    const updatedQuiz = { ...quiz, published: true }
                                                    setQuiz(updatedQuiz)
                                                    dispatch(updateQuizzes(updatedQuiz))
                                                    publishQuiz(updatedQuiz);
                                                }}/>)}
                            <FaTrash className="text-danger ms-3" onClick={() => deleteQuiz(quiz._id)}/>
                            <IoEllipsisVertical className="ms-3"/>
                        </div>
                            )}
                            <ul className="wd-lessons list-group rounded-0">
                            </ul>
                    </li>
                    ))}
                </li>
            </ul>
        </div>
    );}





