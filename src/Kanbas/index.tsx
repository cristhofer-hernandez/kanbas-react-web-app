import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import KanbasNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";

export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
    });
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    //////////////
    const [enrolling, setEnrolling] = useState<boolean>(false);
    const findCoursesForUser = async () => {
        try {
            const courses = await userClient.findCoursesForUser(currentUser._id);
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };
    const fetchCourses = async () => {
        try {
            const allCourses = await courseClient.fetchAllCourses();
            const enrolledCourses = await userClient.findCoursesForUser(
                currentUser._id
            );
            const courses = allCourses.map((course: any) => {
                if (enrolledCourses.find((c: any) => c._id === course._id)) {
                    return { ...course, enrolled: true };
                } else {
                    return course;
                }
            });
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (enrolling) {
            fetchCourses();
        } else {
            findCoursesForUser();
        }
    }, [currentUser, enrolling]);

    const updateEnrollment = async (courseId: string, enrolled: boolean) => {
        if (enrolled) {
            await userClient.enrollIntoCourse(currentUser._id, courseId);
        } else {
            await userClient.unenrollFromCourse(currentUser._id, courseId);
        }
        setCourses(
            courses.map((course) => {
                if (course._id === courseId) {
                    return { ...course, enrolled: enrolled };
                } else {
                    return course;
                }
            })
        );
    };

////////////////////
    // const fetchCourses = async () => {
    //     try {
    //         const courses = await courseClient.fetchAllCourses();
    //         console.log("This is the current user using cookies", currentUser)
    //         setCourses(courses);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     fetchCourses();
    // }, [currentUser]);

    const deleteCourse = async (courseId: string) => {
        try {
            await courseClient.deleteCourse(courseId);
            setCourses(courses.filter((course) => course._id !== courseId));
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    const addNewCourse = async () => {
        const newCourse = await courseClient.createCourse(course);
        setCourses([...courses, newCourse]);
    };


    const updateCourse = async () => {
        try {
            await courseClient.updateCourse(course);
            setCourses(
                courses.map((c) => (c._id === course._id ? course : c))
            );
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    return (
        // <Session>
            <div id="wd-kanbas">
                <KanbasNavigation />
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Dashboard" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route
                            path="/Dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard
                                        courses={courses}
                                        course={course}
                                        setCourse={setCourse}
                                        setCourses={setCourses}
                                        addNewCourse={addNewCourse}
                                        deleteCourse={deleteCourse}
                                        updateCourse={updateCourse}
                                        enrolling={enrolling}
                                        setEnrolling={setEnrolling}
                                        updateEnrollment={updateEnrollment}
                                    />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/Courses/:cid/*"
                            element={
                                <ProtectedRoute>
                                    <Courses courses={courses} />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
            </div>
        // </Session>
    );
}

