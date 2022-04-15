import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

reportWebVitals();
