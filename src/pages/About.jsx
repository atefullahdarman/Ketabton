import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {ArrowUpRight,BookOpen,Braces,ChartColumn,Check,Code2,Database,ExternalLink,GraduationCap,Heart,Mail,MapPin,MessageCircle,Server,ShieldCheck,Trophy,BriefcaseBusiness,Globe2,Smartphone,MonitorSmartphone,ArrowRight,Landmark,Store,Hospital,Apple,Gamepad2,Keyboard,FileText,Sun,CalendarDays, Github, Linkedin, Award, Layers} from 'lucide-react';
import {ResponsiveContainer,BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,PieChart,Pie,Cell} from 'recharts';
import {developer,portfolioProjects,certificates} from '../data/portfolio';
import CertificatesGallery from '../components/CertificatesGallery';
import {CONTACT} from '../components/Footer';
const colors=['#176f58','#82a998','#d2ae74','#c7826b'];
const symbols={store:Store,landmark:Landmark,hospital:Hospital,apple:Apple,chart:ChartColumn,game:Gamepad2,keyboard:Keyboard,file:FileText,sun:Sun,graduation:GraduationCap};
const filters=['All','Web Apps','Data','Tools & Games'];
function ProfileSection({title,lead,children,id}){return <section className="site-container portfolio-zone" id={id}><div className="portfolio-section-head"><div><span className="eyebrow">THE DEVELOPER EDITION</span><h2>{title}</h2><p>{lead}</p></div></div>{children}</section>}
export default function About(){
 const [projectFilter,setProjectFilter]=useState('All');
 const [skillsView,setSkillsView]=useState('skills');
 const projects=portfolioProjects.filter(p=>projectFilter==='All'||p.category===projectFilter);
 const techData=Object.entries(developer.tech).map(([name,skills])=>({name,value:skills.length}));
 return <main className="developer-page">
  <section className="site-container portfolio-top">
    <div className="portfolio-intro"><span className="portfolio-pill"><span/> Available for collaborations</span>
      <p className="eyebrow">ABOUT THE CREATOR · FULL-STACK ENGINEERING</p>
      <h1>Building websites<br/>that feel <em>beautiful.</em><br/>And work <em>brilliantly.</em></h1>
      <p className="portfolio-standfirst">I'm <strong>{developer.name}</strong>, a Computer Science student at Kandahar University and a passionate Full-Stack Web Developer. I combine responsive interfaces with backend logic and data-driven functionality.</p>
      <div className="portfolio-actions"><a className="button button-primary button-large" href="#portfolio-projects">Explore my projects <ArrowUpRight size={18}/></a><a className="button button-outline button-large" href="#portfolio-contact">Let's connect <MessageCircle size={17}/></a></div>
      <div className="portfolio-facts"><span><GraduationCap size={19}/> Kandahar University</span><span><Trophy size={19}/> 2nd rank · High School</span><span><Layers size={19}/> 13 Technologies</span></div>
    </div>
    <div className="portfolio-portrait"><div className="portrait-spotlight"/><img src={`${import.meta.env.BASE_URL}images/developer-original.png`} alt="Portrait supplied by the developer"/><span className="portrait-stamp"><Code2 size={16}/> Full-Stack<br/>Developer</span><div className="portrait-card"><small>HELLO, I'M</small><strong>Atefullah <em>Zafar Zoi</em></strong><span>Turning ideas into working products</span></div></div>
  </section>
  <ProfileSection id="portfolio-story" title="A little about me" lead="My education, background and interests in modern web technology.">
   <div className="portfolio-info-grid"><article className="portfolio-panel large"><div className="small-icon"><Code2/></div><h3>Developer by curiosity. Engineer by practice.</h3>
    <p>{developer.familyLine}. I passed the Kankor examination and joined the Computer Science faculty at <strong>Kandahar University</strong>. I enjoy making real projects and learning how frontend, backend and databases work together.</p>
    <p>My stack includes HTML, CSS, JavaScript, React, Bootstrap, PHP, Laravel, Python, Java, SQL, SEO, and Git. My interests include digital libraries, banking systems, business management tools and responsive user experiences.</p>
    <div className="portfolio-mini-tags"><span>Clean UI</span><span>REST APIs</span><span>CRUD</span><span>Database Design</span><span>Responsive</span></div>
   </article><article className="portfolio-panel"><div className="small-icon"><GraduationCap/></div><h3>Education & achievements</h3>
    <p><strong>{developer.school}</strong> · Graduated {developer.graduation} · {developer.rank} rank</p><p>10th: 96% · 11th: 98% · 12th: 99%</p><div className="academic-bars">{developer.grades.map(g=><div key={g.name}><div><span>{g.name} grade</span><b>{g.value}%</b></div><i><em style={{width:`${g.value}%`}}/></i></div>)}</div><div className="education-note"><GraduationCap size={17}/> Kandahar University · Computer Science (2023–present)</div>
   </article></div>
  </ProfileSection>
  <ProfileSection id="portfolio-skills" title="The tools behind the work" lead="Browse my development toolkit and the illustrative charts from my supplied portfolio.">
   <div className="portfolio-switch" role="group" aria-label="Choose skill chart"><button className={skillsView==='skills'?'active':''} onClick={()=>setSkillsView('skills')}>Skill overview</button><button className={skillsView==='stack'?'active':''} onClick={()=>setSkillsView('stack')}>Tech ecosystem</button><button className={skillsView==='languages'?'active':''} onClick={()=>setSkillsView('languages')}>Languages</button></div>
   <div className="portfolio-skill-layout"><article className="portfolio-panel portfolio-chart"><div className="portfolio-card-head"><h3>{skillsView==='skills'?'Technical skill overview':skillsView==='stack'?'Technology categories':'Languages I use'}</h3><span className="live-indicator">{skillsView==='stack'?'Tool count':'Portfolio data'}</span></div>
     {skillsView==='skills'?<><div style={{width:'100%',height:480}}><ResponsiveContainer width="100%" height="100%"><BarChart data={developer.skills} layout="vertical" margin={{top:4,right:22,bottom:4,left:12}}><CartesianGrid horizontal={false} stroke="#e8e9e1"/><XAxis type="number" domain={[0,100]} tick={{fontSize:10,fill:'#799084'}}/><YAxis dataKey="name" type="category" width={85} tick={{fontSize:11,fill:'#405d52'}}/><Tooltip formatter={v=>[`${v}%`,'Illustrative estimate']} /><Bar dataKey="value" fill="#1b705b" radius={[0,6,6,0]}/></BarChart></ResponsiveContainer></div><small className="portfolio-data-note">Skill percentages are illustrative estimates from your supplied portfolio, not verified competency measurements.</small></>:
     <div style={{height:315,width:'100%'}}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={skillsView==='stack'?techData:developer.languages} cx="50%" cy="50%" innerRadius={75} outerRadius={122} paddingAngle={4} dataKey="value" nameKey="name">{(skillsView==='stack'?techData:developer.languages).map((x,i)=><Cell key={x.name} fill={colors[i%colors.length]}/>)}</Pie><Tooltip/></PieChart></ResponsiveContainer></div>}
     {skillsView!=='skills'&&<div className="portfolio-chart-legend">{(skillsView==='stack'?techData:developer.languages).map((x,i)=><span key={x.name}><i style={{background:colors[i%colors.length]}}/>{x.name}: <b>{x.value}{skillsView==='languages'?'%':''}</b></span>)}</div>}
   </article>
   <article className="portfolio-panel"><div className="portfolio-card-head"><h3>My development stack</h3><Code2 size={20}/></div>{Object.entries(developer.tech).map(([group,tools])=><div className="portfolio-tech-group" key={group}><strong>{group}</strong><div>{tools.map(t=><span key={t}>{t}</span>)}</div></div>)}</article></div>
  </ProfileSection>
  <ProfileSection id="portfolio-projects" title="My selected projects" lead="Ten projects listed in my portfolio, from management systems to interactive tools.">
   <div className="portfolio-filters">{filters.map(f=><button key={f} onClick={()=>setProjectFilter(f)} className={f===projectFilter?'active':''} aria-pressed={f===projectFilter}>{f==='All'?'All projects':f}</button>)}<span>{projects.length} projects</span></div>
   <div className="portfolio-project-grid">{projects.map((p,i)=>{const Icon=symbols[p.icon]||BriefcaseBusiness;return <article className="portfolio-project" key={p.title}><div className="project-headline"><span><Icon size={27}/></span><small>{p.category}</small></div><h3>{p.title}</h3><p>{p.desc}</p><div className="portfolio-mini-tags">{p.tags.map(t=><span key={t}>{t}</span>)}</div></article>})}</div>
   <p className="portfolio-data-note">Descriptions and tech tags reflect the portfolio code you supplied. Project preview images are omitted rather than presenting invented screenshots as real deployments.</p>
  </ProfileSection>
  <ProfileSection id="portfolio-certificates" title="Certificates & verified learning" lead={`Explore all ${certificates.length} original certificates from Google, Microsoft, Meta, Cisco Networking Academy, Coursera, and leading universities. Open each full image or visit its issuer verification page.`}>
    <CertificatesGallery compact/>
  </ProfileSection>
  <section id="portfolio-contact" className="site-container portfolio-contact"><div><span className="eyebrow">CONTACT THE DEVELOPER</span><h2>Let's create <em>something useful.</em></h2><p>Available to connect about web design, React, PHP, Laravel, databases or collaborative projects.</p></div><div className="portfolio-social-buttons"><a href={CONTACT.whatsapp} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp <ArrowUpRight size={16}/></a><a href={CONTACT.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn <ArrowUpRight size={16}/></a><a href={`mailto:${CONTACT.email}`}><Mail size={18}/> {CONTACT.email}</a><a href="tel:+93786354525"><Smartphone size={18}/> {CONTACT.phone}</a></div></section>
 </main>;
}
