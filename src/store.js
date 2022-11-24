import { configureStore } from "@reduxjs/toolkit";

import authReucer from './slices/auth';
import messageReducer from './slices/message';
const reducer={
    auth: authReucer,
    message: messageReducer
}
const store=configureStore({
    reducer: reducer,
    devTools:true,
})
export default store;