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
import QuestionEditor from "./Quizzes/QuestionEditor";
import MultipleChoiceEditor from "./Quizzes/MultipleChoiceEditor"
import TrueFalseEditor from "./Quizzes/TrueFalseEditor"
import FillInTheBlankEditor from "./Quizzes/FillInTheBlankEditor"

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
                            <Route path="Quizzes" element={<Quizzes />} />
                            <Route path="Quizzes/:eid" element={<Details />}/>
                            <Route path="Quizzes/:eid/Editor" element={<QuizEditor />}/>
                            <Route path="Quizzes/:eid/QuestionEditor" element={<QuestionEditor />}/>
                            <Route path="Quizzes/:eid/QuestionEditor/MultipleChoiceEditor" element={<MultipleChoiceEditor />}/>
                            <Route path="Quizzes/:eid/QuestionEditor/TrueFalseEditor" element={<TrueFalseEditor />}/>
                            <Route path="Quizzes/:eid/QuestionEditor/FillInTheBlankEditor" element={<FillInTheBlankEditor />}/>
                            <Route path="People" element={<PeopleTable />} />
                        </Routes>
                </div>
            </div>
        </div>
    );
}
