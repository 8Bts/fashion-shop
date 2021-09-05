import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/common.css';
import App from './components/App';
import DesktopPage from './components/DesktopPage';
import store from './redux/store';

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

ReactDOM.render((vw <= 768) ? (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
) : <DesktopPage />,
document.getElementById('root'));
