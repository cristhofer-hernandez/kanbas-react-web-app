import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import rocketPropulsion from "../../public/images/rocketPropulsion.jpg";
import aero from "../../public/images/aero.jpg";
import spacecraftDesign from "../../public/images/spacecraft_design.jpg";
import orgo from "../../public/images/orgo.jpg";
import inorganicChemistry from "../../public/images/Inorganic-Chemistry.png";
import physChemistry from "../../public/images/physchem.png";
import ancientLang from "../../public/images/ancient-lang.jpeg";
import { useSelector, useDispatch } from "react-redux";
import * as userClient from "../Account/client";
import * as coursesClient from "../Courses/client";
import {setCurrentUser} from "../Account/reducer";
import {updateUser} from "../Account/client";

export default function Dashboard(
    { courses, course, setCourse, setCourses, addNewCourse,
        deleteCourse, updateCourse }: {
        courses: any[]; course: any; setCourse: (course: any) => void;
        setCourses: (courses: any[]) => void; addNewCourse: () => void;
        deleteCourse: (course: any) => void; updateCourse: () => void; }) {
    const images = [rocketPropulsion, aero, spacecraftDesign, orgo, inorganicChemistry, physChemistry, ancientLang]

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const [enrollmentMode, setEnrollmentMode] = useState(false);
    const [allCourses, setAllCourses] = useState<any[]>([]);
    const dispatch = useDispatch();

    const fetchAllCourses = async () => {
        try {
            const allCourses = await coursesClient.getAllCourses();
            setAllCourses(allCourses);
            console.log(allCourses);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllCourses();
    }, []);

    const enrollUser = async (userId: string, courseId: string) => {
        try {
            console.log(courseId);
            const courses = await userClient.enrollUserInCourse(userId, { courseId } );
            console.log(courses)
            setCourses(courses);
        }
        catch (error) {
            console.error("Error enrolling user:", error);
        }
    };

    const unenrollUser = async (userId: string, courseId: string) => {
        try {
            console.log(courseId);
            const courses = await userClient.unenrollUserInCourse(userId, { courseId } );
            console.log(courses)
            setCourses(courses);
        }
        catch (error) {
            console.error("Error enrolling user:", error);
        }
    };

    const unenrolledCourses = allCourses.filter(
        (course) => !courses.some((enrolledCourse) => enrolledCourse._id === course._id)
    );

    return (
            <div id="wd-dashboard">
                <div className="row align-items-center">
                    <div className="col d-flex justify-content-center ms-5">
                        <h1 id="wd-dashboard-title">Dashboard</h1>
                    </div>
                    {(currentUser.role === "STUDENT") && (
                        <div className="col-auto">
                            <button
                                id="wd-edit-course-click"
                                onClick={(event) => {
                                    event.preventDefault();
                                    // setCourse(course);
                                    setEnrollmentMode((prevMode) => !prevMode);
                                }}
                                className={`btn ${enrollmentMode ? "btn-success" : "btn-primary"}`}>
                            Enrollments
                        </button>
                    </div>
                    )}
            </div>
            <hr/>
            <div id="wd-dashboard-courses" className="row align-items-center justify-content-center ms-5">
                <h2 id="wd-dashboard-published ">Published Courses ({courses.length})</h2>
            </div>
            <hr/>
            <div id="wd-dashboard-courses" className="row">
            {(currentUser.role === "FACULTY") && (
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
                    <br/>
                    <input defaultValue={course.name} className="form-control mb-2"
                           onChange={(e) => setCourse({...course, name: e.target.value})}/>
                    <textarea defaultValue={course.description} className="form-control"
                              onChange={(e) => setCourse({...course, description: e.target.value})}/>
                    <hr/>
                </div>
                )}

                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {courses
                        .map((course, i) => (
                            <div className="wd-dashboard-course col" style={{width: "300px"}}>
                                <div className="card rounded-3 overflow-hidden">
                                    <Link to={`/Kanbas/Courses/${course._id}/Home`}
                                          className="wd-dashboard-course-link text-decoration-none text-dark">
                                        <img src={images[i]} width="100%" height={160}/>
                                        <div className="card-body">
                                            <h5 className="wd-dashboard-course-title card-title">
                                                {course.name} </h5>
                                            <p className="wd-dashboard-course-title card-text overflow-y-hidden"
                                               style={{maxHeight: 100}}>
                                                {course.description} </p>

                                            {/* The Go Button */}
                                            {!enrollmentMode &&
                                            <button className="btn btn-primary mb-4 float-start"> Go</button> }

                                            {/* The Edit Button */}
                                            {!enrollmentMode && (currentUser.role === "FACULTY") && (
                                                <button id="wd-edit-course-click"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            setCourse(course);
                                                        }}
                                                        className="btn btn-warning ms-5">
                                                    Edit
                                                </button>
                                            )}

                                            {!enrollmentMode && (currentUser.role === "FACULTY") && (
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    deleteCourse(course._id);
                                                }} className="btn btn-danger mb-4 float-end"
                                                        id="wd-delete-course-click">
                                                    Delete
                                                </button>
                                            )}

                                            {enrollmentMode && (
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    unenrollUser(currentUser._id, course._id);
                                                }} className="btn btn-danger float-center"
                                                        id="wd-delete-course-click">
                                                    Unenroll
                                                </button>
                                            )}

                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}

                    {enrollmentMode && Array.isArray(unenrolledCourses) &&
                        unenrolledCourses
                            .map((course, i) => (
                                <div className="wd-dashboard-course col" style={{width: "300px"}}>
                                    <div className="card rounded-3 overflow-hidden">
                                        <Link to={`/Kanbas/Courses/${course._id}/Home`}
                                              className="wd-dashboard-course-link text-decoration-none text-dark">
                                            <img src={images[i]} width="100%" height={160}/>
                                            <div className="card-body">
                                                <h5 className="wd-dashboard-course-title card-title">
                                                    {course.name} </h5>
                                                <p className="wd-dashboard-course-title card-text overflow-y-hidden"
                                                   style={{maxHeight: 100}}>
                                                    {course.description} </p>

                                                <button id="wd-edit-course-click"
                                                        onClick={(event) => {
                                                            event.preventDefault();
                                                            enrollUser(currentUser._id, course._id);
                                                        }}
                                                        className="btn btn-success float-center">
                                                    Enroll
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