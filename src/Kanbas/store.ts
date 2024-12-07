import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentReducer from "./Courses/Assignments/reducer"
import accountReducer from "./Account/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer"
import questionsReducer from "./Courses/Quizzes/Questions/questionsReducer";

const store = configureStore({
    reducer: {
        modulesReducer,
        accountReducer,
        assignmentReducer,
        quizzesReducer,
        questionsReducer,
    },
});
export default store;