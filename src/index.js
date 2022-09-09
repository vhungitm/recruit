import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import store from './app/store';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<Provider store={store}>
		<App />
		<ToastContainer
			position="bottom-left"
			theme="dark"
			autoClose={10000}
			hideProgressBar={true}
			newestOnTop={false}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
		/>
	</Provider>,
	document.getElementById('root')
);

reportWebVitals();
