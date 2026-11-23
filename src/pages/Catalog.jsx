import React,{useEffect,useMemo,useState} from 'react';
import {Link,useParams,useSearchParams} from 'react-router-dom';
import {Search,SlidersHorizontal,X,ChevronRight,ChevronLeft,ArrowRight,BookOpen,Filter} from 'lucide-react';
import {PageHeading,EmptyState,OfflineNotice} from '../components/Shared';
import BookCard,{BookCardSkeleton} from '../components/BookCard';
import {categories,categoryBySlug} from '../data/categories';
import {demoBooks} from '../data/demoBooks';
import {pashtoBooks,searchPashtoBooks} from '../data/pashtoBooks';
import {getBooks,languages} from '../lib/books';
const API_PAGE_SIZE=32;
export default function Catalog(){
 const {slug}=useParams();const category=categoryBySlug(slug);const [params,setParams]=useSearchParams();
 const search=params.get('search')||'';const page=Math.max(1,Number(params.get('page'))||1);const language=params.get('lang')||'';const [input,setInput]=useState(search);const [sort,setSort]=useState('popular');const [filtersOpen,setFiltersOpen]=useState(false);
 const [state,setState]=useState({books:[],count:0,status:'loading',isDemo:false});
 useEffect(()=>{setInput(search);},[search]);
 const localOnly=language==='ps'||Boolean(category?.local==='pashto');
 useEffect(()=>{
  const matchingPashto=searchPashtoBooks({search,genre:category?.local==='pashto'?(category?.genre||'all'):'all'});
  if(localOnly){
    setState({books:matchingPashto.slice((page-1)*API_PAGE_SIZE,page*API_PAGE_SIZE),count:matchingPashto.length,status:'success',isDemo:false,isPashto:true});
    return;
  }
  let active=true;const ctrl=new AbortController();setState(s=>({...s,status:'loading'}));
  getBooks({page,search,topic:category?.topic,language},ctrl.signal).then(data=>{
    if(active){
      const includePashto=!category&&!language&&page===1;
      setState({books:includePashto?[...matchingPashto.slice(0,8),...data.results]:data.results,count:data.count+(!category&&!language?matchingPashto.length:0),status:'success',isDemo:false,isPashto:false});
    }
  }).catch(e=>{
    if(e.name==='AbortError'||!active)return;
    const samples=demoBooks.filter(b=>(!search||`${b.title} ${b.authors?.[0]?.name}`.toLowerCase().includes(search.toLowerCase()))&&(!category||`${b.subjects?.join(' ')} ${b.title}`.toLowerCase().includes((category.topic||'').toLowerCase()))&&(!language||b.languages.includes(language)));
    const mixed=(!category&&!language?[...matchingPashto,...samples]:samples);
    setState({books:mixed.slice((page-1)*API_PAGE_SIZE,page*API_PAGE_SIZE),count:mixed.length,status:'success',isDemo:true,isPashto:false});
  });
  return ()=>{active=false;ctrl.abort()};
 },[page,search,category?.topic,category?.local,category?.genre,language,localOnly]);
 const totalPages=Math.max(1,Math.ceil(state.count/API_PAGE_SIZE));
 const books=useMemo(()=>sort==='title'?[...state.books].sort((a,b)=>a.title.localeCompare(b.title)):state.books,[state.books,sort]);
 function update(key,val){const next=new URLSearchParams(params);if(val)next.set(key,val);else next.delete(key);if(key!=='page')next.delete('page');setParams(next);}
 function onSearch(e){e.preventDefault();update('search',input.trim());}
 const heading=category?.name||'The Book Catalog';
 return <main><PageHeading eyebrow="THE LIBRARY SHELVES" title={heading} description={category?category.description:'Explore real English classics and Pashto books, with real titles, verified cover sources and original library links.'}><div className="heading-decor">✳</div></PageHeading>
 <div className="site-container catalog-layout">
  <aside className={`filter-sidebar ${filtersOpen?'open':''}`}><div className="filter-head"><h3>Explore & filter</h3><button className="icon-btn mobile-only" onClick={()=>setFiltersOpen(false)} aria-label="Close filters"><X size={20}/></button></div>
   <div className="sidebar-group"><label className="filter-label">Categories</label><Link to="/catalog" className={!category?'category-filter active':'category-filter'} onClick={()=>setFiltersOpen(false)}>All books <span>↗</span></Link>{categories.map(c=><Link key={c.slug} to={`/categories/${c.slug}`} onClick={()=>setFiltersOpen(false)} className={category?.slug===c.slug?'category-filter active':'category-filter'}>{c.name}<span>›</span></Link>)}</div>
   <div className="filter-aside-note"><BookOpen size={28}/><h4>Books open doors.</h4><p>Keep your mind curious and your reading list growing.</p></div>
  </aside>
  <div className="catalog-main"><div className="catalog-controls"><form onSubmit={onSearch} className="search-field catalog-search"><Search size={19}/><input value={input} onChange={e=>setInput(e.target.value)} placeholder="Search by book or author..." aria-label="Search books"/><button type="submit" aria-label="Submit search"><ArrowRight size={20}/></button></form>
   <div className="catalog-selects"><select className="select-control" aria-label="Choose language" value={language} onChange={e=>update('lang',e.target.value)}>{languages.map(l=><option key={l.value} value={l.value}>{l.label}</option>)}</select><select className="select-control" aria-label="Sort books" value={sort} onChange={e=>setSort(e.target.value)}><option value="popular">Most downloaded</option><option value="title">A–Z (current page)</option></select><button className="filter-mobile-trigger" onClick={()=>setFiltersOpen(true)}><SlidersHorizontal size={18}/> Filters</button></div></div>
   <div className="results-row"><div><strong>{state.status==='loading'?'Finding books...':`${state.count.toLocaleString('en-US')} ${state.isDemo?'preview books':'available books'}`}</strong><span> {search&&` · Results for “${search}”`} {category&&` · ${category.name}`}</span></div>{(search||language)&&<button className="clear-filters" onClick={()=>{setInput('');setParams({})}}>Clear filters <X size={14}/></button>}</div>
   {state.isDemo&&<OfflineNotice/>}
   {state.status==='loading'?<div className="books-grid">{Array.from({length:8},(_,i)=><BookCardSkeleton key={i}/>)}</div>:books.length===0?<EmptyState icon={Search} title="No matching books found" message="Try a different title, author, topic or language." href="/catalog" action="View all books"/>:<div className="books-grid">{books.map((b,i)=><BookCard key={b.id} book={b} index={i}/>)}</div>}
   {state.status!=='loading'&&state.count>API_PAGE_SIZE&&<div className="pagination"><button disabled={page<=1} onClick={()=>update('page',String(page-1))}><ChevronLeft size={19}/> Prev</button><div className="page-buttons">{[1,page-1,page,page+1,totalPages].filter((n,i,arr)=>n>=1&&n<=totalPages&&arr.indexOf(n)===i).sort((a,b)=>a-b).map((p,i,arr)=><React.Fragment key={p}>{i>0&&p-arr[i-1]>1&&<span>…</span>}<button className={p===page?'current':''} onClick={()=>update('page',String(p))}>{p}</button></React.Fragment>)}</div><button disabled={page>=totalPages} onClick={()=>update('page',String(page+1))}>Next <ChevronRight size={19}/></button></div>}
   {state.status!=='loading'&&<div className="results-note">{state.isPashto?'Real Pashto books · All reading and download options open on the original source.':state.isDemo?'Offline sample + verified Pashto books. Reconnect for the live international catalog.':`Page ${page} of ${totalPages}. Live international metadata from Gutendex, plus a featured local Pashto selection on page one.`}</div>}
  </div>
 </div>{filtersOpen&&<button className="filters-scrim" onClick={()=>setFiltersOpen(false)} aria-label="Close filters"/>}</main>
}
