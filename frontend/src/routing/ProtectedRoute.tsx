import { useAppSelector } from '../hooks';
// import { NavLink, Outlet } from 'react-router-dom'
// import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

const ProtectedRoute = () => {
    const data = useAppSelector((state) => state.auth);

    console.log(data);

    // if (!data) {
    //     return <div></div>;
    // }
};
