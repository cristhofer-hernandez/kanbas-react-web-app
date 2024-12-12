import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    result: [],
};

const resultSlice = createSlice({
    name: "results",
    initialState,
    reducers: {
        setResult: (state, action) => {
            state.result = action.payload;
        },

        addResult: (state, { payload: result }) => {
            const newResult: any = {
                attempts_taken: result.attempts_taken,
                points: result.points,
                quiz: result.quiz,
                user: result.user,
                questions: result.questions
            };
            state.result = [...state.result, newResult] as any;
        },
        deleteResult: (state, { payload: resultId }) => {
            state.result = state.result.filter(
                (r: any) => r._id !== resultId);
        },
        updateResult: (state, { payload: result }) => {
            state.result = state.result.map((r: any) =>
                r._id === result._id ? result : r
            ) as any;
        },
        editResult: (state, { payload: resultId }) => {
            state.result = state.result.map((r: any) =>
                r._id === resultId ? { ...r, editing: true } : r
            ) as any;
        },
    },
});
export const { addResult, deleteResult, updateResult, editResult, setResult } =
    resultSlice.actions;
export default resultSlice.reducer;