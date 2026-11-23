import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,Search,ArrowRight} from 'lucide-react';
import {PageHeading,SectionHeading} from '../components/Shared';
import {categories} from '../data/categories';
import CategoryIcon from '../components/Icons';
export default function Categories(){return <main><PageHeading eyebrow="FIND YOUR THING" title="Explore by category" description="Explore classic, modern-interest and Pashto topics: 33 doors into worlds of discovery. Pick a subject and see what stories unfold."/><div className="site-container section-pad"><div className="category-directory">{categories.map((cat,i)=><Link to={`/categories/${cat.slug}`} key={cat.slug} className="directory-card"><span className="directory-card-icon" style={{background:cat.accent}}><CategoryIcon name={cat.icon} size={27}/></span><div><small>COLLECTION {String(i+1).padStart(2,'0')}</small><h3>{cat.name}</h3><p>{cat.description}</p></div><ArrowUpRight size={20}/></Link>)}</div><div className="category-cta"><span>Don't know where to start?</span><h2>Surprise yourself with something wonderful.</h2><Link to="/catalog" className="button button-primary">See popular books <ArrowRight size={18}/></Link></div></div></main>}
