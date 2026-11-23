import React from 'react';
import {Heart,ArrowRight} from 'lucide-react';
import {PageHeading,EmptyState} from '../components/Shared';
import BookCard from '../components/BookCard';
import {useLibrary} from '../context/LibraryContext';
export default function Favorites(){const {favorites}=useLibrary();return <main><PageHeading eyebrow="YOUR LITTLE CORNER" title="Books close to your heart" description="All the stories you saved for later, kept on this browser just for you."/><div className="site-container section-pad"><div className="favorites-summary"><Heart size={22}/><strong>{favorites.length} saved {favorites.length===1?'book':'books'}</strong><span>Stored privately in this browser</span></div>{favorites.length?<div className="books-grid">{favorites.map((book,i)=><BookCard key={book.id} book={book} index={i}/>)}</div>:<EmptyState icon={Heart} title="Your shelf is waiting" message="Tap the heart on any book to add it to your personal collection." href="/catalog" action="Discover books"/>}</div></main>}
