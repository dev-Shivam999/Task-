import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    User: true

}
const data = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setList: (state) => {
            state.User = !state.User
        }
    }
})
export const { setList } = data.actions

export default data.reducer