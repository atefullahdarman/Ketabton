import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,ArrowRight,BookOpen,Heart,Compass,Feather,Star,Sparkles} from 'lucide-react';
import {PageHeading,SectionHeading} from '../components/Shared';
import {demoBooks} from '../data/demoBooks';
import {Cover} from '../components/BookCard';
const sets=[
 {title:'The Timeless Classics',label:'A GOOD PLACE TO BEGIN',copy:'Stories that have kept readers spellbound for generations.',slug:'fiction',ids:[1342,98,174],bg:'#e4e5d5'},
 {title:'The Mystery Shelf',label:'CURIOUS MINDS WELCOME',copy:'A little suspense makes every page turn sweeter.',slug:'mystery',ids:[1661,43,345],bg:'#dce5df'},
 {title:'Love Between the Lines',label:'FOR THE ROMANTICS',copy:'Great love stories that never go out of style.',slug:'romance',ids:[1260,1342,1400],bg:'#efdfd9'},
 {title:'Into the Unknown',label:'BEYOND THE HORIZON',copy:'Adventures, voyages and flights of imagination.',slug:'adventure',ids:[2701,76,11],bg:'#dce7e8'},
 {title:'A Little Wonder',label:'FOREVER YOUNG',copy:'Stories to inspire the dreamer in all of us.',slug:'children',ids:[11,74,76],bg:'#eee4cf'},
 {title:'Thoughtful Evenings',label:'READ & REFLECT',copy:'Books that stay with you beyond the final chapter.',slug:'philosophy',ids:[174,5200,2554],bg:'#e1dce5'}
];
export default function Collections(){return <main><PageHeading eyebrow="HANDPICKED FOR YOU" title="Curated collections" description="Whatever your mood, there’s a book for this very moment. Discover a collection that feels like you."/><section className="site-container section-pad"><div className="collection-grid">{sets.map((set,i)=><Link to={`/categories/${set.slug}`} className="collection-card" style={{'--collection-bg':set.bg}} key={set.title}><div className="collection-text"><small>{set.label}</small><h2>{set.title}</h2><p>{set.copy}</p><span>Explore collection <ArrowUpRight size={18}/></span></div><div className="collection-covers">{set.ids.map((id,i)=><div key={id} className={`collection-cover collection-cover-${i}`}><Cover book={demoBooks.find(b=>b.id===id)}/></div>)}</div></Link>)}</div></section></main>}
