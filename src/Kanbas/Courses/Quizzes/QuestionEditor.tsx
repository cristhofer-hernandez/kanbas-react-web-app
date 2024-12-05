import { FaPlus } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import * as quizzesClient from "./client";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as coursesClient from "../client";
import {addQuizzes} from "./reducer";

export default function QuestionEditor() {
    const { cid, eid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quiz, setQuiz] = useState<any>(null);
    const location = useLocation();
    const basePath = location.pathname.split('/').slice(0, -1).join('/');
    const isUpdater = (basePath === `/Kanbas/Courses/${ cid }/Quizzes/${ eid }/Updater`)

    const getQuiz = async () => {
        console.log("This is the quiz ID: ", eid);
        const thisQuiz = await quizzesClient.getQuizById(eid as string);
        console.log("This is the OLD quiz object: ", thisQuiz)
        setQuiz(thisQuiz);
    };
    useEffect(() => {
        getQuiz();
        console.log("This is the quiz object that will have its questions edited: ", quiz);
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