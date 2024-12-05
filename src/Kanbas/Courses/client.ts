import axios from "axios";
import {USERS_API} from "../Account/client";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const createCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(COURSES_API, course);
    return data;
};


export const createAssignmentsForCourse = async (courseId: string, assignment: any) => {
    const response = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/assignments`,
        assignment
    );
    return response.data;
};


export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
    return response.data;
};

export const createQuizzesForCourse = async (courseId: string, quiz: any) => {
    const response = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/quizzes`,
        quiz
    );
    return response.data;
};


export const findQuizzesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
    const response = await axiosWithCredentials.post(
        `${COURSES_API}/${courseId}/modules`,
        module
    );
    return response.data;
};


export const findModulesForCourse = async (courseId: string) => {
    const response = await axiosWithCredentials
        .get(`${COURSES_API}/${courseId}/modules`);
    return response.data;
};

export const getCourseById = async (courseId: string) => {
    const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}`);
    return response.data;
}


export const getAllCourses = async () => {
    const { data } = await axiosWithCredentials.get(COURSES_API);
    return data;
};

export const deleteCourse = async (id: string) => {
    const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
    return data;
};

export const updateCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
    return data;
};

export const fetchAllCourses = async () => {
    const { data } = await axiosWithCredentials.get(COURSES_API);
    return data;
};

export const findUsersForCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/users`);
    return response.data;
};

