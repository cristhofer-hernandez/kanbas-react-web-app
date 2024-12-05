import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    assignments: [],
};

const assignmentSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state, action) => {
            state.assignments = action.payload;
        },

        addAssignments: (state, { payload: assignment }) => {
            state.assignments = [...state.assignments, assignment] as any;
        },
        deleteAssignments: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (a: any) => a._id !== assignmentId);
        },
        updateAssignment: (state, { payload: assignment }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === assignment._id ? assignment : a
            ) as any;
        },
        editAssignment: (state, { payload: assignmentId }) => {
            state.assignments = state.assignments.map((a: any) =>
                a._id === assignmentId ? { ...a, editing: true } : a
            ) as any;
        },
    },
});
export const { addAssignments, deleteAssignments, updateAssignment, editAssignment, setAssignments } =
    assignmentSlice.actions;
export default assignmentSlice.reducer;