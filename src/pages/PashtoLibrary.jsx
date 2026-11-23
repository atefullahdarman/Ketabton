import React,{useEffect,useMemo,useState} from 'react';
import {Link,useSearchParams} from 'react-router-dom';
import {BookOpen,BookMarked,Search,ArrowUpRight,ChevronLeft,ChevronRight,Landmark,Languages,Filter} from 'lucide-react';
import BookCard,{Cover} from '../components/BookCard';
import {searchPashtoBooks,pashtoBooks,pashtoGenres} from '../data/pashtoBooks';
import {EmptyState} from '../components/Shared';

const PAGE_SIZE=12;
const genres=pashtoGenres;
export default function PashtoLibrary(){
 const [params,setParams]=useSearchParams();
 const query=params.get('q')||'';
 const genre=genres.some(g=>g[0]===params.get('type'))?params.get('type'):'all';
 const page=Math.max(1,parseInt(params.get('page')||'1',10)||1);
 const [input,setInput]=useState(query);
 useEffect(()=>setInput(query),[query]);
 const matches=useMemo(()=>searchPashtoBooks({search:query,genre}),[query,genre]);
 const maxPage=Math.max(1,Math.ceil(matches.length/PAGE_SIZE));
 const current=Math.min(page,maxPage);
 const books=matches.slice((current-1)*PAGE_SIZE,current*PAGE_SIZE);
 const update=(field,value)=>{const next=new URLSearchParams(params);if(value && value!=='all')next.set(field,value);else next.delete(field);next.delete('page');setParams(next);};
 const changePage=n=>{const next=new URLSearchParams(params);next.set('page',String(n));setParams(next);};
 return <main className="pashto-library-page">
   <section className="site-container pashto-hero" dir="rtl">
     <div className="pashto-hero-glow"/>
     <div className="pashto-hero-content"><span className="pashto-brow"><Languages size={18}/> پښتو ډیجیټل کتابتون · PASHTO SHELF</span>
       <h1>د پښتو کتابونو رښتینې نړۍ،<br/><em>ستاسو په ژبه.</em></h1>
       <p>ناولونه، شاعري، تاریخ، کمپیوټر، ګرامر او ادبیات. له اصلي کتابتونونو سره د کتابونو پوښونه، معلومات، Search او د هر کتاب ځانګړې پاڼه.</p>
       <div className="pashto-hero-pills"><span><BookOpen size={17}/> {pashtoBooks.length} کتاب ریکارډونه</span><span><BookMarked size={17}/> حقیقي ناولونه</span><span><Landmark size={17}/> تاریخ، ادب او کمپیوټر</span></div>
     </div>
     <div className="pashto-hero-covers" aria-hidden="true">{pashtoBooks.slice(0,3).map((book,i)=><div className={`pashto-floating-cover pfc-${i}`} key={book.id}><Cover book={book} featured/></div>)}</div>
   </section>
   <section className="site-container pashto-content" dir="rtl">
     <div className="pashto-section-title"><div><span className="eyebrow">VERIFIED SOURCE RECORDS</span><h2>پښتو کتابونه ولټوئ</h2><p>په کتاب کلیک وکړئ، تفصیلي پاڼه به یې خلاصه شي.</p></div><Link to="/catalog" className="text-link">نړیوال کتابونه <ArrowUpRight size={17}/></Link></div>
     <div className="pashto-controls">
       <form className="pashto-search" onSubmit={e=>{e.preventDefault();update('q',input.trim());}}><Search size={19}/><input dir="rtl" value={input} onChange={e=>setInput(e.target.value)} placeholder="د کتاب نوم، لیکوال یا موضوع ولټوئ..." aria-label="د پښتو کتابونو لټون"/><button aria-label="لټون" type="submit">لټون</button></form>
       <div className="pashto-tabs" role="group" aria-label="کتګورۍ">{genres.map(([code,name])=><button key={code} onClick={()=>update('type',code)} className={genre===code?'active':''}>{name}</button>)}</div>
     </div>
     <div className="pashto-results-note"><strong>{matches.length} کتابونه</strong><span>ثبت شوي عنوانونه · د اصلي پوښ او سرچینې لینکونه</span></div>
     {books.length?<div className="books-grid pashto-grid">{books.map((b,i)=><BookCard key={b.id} book={b} index={i}/>)}</div>:<EmptyState icon={Search} title="ستاسې د لټون کتاب ونه موندل شو" message="د کتاب بل نوم یا کټګوري وازموئ" href="/pashto" action="ټول پښتو کتابونه"/>}
     {maxPage>1&&<nav className="pagination pashto-pagination" aria-label="Pagination"><button onClick={()=>changePage(current-1)} disabled={current<=1}><ChevronRight size={18}/> مخکینی</button><div className="page-buttons">{Array.from({length:maxPage},(_,i)=>i+1).filter(n=>n===1||n===maxPage||Math.abs(n-current)<=2).map((n,i,shown)=><React.Fragment key={n}>{i>0&&n-shown[i-1]>1&&<span>…</span>}<button className={current===n?'current':''} onClick={()=>changePage(n)}>{n}</button></React.Fragment>)}</div><button onClick={()=>changePage(current+1)} disabled={current>=maxPage}>راتلونکی <ChevronLeft size={18}/></button></nav>}
     <div className="pashto-legal-note"><BookOpen size={21}/><p>د کتابونو پوښونه او د لوستلو / ډاونلوډ فایلونه د هغوی د اصلي سرچینو ملکیت دی. موږ دلته کتابونه نه بیا خپروو؛ په اصلي پاڼه کې د کتاب د لاسرسي، حساب او چاپ حقونه وګورئ. ځینې پوښونه د انټرنېټ په نشتوالي کې نه ښکاري. د ځینو سرچینو لپاره د لوستلو حساب یا د ډاونلوډ محدودیت موجود وي.</p></div>
   </section>
 </main>;
}
