import React,{useEffect,Suspense,lazy} from 'react';
import {Routes,Route,useLocation,Link} from 'react-router-dom';
import {MessageCircle} from 'lucide-react';
import Header from './components/Header';
import Footer,{CONTACT} from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import PashtoLibrary from './pages/PashtoLibrary';
import Categories from './pages/Categories';
import BookDetails from './pages/BookDetails';
import Favorites from './pages/Favorites';
import Collections from './pages/Collections';
const Dashboard = lazy(() => import('./pages/Dashboard'));
import About from './pages/About';
import Certificates from './pages/Certificates';
import Contact from './pages/Contact';
import Reader from './pages/Reader';
import Help from './pages/Help';
import Privacy from './pages/Privacy';
const pageTitles = {'/':'Digital Library · Pashto & English Books','/catalog':'Book Catalog','/pashto':'پښتو کتابونه · Pashto Library','/categories':'Book Categories','/collections':'Book Collections','/dashboard':'Library Dashboard','/about':'About Atefullah Zafar Zoi · Full-Stack Developer','/portfolio':'Developer Portfolio','/certificates':'Certificates · Atefullah Zafar Zoi','/contact':'Contact Developer','/favorites':'Favorite Books','/help':'Help Center','/privacy':'Privacy & Credits'};
function ScrollRestoration(){const location=useLocation();useEffect(()=>{window.scrollTo(0,0);document.title=`${pageTitles[location.pathname] || (location.pathname.startsWith('/books/')?'Book Details':'Emerald Digital Library')} | Emerald Library`;},[location.pathname]);return null;}
function NotFound(){return <main className="not-found site-container"><span>404 · Page not found</span><h1>This story took a wrong turn.</h1><p>Let's find your way back to the library.</p><Link to="/" className="button button-primary">Go home</Link></main>}
export default function App(){return <div className="app"><ScrollRestoration/><Header/><Routes>
<Route path="/" element={<Home/>}/>
<Route path="/catalog" element={<Catalog/>}/>
<Route path="/pashto" element={<PashtoLibrary/>}/>
<Route path="/categories" element={<Categories/>}/>
<Route path="/categories/:slug" element={<Catalog/>}/>
<Route path="/books/:id" element={<BookDetails/>}/>
<Route path="/read/:id" element={<Reader/>}/>
<Route path="/favorites" element={<Favorites/>}/>
<Route path="/collections" element={<Collections/>}/>
<Route path="/dashboard" element={<Suspense fallback={<main className="site-container" style={{minHeight:300,padding:40}}>Loading dashboard…</main>}><Dashboard/></Suspense>}/>
<Route path="/certificates" element={<Certificates/>}/><Route path="/about" element={<About/>}/><Route path="/portfolio" element={<About/>}/>
<Route path="/contact" element={<Contact/>}/>
<Route path="/help" element={<Help/>}/>
<Route path="/privacy" element={<Privacy/>}/>
<Route path="*" element={<NotFound/>}/>
</Routes><Footer/><a className="floating-whatsapp" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Contact on WhatsApp" title="Chat on WhatsApp"><MessageCircle size={25}/></a></div>}
