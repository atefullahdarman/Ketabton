import React,{useEffect,useState} from 'react';
import {useParams,Link} from 'react-router-dom';
import {ArrowLeft,ArrowUpRight,Heart,BookOpen,ExternalLink,Download,Globe2,BookMarked,Tag,ArrowRight,Share2} from 'lucide-react';
import {Cover} from '../components/BookCard';
import {EmptyState,ExternalNote,OfflineNotice} from '../components/Shared';
import {authorName,getBook,bookPage,formatNumber} from '../lib/books';
import {demoBooks} from '../data/demoBooks';
import {getPashtoBook} from '../data/pashtoBooks';
import {bookReadingLink,bookDownloadLink,bookSource} from '../lib/books';
import {useLibrary} from '../context/LibraryContext';
export function useBookDetails(id){const [state,setState]=useState({book:null,status:'loading',isDemo:false});
 useEffect(()=>{const local=getPashtoBook(id);if(local){setState({book:local,status:'success',isDemo:false});return;}
  const ctrl=new AbortController();setState({book:null,status:'loading',isDemo:false});
  getBook(id,ctrl.signal).then(book=>setState({book,status:'success',isDemo:false})).catch(err=>{if(err.name==='AbortError')return;const book=demoBooks.find(b=>String(b.id)===String(id));setState({book,status:book?'success':'error',isDemo:Boolean(book)});});return ()=>ctrl.abort();},[id]);return state;}
export default function BookDetails(){const {id}=useParams();const {book,status,isDemo}=useBookDetails(id);const {isFavorite,toggleFavorite,addRecent}=useLibrary();
 useEffect(()=>{if(book)addRecent(book);},[book?.id]);
 const share=async()=>{const url=window.location.href;try{await navigator.clipboard.writeText(url);alert('Book link copied!')}catch{window.prompt('Copy this link:',url)}};
 if(status==='loading')return <main className="site-container book-loading"><div className="skeleton"/><div><div className="skeleton"/><div className="skeleton"/></div></main>;
 if(!book)return <main className="site-container"><EmptyState title="We couldn't find that book" message="The title may not be available right now. Try exploring the full catalog." href="/catalog" action="Browse books"/></main>;
 return <main><div className="site-container book-detail-page"><Link to="/catalog" className="breadcrumb"><ArrowLeft size={17}/> Back to catalog</Link>{isDemo&&<OfflineNotice/>}
 <div className="detail-layout"><div className="detail-cover-pane"><div className="detail-cover"><Cover book={book}/></div><div className="detail-caption">Cover image supplied by the external book source where available · د اصلي سرچینې انځور</div></div>
 <div className="detail-content"><span className="eyebrow"><span className="eyebrow-line"/>THE BOOK COLLECTION</span><h1>{book.title}</h1><p className="detail-author">by <strong>{authorName(book)}</strong></p><div className="detail-tags"><span><BookOpen size={15}/> {book.isPashto?'د پښتو کتاب سرچینه':'Public-domain classic'}</span><span><Globe2 size={15}/> {book.languages?.join(', ').toUpperCase()||'N/A'}</span>{Number.isFinite(book.download_count)&&<span><BookMarked size={15}/> {formatNumber(book.download_count)} downloads / 30 days</span>}</div>
 <div className="detail-description"><h3>About this book</h3><p dir={book.isPashto?'rtl':'ltr'}>{book.description || (book.summaries?.length ? book.summaries[0] : 'Explore this real book on its original library page. The reading and download options depend on that source.')}</p>{book.isPashto&&<p className='source-note' dir='rtl'>سرچینه: {bookSource(book)} · {book.pages?`${book.pages} مخونه · `:''}د کتاب حقونه د اصلي خپرونکي دي؛ ډاونلوډ په اصلي وېب‌سایټ کې وګورئ.</p>}{book.subjects?.length>0&&<div className="topic-list"><strong>Topics</strong>{book.subjects.slice(0,5).map(s=><span key={s}>{s}</span>)}</div>}</div>
 <div className="detail-actions"><a className="button button-primary button-large" href={bookReadingLink(book)} target="_blank" rel="noopener noreferrer">{book.isPashto?'کتاب په اصلي سرچینه کې وګورئ':'Read at source'} <ExternalLink size={19}/></a><a className="button button-outline button-large" href={bookDownloadLink(book)} target="_blank" rel="noopener noreferrer"><Download size={18}/> {book.isPashto?'د ډاونلوډ اختیارونه':'Download options'}</a></div>
 <div className="detail-secondary"><button onClick={()=>toggleFavorite(book)} className={isFavorite(book.id)?'utility-btn saved':'utility-btn'}><Heart fill={isFavorite(book.id)?'currentColor':'none'} size={19}/>{isFavorite(book.id)?'Saved to favorites':'Add to favorites'}</button><button className="utility-btn" onClick={share}><Share2 size={19}/> Share book</button><Link className="utility-btn" to={`/read/${book.id}`}><BookOpen size={19}/> Reading guide</Link></div>
 {book.isPashto?<p className='source-note' dir='rtl'>دا وېب‌سایټ د کتاب فایلونه نه کوربه کوي. د لوستلو یا ډاونلوډ اختیارونه د اصلي کتابتون له لارې وکاروئ؛ ځینې کتابونه ښايي د حساب یا اجازه غوښتنه وکړي.</p>:<ExternalNote/>}
 </div></div></div></main>;
}
