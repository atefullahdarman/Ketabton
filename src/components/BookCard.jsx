import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Heart,ArrowUpRight,Download} from 'lucide-react';
import {authorName,bookPage,getSubject} from '../lib/books';
import {coverCandidates,findOpenLibraryCover} from '../lib/coverSources';
import {useLibrary} from '../context/LibraryContext';
export function Cover({book,className='',featured=false}) {
  const candidates = React.useMemo(()=>coverCandidates(book),[book?.id,book?.formats?.['image/jpeg']]);
  const [imageState,setImageState]=useState({idx:0, extra:null, done:false});
  React.useEffect(()=>{setImageState({idx:0,extra:null,done:false});},[book?.id,book?.formats?.['image/jpeg']]);
  const list=imageState.extra?[...candidates,imageState.extra]:candidates;
  const src=list[imageState.idx];
  const onError=()=>setImageState(old=>({...old,idx:old.idx+1}));
  React.useEffect(()=>{
    if(src || imageState.done || book?.isPashto) return;
    const ctrl=new AbortController();
    findOpenLibraryCover(book,ctrl.signal).then(found=>setImageState(old=>({...old,extra:found,done:true})))
      .catch(()=>{if(!ctrl.signal.aborted)setImageState(old=>({...old,done:true}));});
    return ()=>ctrl.abort();
  },[src,imageState.done,book?.id,book?.isPashto]);
  return <div className={`cover-art authentic-cover ${featured?'cover-featured':''} ${className}`} dir={book?.isPashto?'rtl':'ltr'}>
    {src?<img key={src} src={src} loading={featured?'eager':'lazy'} decoding="async" alt={`Authentic edition cover for ${book?.title||'book'}`} onError={onError} referrerPolicy="no-referrer"/>:
      <div className="cover-placeholder refined-cover-fallback"><div className="fallback-ornament" aria-hidden="true">✦</div><span className="fallback-symbol" aria-hidden="true">📖</span><strong>{book?.title||'Book'}</strong><small>{book?.isPashto?'انځور د سرچینې له لارې وګورئ':'Cover preview is unavailable'}</small><span className="fallback-source-link">{book?.isPashto?'اصلي معلومات وګورئ':'Open book details'} ↗</span></div>}
  </div>;
}
export default function BookCard({book,style='default',index=0}) {
  const {isFavorite,toggleFavorite}=useLibrary();
  if (!book) return null;
  return <article lang={book.isPashto?'ps':'en'} className={`book-card book-card-${style} ${book.isPashto?'pashto-book-card':''}`} style={{'--stagger':`${Math.min(index,9)*35}ms`}}>
    <div className="book-image-wrap">
      <Link to={`/books/${book.id}`} className="book-cover-link" aria-label={`Details about ${book.title}`}><Cover book={book}/></Link>
      <button className={`heart-button ${isFavorite(book.id)?'active':''}`} onClick={()=>toggleFavorite(book)} aria-label={isFavorite(book.id)?`Remove ${book.title} from favorites`:`Save ${book.title} to favorites`} title="Save to favorites"><Heart size={18} fill={isFavorite(book.id)?'currentColor':'none'}/></button>
      <span className="cover-badge">{book.isPashto?'Pashto · Explore':'Real book · Explore'}</span>
    </div>
    <div className="book-text">
      <span className="book-overline">{getSubject(book).slice(0,35)}</span>
      <Link to={`/books/${book.id}`} className="book-title">{book.title}</Link>
      <p className="book-author">{authorName(book)}</p>
      <div className="book-meta"><span className="book-kind">{book.isPashto?`${book.sourceName} · پښتو`:'eBook · Classic'}</span><Link to={`/books/${book.id}`} aria-label={`View ${book.title}`} className="book-arrow"><ArrowUpRight size={18}/></Link></div>
    </div>
  </article>;
}
export function BookCardSkeleton(){return <div className="book-card skeleton-card"><div className="skeleton sk-cover"/><div className="skeleton sk-line"/><div className="skeleton sk-line short"/></div>}
export function MiniBook({book}) {return <Link to={`/books/${book.id}`} className="mini-book"><Cover book={book}/><div><strong>{book.title}</strong><small>{authorName(book)}</small></div><ArrowUpRight size={17}/></Link>}
