import React, { useState } from "react";
import { Link } from "react-router-dom";
import rocketPropulsion from "../../public/images/rocketPropulsion.jpg";
import aero from "../../public/images/aero.jpg";
import spacecraftDesign from "../../public/images/spacecraft_design.jpg";
import orgo from "../../public/images/orgo.jpg";
import inorganicChemistry from "../../public/images/Inorganic-Chemistry.png";
import physChemistry from "../../public/images/physchem.png";
import ancientLang from "../../public/images/ancient-lang.jpeg";
import { useSelector } from "react-redux";
import * as db from "../Database";
export default function Dashboard(
    { courses, course, setCourse, addNewCourse,
        deleteCourse, updateCourse }: {
        courses: any[]; course: any; setCourse: (course: any) => void;
        addNewCourse: () => void; deleteCourse: (course: any) => void;
        updateCourse: () => void; }) {
    const images = [rocketPropulsion, aero, spacecraftDesign, orgo, inorganicChemistry, physChemistry, ancientLang]
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = db;
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
                <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
                <div id="wd-dashboard-courses" className="row">
                    <div className="p-4" id="wd-dashboard">
                        <h5>
                            New Course
                            <button className="btn btn-primary float-end"
                                    onClick={addNewCourse} id="wd-add-new-course-click">
                                Add
                            </button>
                            <button className="btn btn-warning float-end me-2"
                                    onClick={updateCourse} id="wd-update-course-click">
                                Update
                            </button>
                        </h5>
                        <br />
                        <input defaultValue={course.name} className="form-control mb-2"
                           onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
                        <textarea defaultValue={course.description} className="form-control"
                           onChange={(e) => setCourse({ ...course, description: e.target.value }) }/>
                        <hr />
                    </div>

                        <div className="row row-cols-1 row-cols-md-5 g-4">
                        {courses
                            .filter((course) =>
                                enrollments.some(
                                    (enrollment) =>
                                        enrollment.user === currentUser._id &&
                                        enrollment.course === course._id
                                ))

                            .map((course, i) => (
                            <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                                <div className="card rounded-3 overflow-hidden">
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`}
                                          className="wd-dashboard-course-link text-decoration-none text-dark" >
                                        <img src={images[i]} width="100%" height={160} />
                                        <div className="card-body">
                                            <h5 className="wd-dashboard-course-title card-title">
                                                {course.name} </h5>
                                            <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                                                {course.description} </p>

                                            {/* The Go Button */}
                                            <button className="btn btn-primary mb-4 float-start"> Go </button>

                                            {/* The Edit Button */}
                                            <button id="wd-edit-course-click"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        setCourse(course);
                                                    }}
                                                    className="btn btn-warning ms-5" >
                                                Edit
                                            </button>

                                            {/* The Delete Button */}
                                            <button onClick={(event) => {
                                                event.preventDefault();
                                                deleteCourse(course._id);
                                            }} className="btn btn-danger mb-4 float-end"
                                                    id="wd-delete-course-click">
                                                Delete
                                            </button>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            );}