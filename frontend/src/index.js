import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider clientId="797542642345-q6uivdpghknfu9bo29tke693em4hp23s.apps.googleusercontent.com">
        <React.StrictMode>
            <Provider store={store}>
                <ConfigProvider
                    theme={{
                        token: {
                            borderRadius: 18,
                        },
                    }}
                >
                    <App />
                </ConfigProvider>
            </Provider>
        </React.StrictMode>
    </GoogleOAuthProvider>
);
