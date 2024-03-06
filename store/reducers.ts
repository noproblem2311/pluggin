import { combineReducers } from "redux";
import recordReducer from "./slices/record";

const reducer = combineReducers({
  record: recordReducer,
});

export default reducer;
