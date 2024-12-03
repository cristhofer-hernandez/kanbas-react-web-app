import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;


export const findAllUsers = async () => {
    const response = await axiosWithCredentials.get(USERS_API);
    return response.data;
};


export const findMyCourses = async (user: any) => {
    const { data } = await axiosWithCredentials.get(`${USERS_API}/${user._id}/courses`);
    return data;
};



export const createCourse = async (userId: any, course: any) => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/${userId}/create/courses`, course);
    console.log(data);
    return data;
};

export const enrollUserInCourse = async (userId: any, courseId: any) => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/${userId}/enroll`, courseId);
    return data;
};


export const unenrollUserInCourse = async (userId: any, courseId: any) => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/${userId}/unenroll`, courseId);
    return data;
};


export const signin = async (credentials: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
    return response.data;
};
export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    console.log("Hello");
    return response.data;
};
export const signup = async (user: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
};
export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
};
export const updateUser = async (user: any) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};

export const findUsersByRole = async (role: string) => {
    const response = await
        axios.get(`${USERS_API}?role=${role}`);
    return response.data;
};

export const findUsersByPartialName = async (name: string) => {
    const response = await axios.get(`${USERS_API}?name=${name}`);
    return response.data;
};

export const findUserById = async (id: string) => {
    const response = await axios.get(`${USERS_API}/${id}`);
    return response.data;
};




