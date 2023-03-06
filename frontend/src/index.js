import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { ConfigProvider, theme } from 'antd';

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider
                theme={{
                    // algorithm: theme.darkAlgorithm,
                    token: {
                        borderRadius: 18,
                    },
                }}
            >
                <App />
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
);
