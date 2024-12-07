import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    questions: [],
};
const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestion: (state, action) => {
            state.questions = action.payload;
        },
        addQuestion: (state, { payload: question }) => {
            const newQuestion: any = {
                _id: new Date().getTime().toString(),
                title: question.title,
                q_type: question.q_type,
                q_points: question.q_points,
                q_description: question.q_description,
                quiz: question.quiz,
                answers: question.answers,
            };
            state.questions = [...state.questions, question] as any;
        },
        deleteQuestion: (state, { payload: questionId }) => {
            state.questions = state.questions.filter(
                (qu: any) => qu._id !== questionId);
        },
        updateQuestion: (state, { payload: question }) => {
            state.questions = state.questions.map((qu: any) =>
                qu._id === question._id ? question : qu
            ) as any;
        },
        editQuestion: (state, { payload: questionId }) => {
            state.questions = state.questions.map((qu: any) =>
                qu._id === questionId ? { ...qu, editing: true } : qu
            ) as any;
        },
    },
});
export const { addQuestion, deleteQuestion, updateQuestion, editQuestion, setQuestion } =
    questionsSlice.actions;
export default questionsSlice.reducer;