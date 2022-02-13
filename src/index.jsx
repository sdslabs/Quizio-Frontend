import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { store, persistor } from '@store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <App />
                    <ReactQueryDevtools initialIsOpen={false} />
                </Router>
            </QueryClientProvider>
        </PersistGate>
    </Provider>,
  document.getElementById('root'),
);
