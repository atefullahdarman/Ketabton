import React from 'react';
import {createRoot} from 'react-dom/client';
import {HashRouter} from 'react-router-dom';
import App from './App.jsx';
import {LibraryProvider} from './context/LibraryContext.jsx';
import './styles.css';
import StartupErrorBoundary from './components/StartupErrorBoundary.jsx';

function StartupReady({children}) {
  React.useEffect(()=>{window.__emeraldStarted=true;},[]);
  return children;
}
createRoot(document.getElementById('root')).render(
  <React.StrictMode><StartupErrorBoundary><HashRouter><LibraryProvider><StartupReady><App /></StartupReady></LibraryProvider></HashRouter></StartupErrorBoundary></React.StrictMode>
);
