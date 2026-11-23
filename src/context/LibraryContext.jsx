import React, {createContext,useCallback,useContext,useEffect,useMemo,useState} from 'react';
import {getBooks} from '../lib/books';
import {demoBooks} from '../data/demoBooks';

const LibraryContext = createContext(null);
const KEY = 'emerald-library-favorites-v1';
const MODE_KEY = 'emerald-library-theme';
const RECENT_KEY = 'emerald-library-recent-v1';
function readStorage(key, fallback) { try {const data = localStorage.getItem(key);return data ? JSON.parse(data) : fallback;} catch {return fallback;} }
export function LibraryProvider({children}) {
  const [favorites,setFavorites] = useState(()=>{const saved=readStorage(KEY,[]);return Array.isArray(saved)?saved:[];});
  const [recent,setRecent] = useState(()=>{const saved=readStorage(RECENT_KEY,[]);return Array.isArray(saved)?saved:[];});
  const [theme,setTheme] = useState(()=>{const saved=readStorage(MODE_KEY,'light');return saved==='dark'?'dark':'light';});
  const [featured,setFeatured] = useState(demoBooks);
  const [liveCount,setLiveCount] = useState(null);
  const [featuredStatus,setFeaturedStatus] = useState('loading');
  useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(favorites));}catch{}},[favorites]);
  useEffect(()=>{try{localStorage.setItem(RECENT_KEY,JSON.stringify(recent));}catch{}},[recent]);
  useEffect(()=>{try{localStorage.setItem(MODE_KEY,JSON.stringify(theme));}catch{};document.documentElement.dataset.theme=theme;},[theme]);
  useEffect(()=>{
    const controller = new AbortController();
    getBooks({page:1,sort:'popular'},controller.signal).then(data=>{
      setFeatured(data.results);setLiveCount(data.count);setFeaturedStatus('live');
    }).catch(err=>{if(err.name!=='AbortError')setFeaturedStatus('demo');});
    return ()=>controller.abort();
  },[]);
  const favoriteIds = useMemo(()=>new Set(favorites.map(x=>String(x.id))),[favorites]);
  const isFavorite = useCallback(id=>favoriteIds.has(String(id)),[favoriteIds]);
  const toggleFavorite = useCallback(book=>setFavorites(old => old.some(x=>String(x.id)===String(book.id)) ? old.filter(x=>String(x.id)!==String(book.id)) : [{...book},...old]),[]);
  const addRecent=useCallback(book=>setRecent(old=>[{...book},...old.filter(x=>String(x.id)!==String(book.id))].slice(0,40)),[]);
  const clearRecent=useCallback(()=>setRecent([]),[]);
  const clearFavorites=useCallback(()=>setFavorites([]),[]);
  return <LibraryContext.Provider value={{favorites,recent,theme,setTheme,featured,liveCount,featuredStatus,isFavorite,toggleFavorite,addRecent,clearRecent,clearFavorites}}>{children}</LibraryContext.Provider>;
}
export const useLibrary=()=>useContext(LibraryContext);
