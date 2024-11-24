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
            const newAssignment: any = {
                _id: new Date().getTime().toString(),
                title: assignment.title,
                assignDate: assignment.assignDate,
                dueDate: assignment.dueDate,
                points: assignment.points,
                type: assignment.type,
                description: assignment.description,
                course: assignment.course,
            };
            state.assignments = [...state.assignments, newAssignment] as any;
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