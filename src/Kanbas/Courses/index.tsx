import { Route, Routes, Navigate, useParams, useLocation } from "react-router";
import CoursesNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/AssignmentEditor";
import PeopleTable from "./People/Table";
import { FaAlignJustify } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";
import Details from "./Quizzes/Details";
import QuestionEditor from "./Quizzes/Questions/QuestionEditor";
import MultipleChoiceEditor from "./Quizzes/Questions/MultipleChoiceEditor"
import TrueFalseEditor from "./Quizzes/Questions/TrueFalseEditor"
import FillInTheBlankEditor from "./Quizzes/Questions/FillInTheBlankEditor"
import People from "./People/People";
import QuizPreview from "./Quizzes/Preview"
import Users from "../Account/Users";
import QuizSubmission from "./Quizzes/Submission";
import Result from "./Quizzes/Result"

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id == cid);
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const [assignmentName, setAssignmentName] = useState("");
    return (
        <div id="wd-courses">
            <h2 className="text-danger text-start">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]} &gt; {pathname.split("/")[6]}
            </h2>
            <hr></hr>
            <div className="d-flex">
                <div className="d-none d-md-block">
                <CoursesNavigation />
                </div>
                <div className="flex-fill">
                        <Routes>
                            <Route path="/" element={<Navigate to="Home" />} />
                            <Route path="Home" element={<Home />} />
                            <Route path="Modules" element={<Modules />} />
                            <Route path="Assignments" element={<Assignments />} />
                            <Route path="Assignments/:aid" element={<AssignmentEditor />}/>
                            <Route path="Assignments/:aid/Updater" element={<AssignmentEditor />}/>
                            <Route path="Quizzes" element={<Quizzes />} />
                            <Route path="Quizzes/:eid/Adder" element={<Details />}/>
                            <Route path="Quizzes/:eid/Updater" element={<Details />}/>
                            <Route path="Quizzes/:eid/Adder/Adding" element={<QuizEditor />}/>
                            <Route path="Quizzes/:eid/Updater/Updating" element={<QuizEditor />}/>
                            <Route path="Quizzes/:eid/Updater/QuestionEditor" element={<QuestionEditor />}/>
                            <Route path="Quizzes/:eid/Adder/QuestionEditor" element={<QuestionEditor />}/>
                            <Route path="Quizzes/:eid/Updater/QuestionEditor/MultipleChoice" element={<MultipleChoiceEditor />}/>
                            <Route path="Quizzes/:eid/Updater/QuestionEditor/:q_num/MultipleChoice" element={<MultipleChoiceEditor />}/>
                            <Route path="Quizzes/:eid/Adder/QuestionEditor/MultipleChoice" element={<MultipleChoiceEditor />}/>
                            <Route path="Quizzes/:eid/Adder/QuestionEditor/:q_num/MultipleChoice" element={<MultipleChoiceEditor />}/>

                            <Route path="Quizzes/:eid/Updater/QuestionEditor/TrueFalse" element={<TrueFalseEditor />}/>
                            <Route path="Quizzes/:eid/Updater/QuestionEditor/:q_num/TrueFalse" element={<TrueFalseEditor />}/>
                            <Route path="Quizzes/:eid/Adder/QuestionEditor/TrueFalse" element={<TrueFalseEditor />}/>
                            <Route path="Quizzes/:eid/Adder/QuestionEditor/:q_num/TrueFalse" element={<TrueFalseEditor />}/>

                            <Route path="Quizzes/:eid/Updater/QuestionEditor/FillInTheBlank" element={<FillInTheBlankEditor />}/>
                            <Route path="Quizzes/:eid/Updater/QuestionEditor/:q_num/FillInTheBlank" element={<FillInTheBlankEditor />}/>
                            <Route path="Quizzes/:eid/Adder/QuestionEditor/FillInTheBlank" element={<FillInTheBlankEditor />}/>
                            <Route path="Quizzes/:eid/Adder/QuestionEditor/:q_num/FillInTheBlank" element={<FillInTheBlankEditor />}/>
                            <Route path="People" element={<People />} />
                            <Route path="People/:uid" element={<People />} />
                            <Route path="Quizzes/:eid/Updater/:qid" element={<QuizPreview />}/>
                            <Route path="Quizzes/:eid/Updater/Results/:qid" element={<QuizPreview />}/>
                            <Route path="Quizzes/:eid/Adder/:qid" element={<QuizPreview />}/>
                            <Route path="Quizzes/:eid/Adder/Results/:qid" element={<QuizPreview />}/>
                            <Route path="Quizzes/:eid/Results/:qid" element={<QuizPreview />}/>
                            <Route path="Quizzes/:eid/Updater/Submission" element={<QuizSubmission />}/>
                            <Route path="Quizzes/:eid/Adder/Submission" element={<QuizSubmission />}/>
                            <Route path="Quizzes/:eid/Results" element={<Result />}/>
                            <Route path="Quizzes/:eid/Updater/Results" element={<Result />}/>
                            <Route path="Quizzes/:eid/Adder/Results" element={<Result />}/>
                        </Routes>
                </div>
            </div>
        </div>
    );
}
