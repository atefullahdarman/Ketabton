import React,{useEffect,useState} from 'react';
import {NavLink,Link,useNavigate,useLocation} from 'react-router-dom';
import {Search,Heart,Menu,X,ArrowRight,Sun,Moon,BookOpenText,LayoutDashboard,UserRound,Instagram} from 'lucide-react';
import {useLibrary} from '../context/LibraryContext';
const nav=[['/','Home'],['/catalog','Catalog'],['/pashto','پښتو کتابونه'],['/categories','Categories'],['/collections','Collections'],['/dashboard','Dashboard'],['/about','Portfolio'],['/certificates','Certificates'],['/contact','Contact']];
export default function Header(){
 const {favorites,theme,setTheme}=useLibrary(); const [menu,setMenu]=useState(false);const [searchOpen,setSearchOpen]=useState(false);const [query,setQuery]=useState('');const navigate=useNavigate();const location=useLocation();
 useEffect(()=>{setMenu(false);setSearchOpen(false);},[location.pathname]);
 useEffect(()=>{document.body.style.overflow=menu?'hidden':'';return()=>{document.body.style.overflow='';};},[menu]);
 const onSearch=e=>{e.preventDefault();navigate(`/catalog?search=${encodeURIComponent(query.trim())}`);setSearchOpen(false);setMenu(false);};
 return <>
   <div className="announcement"><span className="announcement-dot"/> A little space for big stories <span className="announcement-separator">·</span> Discover public-domain classics <ArrowRight size={12}/></div>
   <header className="site-header"><div className="site-container header-content">
     <Link to="/" className="brand" aria-label="Emerald Library home"><span className="brand-mark"><BookOpenText size={24} strokeWidth={1.8}/></span><span className="brand-text">I <span className="brand-heart">♡</span> Book<small>EMERALD LIBRARY</small></span></Link>
     <nav className="desktop-nav" aria-label="Primary navigation">{nav.map(([href,label])=><NavLink key={href} to={href} end={href==='/'} className={({isActive})=>isActive?'nav-link active':'nav-link'}>{label}</NavLink>)}</nav>
     <div className="header-actions">
       <button className="icon-btn desktop-action" aria-label="Search books" onClick={()=>setSearchOpen(true)}><Search size={21}/></button>
       <button className="icon-btn theme-toggle" aria-label="Toggle dark mode" onClick={()=>setTheme(theme==='light'?'dark':'light')}>{theme==='light'?<Moon size={19}/>:<Sun size={19}/>}</button>
       <Link to="/favorites" className="icon-btn favorite-nav" aria-label="Favorites"><Heart size={21}/>{favorites.length>0&&<span className="favorite-count">{favorites.length}</span>}</Link>
       <Link to="/about" className="avatar-btn" aria-label="Developer profile"><img src={`${import.meta.env.BASE_URL}images/developer.webp`} alt="Developer"/></Link>
       <button className="icon-btn mobile-menu-btn" aria-label="Open navigation" onClick={()=>setMenu(true)}><Menu size={25}/></button>
     </div>
   </div></header>
   {searchOpen&&<div className="modal-backdrop" onClick={()=>setSearchOpen(false)}><form onClick={e=>e.stopPropagation()} onSubmit={onSearch} className="search-modal" role="search"><div className="search-modal-head"><strong>Find your next favorite read</strong><button className="icon-btn" onClick={()=>setSearchOpen(false)} type="button" aria-label="Close search"><X size={20}/></button></div><div className="search-field large"><Search size={22}/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search a title or author..."/><button type="submit" aria-label="Search"><ArrowRight size={20}/></button></div><small>Try: Jane Austen, Sherlock Holmes, adventure...</small></form></div>}
   {menu&&<div className="mobile-overlay" onClick={()=>setMenu(false)}><aside className="mobile-drawer" onClick={e=>e.stopPropagation()} aria-label="Mobile navigation"><div className="drawer-top"><span className="drawer-logo">I ♡ Book</span><button className="icon-btn" onClick={()=>setMenu(false)} aria-label="Close menu"><X/></button></div><form onSubmit={onSearch} className="search-field"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search books..."/><button aria-label="Search books"><ArrowRight size={18}/></button></form><nav>{nav.map(([href,label])=><NavLink key={href} to={href} end={href==='/'} className={({isActive})=>isActive?'drawer-link active':'drawer-link'}>{label}<ArrowRight size={17}/></NavLink>)}<NavLink className="drawer-link" to="/favorites">Favorites <Heart size={17}/></NavLink></nav><button className="drawer-theme-button" onClick={()=>setTheme(theme==='light'?'dark':'light')}>{theme==='light'?<Moon size={18}/>:<Sun size={18}/>} Switch to {theme==='light'?'dark':'light'} mode</button><div className="drawer-note">A better world, one page at a time.</div></aside></div>}
 </>;
}
