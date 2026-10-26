import React from 'react';import {createRoot} from 'react-dom/client';import App from './App.jsx';import './index.css';
const m=matchMedia('(prefers-color-scheme: dark)'),f=()=>document.documentElement.classList.toggle('dark',m.matches);f();m.addEventListener('change',f);
createRoot(document.getElementById('root')).render(<App/>);
