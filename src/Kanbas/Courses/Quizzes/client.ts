import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const deleteQuiz = async (quizId: string) => {
    const response = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
};

export const getQuizById = async (quizId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
}

export const createResultForQuiz = async (quizId: string, userId: string, result: any) => {
    const response = await axiosWithCredentials.post(
        `${QUIZZES_API}/${quizId}/${userId}/results`,
        result
    );
    return response.data;
};

export const findResultForQuizAndUser = async (quizId: string, userId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/${userId}/results`);
    return response.data;
}


export const findResultForQuiz = async (quizId: string, userId: string) => {
    const response = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/${userId}/results`);
    return response.data;
};


