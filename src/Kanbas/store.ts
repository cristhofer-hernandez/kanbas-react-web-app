import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import assignmentReducer from "./Courses/Assignments/reducer"
import accountReducer from "./Account/reducer";
const store = configureStore({
    reducer: {
        modulesReducer,
        accountReducer,
        assignmentReducer,
    },
});
export default store;