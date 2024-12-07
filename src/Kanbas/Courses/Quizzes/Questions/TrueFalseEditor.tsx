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

export default function TrueFalseEditor() {
    const { q_num, eid, cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quiz, setQuiz] = useState<any>(null);

    const location = useLocation();
    const basePath = location.pathname.split('/').slice(0, -1).join('/');
    const pathExcludingLastTwo = location.pathname.split('/').slice(0, -2).join('/');

    const handleSelectedLinkChange = (e: any) => {
        const selected = e.target.value;
        navigate(`${basePath}/${selected}`)
    }

    const getQuiz = async () => {
        console.log("This is the quiz ID: ", eid);
        const thisQuiz = await quizzesClient.getQuizById(eid as string);
        console.log("This is the OLD quiz object (True/False): ", thisQuiz)
        setQuiz(thisQuiz);
    };
    useEffect(() => {
        getQuiz();
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

    //This changes the selected option to the current selected option (MC/True or False/Fill in the Blank)
    useEffect(() => {
        // Extract the current editor type from the path (This is the location at the end of the link)
        const editorType = location.pathname.split("/").pop();

        // Update quiz.type based on the current link received from above
        setQuiz((prev: any) => ({ ...prev, type: editorType }));
    }, [location]);

    console.log("This is the quiz object that will have its True/False Questions edited: ", quiz);
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
                            value={"TrueFalseEditor"}
                            onChange={(e) => {
                                // setQuiz({ ...quiz, type: e.target.value });
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
                    <div className="col-auto text-start">
                        <input
                            className="form-check-input me-2"
                            type="radio"
                            name="answers"
                            id="true"
                            value="true"
                        />
                        <label>True</label>
                    </div>
                </div>
                <div className="row d-flex align-items-center mb-4">
                    <div className="col-auto text-start">
                        <input
                            className="form-check-input me-2"
                            type="radio"
                            name="answers"
                            id="false"
                            value="false"
                        />
                        <label>False</label>
                    </div>
                </div>

                <br />

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