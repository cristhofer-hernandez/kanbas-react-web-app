import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const RESULTS_API = `${REMOTE_SERVER}/api/results`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const updateResult = async (result: any) => {
    const { data } = await axiosWithCredentials.put(`${RESULTS_API}/${result._id}`, result);
    return data;
};

export const getResultById = async (resultId: string) => {
    const response = await axiosWithCredentials.get(`${RESULTS_API}/${resultId}`);
    return response.data;
}


export const deleteResults = async (resultId: string) => {
    const response = await axiosWithCredentials.delete(`${RESULTS_API}/${resultId}`);
    return response.data;
};



