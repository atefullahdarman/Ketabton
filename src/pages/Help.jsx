import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {ChevronDown,ArrowUpRight,HelpCircle} from 'lucide-react';
import {PageHeading} from '../components/Shared';
const faqs=[
 ['Are the books free?','The app showcases public-domain titles from the Gutendex/Project Gutenberg catalog. On each official book page, available reading and download formats are listed. Check the applicable copyright rules in your country.'],
 ['Why do downloads open another website?','Project Gutenberg asks third-party sites to link to each book’s catalog page instead of deep-linking directly to file URLs. This keeps the links reliable and lets you choose the available format yourself.'],
 ['Why can’t I find a new or modern bestseller?','The main catalog focuses on public-domain books. Copyrighted commercial titles are generally not freely downloadable and are not automatically included.'],
 ['Where are my favorites saved?','Favorites and recently visited books are stored in your own browser via localStorage. You do not need an account. Clearing browser storage may remove this data.'],
 ['Why do I see sample books?','If the external book API is unavailable, a clearly labeled local preview of classic titles appears instead. Connect to the internet or try again later for the full live catalog.'],
 ['Does the website need an account?','No login is required. This is a frontend-only React project with no backend database or account service.'],
 ['How many books appear on each page?','Gutendex supplies 32 books per page. The app uses server-side pagination to explore the entire live result set without loading everything at once.'],
 ['Can I use the website on my phone?','Yes. The layout is responsive across mobile, tablet and desktop screens.']
];
export default function Help(){const [open,setOpen]=useState(0);return <main><PageHeading eyebrow="HERE TO HELP" title="Frequently asked questions" description="Everything you need to get started reading, saving and discovering."/><section className="site-container help-section"><div className="faq-list">{faqs.map(([q,a],i)=><div key={q} className={`faq-item ${open===i?'expanded':''}`}><button onClick={()=>setOpen(open===i?-1:i)} aria-expanded={open===i}><span>{q}</span><ChevronDown size={20}/></button>{open===i&&<p>{a}</p>}</div>)}</div><aside className="help-side"><HelpCircle size={38}/><h2>Still have a question?</h2><p>Reach the developer with your thoughts or suggestions.</p><Link to="/contact" className="button button-primary">Contact us <ArrowUpRight size={18}/></Link></aside></section></main>}
