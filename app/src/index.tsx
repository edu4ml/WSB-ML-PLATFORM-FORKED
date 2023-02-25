import './styles/index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider as ReduxProvider } from 'react-redux';

import configureAppStore, { getPreloadedState } from './store/configureStore';

import AppContextProvider from './contexts/AppContextProvider';

import { LoginPage } from './pages';

const logInUser = (username: string, password: string) => {
    console.log(username, password);
}

(async () => {
    const preloadedState = getPreloadedState();

    const root = createRoot(document.getElementById('root'));

    root.render(
        <React.StrictMode>
            <ReduxProvider store={configureAppStore(preloadedState)}>
                <AppContextProvider>
                    <LoginPage onLogin={logInUser}/>
                </AppContextProvider>
            </ReduxProvider>
        </React.StrictMode>
    );
})();
