// import { createSlice } from '@reduxjs/toolkit';

// interface authState {
//     userInfo: Object;
//     isAuthenticated: any;
// }
// const initialState = {
//     userInfo: {},
//     isAuthenticated: false,
// } as authState;

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         logout: (state) => {
//             (state.userInfo = {}), (state.isAuthenticated = false);
//         },
//         setCredentials: (state, { payload }) => {
//             state.userInfo = payload;
//             state.isAuthenticated = true;
//         },
//         setIsAuthenticated: (state, { payload }) => {
//             console.log('setting state to: ', payload);
//             state.isAuthenticated = payload;
//         },
//     },
// });

// export const { setIsAuthenticated, setCredentials, logout } = authSlice.actions;
// export default authSlice.reducer;
