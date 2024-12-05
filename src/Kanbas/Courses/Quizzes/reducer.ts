import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    quizzes: [],
};

const quizSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },

        addQuizzes: (state, { payload: quiz }) => {
            const newQuiz: any = {
                _id: new Date().getTime().toString(),
                name: quiz.name,
                type: quiz.type,
                group: "QUIZZES",
                shuffle: quiz.shuffle,
                timed: quiz.timed,
                minutes: quiz.minutes,
                multiple_attempts: quiz.multiple_attempts,
                attempts_allowed: quiz.attempts_allowed,
                due_date: quiz.due_date,
                assign_to: quiz.assign_to,
                available_date: quiz.available_date,
                until_date: quiz.until_date,
                points: quiz.points,
                show_correct_answers: quiz.show_correct_answers,
                one_question_at_a_time: quiz.one_question_at_a_time,
                lock_questions: quiz.lock_questions,
                webcam_required: quiz.webcam_required,
                access_code: quiz.access_code,
                course: quiz.course,
                description: quiz.description,
                questions: quiz.questions,
            };
            state.quizzes = [...state.quizzes, newQuiz] as any;
        },
        deleteQuizzes: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.filter(
                (q: any) => q._id !== quizId);
        },
        updateQuizzes: (state, { payload: quiz }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                q._id === quiz._id ? quiz : q
            ) as any;
        },
        editQuizzes: (state, { payload: quizId }) => {
            state.quizzes = state.quizzes.map((q: any) =>
                    q._id === quizId ? { ...q, editing: true } : q
            ) as any;
        },
    },
});
export const { addQuizzes, deleteQuizzes, updateQuizzes, editQuizzes, setQuizzes } =
    quizSlice.actions;
export default quizSlice.reducer;