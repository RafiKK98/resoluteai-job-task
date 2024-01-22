import {configureStore} from "@reduxjs/toolkit"
import userSlice from "../feature/userSlice"
import taskSlice from "../feature/taskSlice"
export default configureStore({
    reducer: {
        user : userSlice,
        task : taskSlice
    },
})
