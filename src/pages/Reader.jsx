import React from 'react';
import {Link,useParams} from 'react-router-dom';
import {BookOpen,ExternalLink,ArrowLeft,Download,Info} from 'lucide-react';
import {useBookDetails} from './BookDetails';
import {authorName,bookReadingLink,bookDownloadLink} from '../lib/books';
import {Cover} from '../components/BookCard';
import {EmptyState} from '../components/Shared';
export default function Reader(){const {id}=useParams();const {book,status}=useBookDetails(id);return <main className="site-container reader-page"><Link to={`/books/${id}`} className="breadcrumb"><ArrowLeft size={17}/> Book details</Link><div className="reader-shell"><div className="reader-top"><BookOpen size={25}/><span>THE READING ROOM</span></div>{status==='loading'?<p>Loading reading information...</p>:!book?<EmptyState title="Book unavailable" href="/catalog"/>:<><div className="reader-book"><Cover book={book}/><div><span className="eyebrow">YOUR NEXT CHAPTER</span><h1>{book.title}</h1><p>{authorName(book)}</p><div className="reader-info"><Info size={19}/> Read and download from the verified original library page. Access and formats are controlled by the provider; no third-party ebook files are hosted here.</div><a href={bookReadingLink(book)} className="button button-primary button-large" target="_blank" rel="noopener noreferrer">Open official reading page <ExternalLink size={18}/></a><a href={bookDownloadLink(book)} className="reader-download" target="_blank" rel="noopener noreferrer"><Download size={17}/> See available formats at the original source</a></div></div></>}</div></main>}
