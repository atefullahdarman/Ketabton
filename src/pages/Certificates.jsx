import React from 'react';
import {Link} from 'react-router-dom';
import {Award,ArrowLeft,ShieldCheck} from 'lucide-react';
import CertificatesGallery from '../components/CertificatesGallery';
import {certificates} from '../data/portfolio';
export default function Certificates(){return <main className="certificates-page"><section className="site-container certificates-hero"><div><span className="eyebrow">ATEFULLAH ZAFAR ZOI · LEARNING JOURNEY</span><h1>Professional <em>certifications.</em></h1><p>Browse {certificates.length} original certificates and their source verification links, spanning web development, cybersecurity, databases, project management and communication.</p><div className="certificates-hero-links"><Link to="/about"><ArrowLeft size={17}/> About developer</Link><a href="#certificate-list"><Award size={17}/> Explore certificates</a></div></div><div className="certificates-hero-mark"><ShieldCheck size={52}/><strong>{certificates.length}</strong><span>Original credentials</span></div></section><section className="site-container certificates-content" id="certificate-list"><CertificatesGallery/></section></main>;}
