import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight,ArrowUpRight,BookOpen,Heart,Search,Download,ChevronRight,Sparkles,Quote,Leaf,MoveUpRight} from 'lucide-react';
import BookCard,{Cover} from '../components/BookCard';
import {SectionHeading,OfflineNotice} from '../components/Shared';
import CategoryIcon from '../components/Icons';
import {categories} from '../data/categories';
import {demoBooks} from '../data/demoBooks';
import {pashtoBooks} from '../data/pashtoBooks';
import {useLibrary} from '../context/LibraryContext';
import {formatNumber} from '../lib/books';
import CopyrightCard from "../components/CopyrightCard";
const categoryPreview=categories.slice(0,8);
export default function Home(){
 const {featured,featuredStatus,liveCount,favorites}=useLibrary();
 const heroes=[demoBooks[0],demoBooks[3],demoBooks[1]];
 return <main>
    <CopyrightCard />
  <section className="hero-section site-container"><div className="hero-shell">
   <div className="hero-copy"><div className="hero-kicker"><span className="kicker-stars">✦</span> THE ART OF READING <span className="kicker-stars">✦</span></div>
    <h1>Where every <em>page</em> begins an adventure<span className="headline-period">.</span></h1>
    <p>Slow down, get comfortable, and discover a world of wonderful stories. Your next favorite book is waiting here.</p>
    <div className="hero-buttons"><Link to="/catalog" className="button button-primary button-large">Explore the catalog <ArrowUpRight size={19}/></Link><Link to="/categories" className="button button-ghost button-large">Browse categories <ArrowRight size={19}/></Link></div>
    <div className="hero-social-proof"><div className="mini-avatars"><span>A</span><span>S</span><span>J</span><span>R</span></div><div><strong>{liveCount?`${formatNumber(liveCount)}`:'A world of'} free classics</strong><small>Curated for every curious reader</small></div></div>
   </div>
   <div className="hero-visual"><div className="hero-visual-bg"><span className="hero-ornament hero-ornament-one">✳</span><span className="hero-ornament hero-ornament-two">✦</span><div className="hero-circle"></div><span className="hero-visual-label">THE READING EDITION · VOL. 01</span>
    <div className="hero-cover hero-cover-left"><Cover book={heroes[1]}/></div><div className="hero-cover hero-cover-center"><Cover book={heroes[0]}/></div><div className="hero-cover hero-cover-right"><Cover book={heroes[2]}/></div>
    <div className="hero-note"><BookOpen size={20}/><span>Just one more<br/><b>chapter...</b></span><span>♡</span></div>
    <div className="hero-visual-bottom"><span>READ. DREAM. REPEAT.</span><span>EST. 2026</span></div>
   </div></div></div>
  </section>
  <div className="site-container"><div className="features-ribbon"><div><span className="feature-icon"><BookOpen size={24}/></span><span><strong>Discover endlessly</strong><small>Timeless classics for everyone</small></span></div><div><span className="feature-icon"><Heart size={24}/></span><span><strong>Save your favorites</strong><small>Keep a personal reading shelf</small></span></div><div><span className="feature-icon"><Download size={24}/></span><span><strong>Read for free</strong><small>Official public-domain editions</small></span></div></div></div>
  <section className="section-pad site-container"><SectionHeading eyebrow="THE READER'S EDIT" title="Loved by bookworms" description="Beautiful stories to get lost in, chosen from the public-domain catalog." href="/catalog" action="View all books"/>
   {featuredStatus==='demo'&&<OfflineNotice/>}
   <div className="books-grid books-grid-home">{featured.slice(0,8).map((book,i)=><BookCard book={book} key={book.id} index={i}/>)}</div>
  </section>
  <section className="site-container section-pad pashto-feature"><div className="pashto-feature-heading" dir="rtl"><span className="eyebrow">پښتو ادبیات · ORIGINAL BOOKS</span><h2>زموږ پښتو کتابتون</h2><p>له ۵۰ څخه ډېر حقیقي پښتو کتابونه: ناولونه، شعرونه، تاریخ، کمپیوټر او نور. د اصلي خپرونکو د پوښونو او لینکونو سره.</p><Link to="/pashto" className="button button-primary">ټول پښتو کتابونه <ArrowUpRight size={18}/></Link></div><div className="books-grid books-grid-home">{pashtoBooks.slice(0,12).map((book,i)=><BookCard book={book} key={book.id} index={i}/>)}</div></section>
  <section className="categories-zone"><div className="site-container section-pad"><SectionHeading eyebrow="EVERY READER BELONGS" title="A little something for everyone" description="From sweeping romances to mind-expanding ideas, follow your curiosity." href="/categories" action="All 30 categories"/>
   <div className="category-home-grid">{categoryPreview.map((cat,i)=><Link key={cat.slug} to={`/categories/${cat.slug}`} className="category-tile" style={{'--tile-color':cat.accent}}><span className="category-tile-icon"><CategoryIcon name={cat.icon} size={26}/></span><strong>{cat.name}</strong><small>{cat.description}</small><ArrowUpRight className="category-tile-arrow" size={18}/></Link>)}</div>
  </div></section>
  <section className="site-container section-pad"><div className="editorial-banner"><div className="editorial-copy"><div className="eyebrow eyebrow-light"><span className="eyebrow-line"/>A MOMENT FOR YOURSELF</div><h2>Make room for <em>a good story.</em></h2><p>Sometimes all you need is a quiet corner, a cup of tea and a book that feels like an old friend.</p><Link to="/collections" className="button button-cream">Find your next read <ArrowUpRight size={18}/></Link></div><div className="editorial-art"><span className="editorial-star">✳</span><div className="editorial-stack back"><Cover book={demoBooks[7]}/></div><div className="editorial-stack front"><Cover book={demoBooks[11]}/></div><span className="editorial-inscription">read slow · live fully</span></div></div></section>
  <section className="site-container section-pad home-bottom"><SectionHeading eyebrow="THE COLLECTION" title="More stories to fall for" description="Another handful of books waiting to be discovered." href="/catalog" action="Explore everything"/><div className="books-grid books-grid-home">{featured.slice(8,16).map((book,i)=><BookCard book={book} key={book.id} index={i}/>)}</div></section>
  <section className="newsletter-wrap"><div className="site-container"><div className="newsletter-section"><div className="newsletter-illustration">✦</div><div><span className="eyebrow">STAY CURIOUS</span><h2>Good books. Better days.</h2><p>Keep exploring thousands of classics, completely free to discover.</p></div><Link to="/catalog" className="button button-primary">Start reading <ArrowUpRight size={18}/></Link></div></div></section>
 </main>
}
