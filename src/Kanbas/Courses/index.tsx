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
import AssignmentAdd from "./Assignments/AssignmentAdder";
import {addAssignment} from "./Assignments/reducer";


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
                {course && course.name} &gt; {pathname.split("/")[4]}
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
                            {/*<Route path="Assignments/:aid" element={*/}
                            {/*    <AssignmentEditor*/}
                            {/*        assignmentName={""}*/}
                            {/*        setAssignmentName={(title: string) => {}}*/}
                            {/*        assignmentAssignDate={""}*/}
                            {/*        setAssignmentAssignDate={(title: string) => {}}*/}
                            {/*        assignmentDueDate={""}*/}
                            {/*        setAssignmentDueDate={(title: string) => {}}*/}
                            {/*        assignmentPoints={""}*/}
                            {/*        setAssignmentPoints={(title: string) => {}}*/}
                            {/*        assignmentType={""}*/}
                            {/*        setAssignmentType={(title: string) => {}}*/}
                            {/*        assignmentDescription={""}*/}
                            {/*        setAssignmentDescription={(title: string) => {}}*/}

                            {/*        addAssignment={() => {*/}
                            {/*            dispatch(addAssignment({name: assignmentName, course: ""}));*/}
                            {/*            setAssignmentName("");*/}
                            {/*        }}/>} />*/}
                            <Route path="People" element={<PeopleTable />} />
                        </Routes>
                </div>
            </div>
        </div>
    );
}
