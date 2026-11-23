import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ArrowUpRight, Award, CalendarDays, CheckCircle2, Download, ExternalLink, Eye, Filter, Search, ShieldCheck, X} from 'lucide-react';
import {certificates} from '../data/portfolio';

const categories = ['All',...new Set(certificates.map(c=>c.category))];
const picture = (c) => `${import.meta.env.BASE_URL}images/certificates/${c.image}`;
const originalPicture = (c) => `${import.meta.env.BASE_URL}images/certificates/${c.original}`;
const displayDate = (date) => new Date(`${date}T12:00:00Z`).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric',timeZone:'UTC'});

export default function CertificatesGallery({compact=false}) {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const closeButton = useRef(null);
  const lastTrigger = useRef(null);
  const shown = useMemo(() => certificates.filter(c =>
    (category === 'All' || c.category === category) &&
    `${c.title} ${c.issuer} ${c.category}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
  ),[category, query]);

  useEffect(() => {
    if (!selected) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setSelected(null);
      if (e.key === 'Tab') {
        const root = document.getElementById('certificate-dialog');
        if (!root) return;
        const els = [...root.querySelectorAll('button:not([disabled]),a[href]')];
        if (!els.length) return;
        if (e.shiftKey && document.activeElement === els[0]) {e.preventDefault();els.at(-1).focus();}
        else if (!e.shiftKey && document.activeElement === els.at(-1)){e.preventDefault();els[0].focus();}
      }
    };
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow=oldOverflow;
      document.removeEventListener('keydown',onKey);
      lastTrigger.current?.focus();
    };
  },[selected]);
  const preview = (c, e) => {lastTrigger.current=e.currentTarget;setSelected(c);};

  return <div className={`certs-root ${compact?'certs-compact':''}`}>
    <div className="certs-toolbar">
      <div className="certs-search"><Search size={18} aria-hidden="true"/><input type="search" aria-label="Search certificates" placeholder="Search a certificate or issuer" value={query} onChange={e=>setQuery(e.target.value)}/></div>
      <div className="certs-filters" role="group" aria-label="Filter certificates by subject">
        {categories.map(cat=><button type="button" key={cat} className={cat===category?'active':''} aria-pressed={category===cat} onClick={()=>setCategory(cat)}>{cat}</button>)}
      </div>
    </div>
    <div className="certs-result-heading"><span><Award size={16}/> {shown.length} of {certificates.length} credentials</span><span>Original images · Issuer links</span></div>
    {shown.length===0 ? <div className="certs-empty"><Filter size={24}/><h3>No matching certificates</h3><p>Change the search or select another category.</p><button type="button" onClick={()=>{setQuery('');setCategory('All');}}>Clear filters</button></div> :
    <div className="certs-grid">{shown.map((c,i)=><article className="certs-card" key={c.id}>
      <button className="certs-preview" onClick={e=>preview(c,e)} aria-label={`View original certificate: ${c.title}`} type="button">
        <img src={picture(c)} alt={`${c.title} certificate issued to Atefullah Zafar Zoi by ${c.organization}`} loading={i<2?'eager':'lazy'} decoding="async"/>
        <span className="certs-preview-overlay"><Eye size={17}/> View original</span>
      </button>
      <div className="certs-card-body"><div className="certs-meta"><span>{c.category}</span><span><CalendarDays size={13}/>{displayDate(c.date)}</span></div>
        <h3>{c.title}</h3><p>{c.issuer}</p><div className="certs-card-bottom">
          <button className="certs-preview-link" type="button" onClick={e=>preview(c,e)}><Eye size={16}/> Preview</button>
          <a href={c.url} target="_blank" rel="noopener noreferrer" aria-label={`Open issuer's verification page for ${c.title}`}><ShieldCheck size={16}/> Verify <ArrowUpRight size={15}/></a>
        </div></div></article>)}</div>}
    <p className="certs-disclaimer"><CheckCircle2 size={16}/> All certificate images are from the developer's original uploads. Verification URLs were copied from the certificates or decoded from their QR codes. Availability of the issuer's website is controlled by the issuer.</p>
    {selected&&<div className="certs-dialog-scrim" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}>
      <section id="certificate-dialog" role="dialog" aria-modal="true" aria-labelledby="certificate-dialog-title" className="certs-dialog">
        <div className="certs-dialog-bar"><div><span>ORIGINAL CERTIFICATE</span><h2 id="certificate-dialog-title">{selected.title}</h2><p>{selected.issuer} · {displayDate(selected.date)}</p></div><button type="button" ref={closeButton} className="certs-dialog-close" aria-label="Close certificate preview" onClick={()=>setSelected(null)}><X size={24}/></button></div>
        <div className="certs-dialog-image"><img src={originalPicture(selected)} alt={`Full original ${selected.title} certificate for Atefullah Zafar Zoi`}/></div>
        <div className="certs-dialog-actions"><a href={selected.url} target="_blank" rel="noopener noreferrer"><ShieldCheck size={17}/> Verify with issuer <ExternalLink size={15}/></a><a href={originalPicture(selected)} download={selected.original.split("/").pop()}><Download size={17}/> Download image</a></div>
      </section>
    </div>}
  </div>;
}
