import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentReducer from "./Courses/Assignments/reducer"
import accountReducer from "./Account/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer"
import questionsReducer from "./Courses/Quizzes/Questions/questionsReducer";
import resultsReducer from "./Courses/Quizzes/resultsReducer";

const store = configureStore({
    reducer: {
        modulesReducer,
        accountReducer,
        assignmentReducer,
        quizzesReducer,
        questionsReducer,
        resultsReducer
    },
});
export default store;