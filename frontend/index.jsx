import ReactDOM from 'react-dom';
import routes from './components/Router';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(routes, root);
});
