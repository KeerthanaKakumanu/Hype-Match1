import React, { useMemo, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Search, SlidersHorizontal, ChevronDown, ArrowUpRight, ArrowRight,
  Sparkles, Users, Heart, Bookmark, X, Instagram, Youtube, MapPin,
  CheckCircle2, Zap, Plus, Minus, Menu, WandSparkles, Target, Send,
  BadgeCheck, ChartNoAxesCombined, CircleDollarSign, Clapperboard,
  Palette, Gamepad2, GraduationCap, Utensils, Dumbbell, Plane,
  Laptop, Music2, Camera, ShoppingBag, Baby, Leaf, PawPrint, Mic2,
  BriefcaseBusiness, Globe2, ChevronRight, Copy, Check, Star
} from 'lucide-react';
import './style.css';

const categories = [
  {name:'All creators', icon:Sparkles}, {name:'Lifestyle',icon:Heart},
  {name:'Fashion & Beauty',icon:Palette}, {name:'Food',icon:Utensils},
  {name:'Travel',icon:Plane}, {name:'Technology',icon:Laptop},
  {name:'Gaming',icon:Gamepad2}, {name:'Education',icon:GraduationCap},
  {name:'Fitness',icon:Dumbbell}, {name:'Comedy',icon:Clapperboard},
  {name:'Music',icon:Music2}, {name:'Photography',icon:Camera},
  {name:'Parenting',icon:Baby}, {name:'Sustainability',icon:Leaf},
  {name:'Pets',icon:PawPrint}, {name:'Business',icon:BriefcaseBusiness},
  {name:'Art & DIY',icon:Palette}, {name:'Podcast',icon:Mic2},
  {name:'Shopping',icon:ShoppingBag}
];
const firstNames = ['Aarav','Ananya','Saanvi','Arjun','Ishita','Vihaan','Kavya','Aditya','Diya','Rohan','Mira','Sai','Tanvi','Reyansh','Nitya','Ira','Varun','Meera','Aadhya','Kiran','Pranavi','Vivek','Harini','Nikhil','Pooja','Teja','Sravya','Manoj','Keerthi','Rithvik'];
const lastNames = ['Reddy','Sharma','Kumar','Rao','Varma','Patel','Naidu','Chowdary','Khan','Das','Mishra','Goud','Shetty','Iyer','Joshi','Murthy','Bose','Singh','Devi','Koppula'];
const states = ['Telangana','Andhra Pradesh'];
const cities = ['Hyderabad','Warangal','Karimnagar','Nizamabad','Khammam','Vijayawada','Visakhapatnam','Guntur','Tirupati','Kurnool','Rajahmundry','Nellore'];
const niches = categories.slice(1).map(c=>c.name);
const platforms = ['Instagram','YouTube','Both'];
const sizes = ['Nano','Micro','Mid-tier','Macro','Celebrity'];
const avatarColors = ['#ff6a32','#ffb703','#6c63ff','#13a89e','#f05d8b','#2878e5','#a35ac7','#e58c24','#ef4f36','#4b9a5a'];
const officialCreators = [
  {id:'real-1',name:'Allu Arjun',handle:'@alluarjunonline',niche:'Entertainment',state:'Telangana',city:'Hyderabad',followers:28000000,size:'Celebrity',platform:'Instagram',profile:'https://www.instagram.com/alluarjunonline/',rank:1,bio:'Actor and major Telugu cinema personality with a large public social presence.'},
  {id:'real-2',name:'Mahathalli (Jahnavi Dasetty)',handle:'@mahathalli',niche:'Comedy',state:'Telangana',city:'Hyderabad',followers:1500000,size:'Celebrity',platform:'Instagram',profile:'https://www.instagram.com/mahathalli/',rank:2,bio:'Telugu digital entertainer known for relatable comedy and character-led sketches.'},
  {id:'real-3',name:'Deepika Pilli',handle:'@deepikapilli',niche:'Lifestyle',state:'Andhra Pradesh',city:'Vijayawada',followers:2100000,size:'Celebrity',platform:'Instagram',profile:'https://www.instagram.com/deepikapilli/',rank:3,bio:'Telugu entertainment personality and lifestyle creator.'},
  {id:'real-4',name:'Eesha Rebba',handle:'@eesharebba',niche:'Fashion & Beauty',state:'Telangana',city:'Hyderabad',followers:2500000,size:'Celebrity',platform:'Instagram',profile:'https://www.instagram.com/eesharebba/',rank:4,bio:'Telugu film actor with a strong public lifestyle and fashion presence.'},
  {id:'real-5',name:'Ananya Nagalla',handle:'@ananya.nagalla',niche:'Lifestyle',state:'Telangana',city:'Hyderabad',followers:1900000,size:'Celebrity',platform:'Instagram',profile:'https://www.instagram.com/ananya.nagalla/',rank:5,bio:'Telugu actor and public personality sharing lifestyle and entertainment content.'},
  {id:'real-6',name:'Niharika Konidela',handle:'@niharikakonidela',niche:'Lifestyle',state:'Telangana',city:'Hyderabad',followers:2400000,size:'Celebrity',platform:'Instagram',profile:'https://www.instagram.com/niharikakonidela/',rank:6,bio:'Actor and producer with a visible Telugu entertainment and lifestyle presence.'},
  {id:'real-7',name:'Ram Pothineni',handle:'@ram_pothineni',niche:'Entertainment',state:'Telangana',city:'Hyderabad',followers:4900000,size:'Celebrity',platform:'Instagram',profile:'https://www.instagram.com/ram_pothineni/',rank:7,bio:'Telugu film actor and public entertainment personality.'},
  {id:'real-8',name:'Suma Kanakala',handle:'@sumakanakala',niche:'Entertainment',state:'Telangana',city:'Hyderabad',followers:1500000,size:'Celebrity',platform:'Instagram',profile:'https://www.instagram.com/sumakanakala/',rank:8,bio:'Popular Telugu television host and entertainer.'},
  {id:'real-9',name:'Alekhya Harika (Dhethadi)',handle:'@dhethadi',niche:'Comedy',state:'Telangana',city:'Hyderabad',followers:1000000,size:'Macro',platform:'Instagram',profile:'https://www.instagram.com/dhethadi/',rank:9,bio:'Telugu creator known for Telangana-flavoured comedy and relatable characters.'},
  {id:'real-10',name:'Shanmukh Jaswanth',handle:'@shanmukh.jaswanth',niche:'Comedy',state:'Telangana',city:'Hyderabad',followers:2000000,size:'Celebrity',platform:'YouTube',profile:'https://www.youtube.com/@ShanmukhJaswanth',rank:10,bio:'Telugu digital creator known for short films, sketches and web content.'},
  {id:'real-11',name:'Harsha Sai',handle:'@harshasai',niche:'Entertainment',state:'Telangana',city:'Hyderabad',followers:10000000,size:'Celebrity',platform:'YouTube',profile:'https://www.youtube.com/@HarshaSaiForYou',rank:11,bio:'Telugu-language YouTube creator known for large-scale public videos.'},
  {id:'real-12',name:'Prashu Baby',handle:'@prashu__baby',niche:'Comedy',state:'Andhra Pradesh',city:'Vijayawada',followers:11000000,size:'Celebrity',platform:'YouTube',profile:'https://www.youtube.com/@prashubaby',rank:12,bio:'Telugu comedy and short-film creator.'},
  {id:'real-13',name:'My Village Show',handle:'@myvillageshow',niche:'Comedy',state:'Telangana',city:'Gajwel',followers:2500000,size:'Celebrity',platform:'YouTube',profile:'https://www.youtube.com/@MyVillageShow',rank:13,bio:'Telugu village-life entertainment channel with regional storytelling.'},
  {id:'real-14',name:'Filmymoji',handle:'@Filmymoji',niche:'Comedy',state:'Telangana',city:'Hyderabad',followers:2000000,size:'Celebrity',platform:'YouTube',profile:'https://www.youtube.com/@Filmymoji',rank:14,bio:'Telugu sketch and comedy channel.'},
  {id:'real-15',name:'Rythu Badi (Rajender Reddy)',handle:'Rythu Badi',niche:'Education',state:'Andhra Pradesh',city:'Andhra Pradesh',followers:1600000,size:'Celebrity',platform:'YouTube',profile:'https://www.youtube.com/results?search_query=Rythu+Badi+Rajender+Reddy',rank:15,bio:'Telugu agriculture educator sharing farming knowledge for rural audiences.'},
  {id:'real-16',name:'Geeky Ranjit',handle:'@geekyranjitofficial',niche:'Technology',state:'Telangana',city:'Hyderabad',followers:1000000,size:'Macro',platform:'YouTube',profile:'https://www.youtube.com/@geekyranjitofficial',rank:16,bio:'Long-running technology reviewer covering gadgets and consumer tech.'},
  {id:'real-17',name:'Hyderabad Food Diaries',handle:'@hyderabad.food.diaries',niche:'Food',state:'Telangana',city:'Hyderabad',followers:300000,size:'Macro',platform:'Instagram',profile:'https://www.instagram.com/hyderabad.food.diaries/',rank:17,bio:'Local food discovery, restaurants and Hyderabad cuisine.'},
  {id:'real-18',name:'The Hungry Indians',handle:'@thehungryindians',niche:'Food',state:'Telangana',city:'Hyderabad',followers:500000,size:'Macro',platform:'Instagram',profile:'https://www.instagram.com/thehungryindians/',rank:18,bio:'Food and travel discovery with a Hyderabad focus.'},
  {id:'real-19',name:'Hyderabad Food Guy',handle:'@hydfoodguy',niche:'Food',state:'Telangana',city:'Hyderabad',followers:300000,size:'Macro',platform:'Instagram',profile:'https://www.instagram.com/hydfoodguy/',rank:19,bio:'Food reviews and local restaurant discoveries.'},
  {id:'real-20',name:'Sekhar Master',handle:'@sekharmaster',niche:'Music',state:'Telangana',city:'Hyderabad',followers:2000000,size:'Celebrity',platform:'Instagram',profile:'https://www.instagram.com/sekharmaster/',rank:20,bio:'Choreographer and dance personality in Telugu entertainment.'},
  {id:'real-21',name:'Viva Harsha',handle:'Viva Harsha',niche:'Comedy',state:'Andhra Pradesh',city:'Andhra Pradesh',followers:500000,size:'Macro',platform:'YouTube',profile:'https://www.youtube.com/results?search_query=Viva+Harsha+official',rank:21,bio:'Telugu comedian and digital entertainer.'},
  {id:'real-22',name:'Rohini Molleti',handle:'Rohini',niche:'Comedy',state:'Andhra Pradesh',city:'Andhra Pradesh',followers:800000,size:'Macro',platform:'Instagram',profile:'https://www.instagram.com/',rank:22,bio:'Telugu television and comedy personality. Open the official profile and confirm the handle before outreach.'},
  {id:'real-23',name:'Varsha D’Souza',handle:'Varsha D’Souza',niche:'Lifestyle',state:'Andhra Pradesh',city:'Visakhapatnam',followers:700000,size:'Macro',platform:'Instagram',profile:'https://www.instagram.com/',rank:23,bio:'Telugu digital entertainment personality. Official profile link needs confirmation.'},
  {id:'real-24',name:'Anasuya Bharadwaj',handle:'@anasuyabharadwaj',niche:'Entertainment',state:'Telangana',city:'Hyderabad',followers:1300000,size:'Celebrity',platform:'Instagram',profile:'https://www.instagram.com/anasuyabharadwaj/',rank:24,bio:'Telugu television host and actor.'},
  {id:'real-25',name:'Ritu Varma',handle:'@rituvarma',niche:'Fashion & Beauty',state:'Telangana',city:'Hyderabad',followers:2300000,size:'Celebrity',platform:'Instagram',profile:'https://www.instagram.com/rituvarma/',rank:25,bio:'Telugu film actor and fashion/lifestyle personality.'},
  {id:'real-26',name:'Sree Vishnu',handle:'Sree Vishnu',niche:'Entertainment',state:'Andhra Pradesh',city:'Andhra Pradesh',followers:400000,size:'Macro',platform:'Instagram',profile:'https://www.instagram.com/',rank:26,bio:'Telugu film actor; official social profile should be confirmed before outreach.'},
  {id:'real-27',name:'Aditya Music',handle:'@AdityaMusic',niche:'Music',state:'Telangana',city:'Hyderabad',followers:1000000,size:'Celebrity',platform:'YouTube',profile:'https://www.youtube.com/@AdityaMusic',rank:27,bio:'Major Telugu music label and channel; included as a media channel rather than an individual creator.'},
  {id:'real-28',name:'Infobells Telugu',handle:'@infobellstelugurhymes',niche:'Education',state:'Telangana',city:'Hyderabad',followers:38000000,size:'Celebrity',platform:'YouTube',profile:'https://www.youtube.com/@infobellstelugurhymes',rank:28,bio:'Large Telugu children’s learning and rhymes channel; included as a channel/brand.'},
  {id:'real-29',name:'Raghu Ram',handle:'Raghu Ram',niche:'Lifestyle',state:'Andhra Pradesh',city:'Andhra Pradesh',followers:200000,size:'Macro',platform:'Instagram',profile:'https://www.instagram.com/',rank:29,bio:'Public personality listed in Andhra Pradesh influencer roundups; official profile link needs confirmation.'},
  {id:'real-30',name:'Madhupriya',handle:'Madhupriya',niche:'Music',state:'Andhra Pradesh',city:'Andhra Pradesh',followers:1800000,size:'Celebrity',platform:'Instagram',profile:'https://www.instagram.com/',rank:30,bio:'Telugu singer and public music personality; official profile link needs confirmation.'}
].map((c,i)=>({...c, real:true, verifiedLink:!c.profile.endsWith('instagram.com/') && !c.profile.includes('/results?search_query=') && !c.profile.endsWith('/'), avatar:c.name.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase(), avatarUrl:(c.profile.includes('instagram.com/') && !c.profile.endsWith('instagram.com/')) ? `https://unavatar.io/instagram/${c.profile.split('instagram.com/')[1].replaceAll('/','')}` : (c.profile.includes('youtube.com/@') ? `https://unavatar.io/youtube/${c.profile.split('youtube.com/@')[1].split('/')[0]}` : null), color:avatarColors[i%avatarColors.length], engagement:null, budget:null, bio:c.bio+' Public-profile link is provided for discovery; current metrics and collaboration availability should be confirmed directly.'}));
const demoCreators = Array.from({length:2000}, (_,i) => {
  const first = firstNames[i % firstNames.length];
  const last = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
  const niche = niches[(i * 7 + Math.floor(i/13)) % niches.length];
  const state = states[i % 2];
  const city = cities[(i * 3 + Math.floor(i/11)) % cities.length];
  const followers = [1800,4200,8900,14500,26000,38000,52000,74000,98000,145000,220000,380000,620000,1100000][(i*7)%14];
  const size = followers < 10000 ? 'Nano' : followers < 50000 ? 'Micro' : followers < 200000 ? 'Mid-tier' : followers < 600000 ? 'Macro' : 'Celebrity';
  const platform = platforms[(i*5)%3];
  return { id:`demo-${i+1}`, name:`Sample ${first} ${last}`, handle:`Demo profile ${String(i+1).padStart(4,'0')}`, niche, state, city, followers, size, platform,
    engagement:(2.1 + ((i*17)%68)/10).toFixed(1), budget:followers<10000?2500:followers<50000?6500:followers<200000?18000:followers<600000?45000:90000,
    bio:`Illustrative ${niche.toLowerCase()} creator profile for interface testing. Not a real creator listing.`, demo:true, avatar:(first[0]+last[0]).toUpperCase(), color:avatarColors[i%avatarColors.length], profile:null };
});
const creators = [...officialCreators, ...demoCreators];

function money(n){ return '₹' + Number(n).toLocaleString('en-IN'); }
function compact(n){ return n >= 1000000 ? (n/1000000).toFixed(1)+'M' : n >= 1000 ? (n/1000).toFixed(n>=100000?0:1)+'K' : String(n); }

function App(){
  const [view,setView] = useState('discover');
  const [query,setQuery] = useState('');
  const [category,setCategory] = useState('All creators');
  const [platform,setPlatform] = useState('Any platform');
  const [state,setState] = useState('All locations');
  const [size,setSize] = useState('Any size');
  const [sort,setSort] = useState('Recommended');
  const [shortlist,setShortlist] = useState(()=>{try{return JSON.parse(localStorage.getItem('hypematch-shortlist')||'[]')}catch{return[]}});
  const [selected,setSelected] = useState(null);
  const [showBrief,setShowBrief] = useState(false);
  const [showFilters,setShowFilters] = useState(false);
  const [mobileMenu,setMobileMenu] = useState(false);
  const [visibleCount,setVisibleCount] = useState(12);
  const [brief,setBrief] = useState({brand:'',goal:'Brand awareness',niche:'Lifestyle',platform:'Instagram',budget:'₹10,000–₹30,000',location:'Telangana + Andhra Pradesh',tone:'Warm & relatable'});
  const [matchResults,setMatchResults] = useState(null);
  const [toast,setToast] = useState('');
  useEffect(()=>{localStorage.setItem('hypematch-shortlist',JSON.stringify(shortlist))},[shortlist]);
  useEffect(()=>{setVisibleCount(12)},[query,category,platform,state,size,sort,view]);
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),2500);return()=>clearTimeout(t)},[toast]);

  const filtered = useMemo(()=>{
    let arr = creators.filter(c=>{
      const q=query.toLowerCase().trim();
      const matchesQ=!q || [c.name,c.handle,c.niche,c.city,c.state,c.bio].some(v=>v.toLowerCase().includes(q));
      const matchesCat=category==='All creators'||c.niche===category;
      const matchesPlatform=platform==='Any platform'||c.platform===platform||c.platform==='Both';
      const matchesState=state==='All locations'||c.state===state;
      const matchesSize=size==='Any size'||c.size===size;
      return matchesQ&&matchesCat&&matchesPlatform&&matchesState&&matchesSize;
    });
    if(sort==='Followers: high to low') arr.sort((a,b)=>Number(!!b.real)-Number(!!a.real) || (b.followers||0)-(a.followers||0));
    if(sort==='Followers: low to high') arr.sort((a,b)=>Number(!!b.real)-Number(!!a.real) || (a.followers||0)-(b.followers||0));
    if(sort==='Budget: low to high') arr.sort((a,b)=>Number(!!b.real)-Number(!!a.real) || (a.budget||Infinity)-(b.budget||Infinity));
    return arr;
  },[query,category,platform,state,size,sort]);

  function toggleShortlist(id){
    setShortlist(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
    setToast(shortlist.includes(id)?'Removed from shortlist':'Added to shortlist');
  }
  function findMatches(e){
    e?.preventDefault();
    const budgetMax = brief.budget.includes('30,000')?30000:brief.budget.includes('10,000')?10000:brief.budget.includes('50,000')?50000:150000;
    const res=creators.map(c=>{
      let score=c.real ? Math.max(55, 100-c.rank) : 20;
      if(c.niche===brief.niche)score+=c.real?8:25;
      if(brief.platform==='Both'||c.platform===brief.platform||c.platform==='Both')score+=12;
      if(c.state==='Telangana'||c.state==='Andhra Pradesh')score+=8;
      if(c.budget && c.budget<=budgetMax)score+=7;
      return {...c,score:Math.min(score,99)};
    }).sort((a,b)=>b.score-a.score).slice(0,12);
    setMatchResults(res);setShowBrief(false);setView('matches');setToast('Your demo match list is ready');
  }
  const shortlistCreators=creators.filter(c=>shortlist.includes(c.id));
  const activeFilters=[category!=='All creators',platform!=='Any platform',state!=='All locations',size!=='Any size'].filter(Boolean).length;

  return <div className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={()=>{setView('discover');window.scrollTo({top:0,behavior:'smooth'})}} aria-label="HypeMatch home">
        <span className="brand-mark">H<span className="brand-spark">✦</span></span><span className="brand-word">Hype<span>Match</span><small>RIGHT CREATOR. RIGHT BRAND. RIGHT HYPE.</small></span>
      </button>
      <nav className={mobileMenu?'nav-links nav-open':'nav-links'}>
        <button className={view==='discover'?'nav-link active':'nav-link'} onClick={()=>{setView('discover');setMobileMenu(false)}}>Discover</button>
        <button className={view==='matches'?'nav-link active':'nav-link'} onClick={()=>{setView('matches');setMobileMenu(false);if(!matchResults)setShowBrief(true)}}>AI Match</button>
        <button className={view==='shortlist'?'nav-link active':'nav-link'} onClick={()=>{setView('shortlist');setMobileMenu(false)}}>My shortlist <span className="nav-count">{shortlist.length}</span></button>
      </nav>
      <div className="top-actions"><span className="demo-pill"><span></span> DEMO MODE</span><button className="brief-button" onClick={()=>setShowBrief(true)}><Sparkles size={16}/> Build a brief <ArrowUpRight size={15}/></button><button className="mobile-menu" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Toggle menu">{mobileMenu?<X/>:<Menu/>}</button></div>
    </header>

    {view==='discover' && <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-icon"><Zap size={13} fill="currentColor"/></span> THE CREATOR MATCHMAKING PLATFORM</div>
          <h1>Find your next<br/> <span className="headline-highlight">hype-worthy</span> creator.</h1>
          <p className="hero-sub">Less scrolling. Better partnerships. Meet creators who get your brand, your audience, and your vision.</p>
          <div className="hero-ctas"><button className="primary-button" onClick={()=>document.getElementById('discover-creators')?.scrollIntoView({behavior:'smooth'})}>Explore creators <ArrowRight size={17}/></button><button className="text-button" onClick={()=>setShowBrief(true)}><Sparkles size={16}/> Match with AI</button></div>
          <div className="hero-proof"><div className="avatar-stack">{[...officialCreators.slice(0,4)].map(c=><span key={c.id} style={{background:c.color}}>{c.avatar}</span>)}</div><div><strong>Made for creator-first campaigns</strong><span>Telangana + Andhra Pradesh focus</span></div></div>
        </div>
        <div className="hero-art">
          <div className="art-backdrop"></div>
          <div className="creator-orb orb-one"><b>AA</b><small>FILM & CULTURE</small></div>
          <div className="creator-orb orb-two"><b>MH</b><small>COMEDY</small></div>
          <div className="creator-orb orb-three"><b>DP</b><small>LIFESTYLE</small></div>
          <div className="art-sticker sticker-yellow"><Sparkles size={19}/><span>Good vibes.<br/>Great reach.</span></div>
          <div className="art-sticker sticker-white"><span className="sticker-check"><Check size={14}/></span><span><b>It's a match!</b><small>Brand × Creator</small></span></div>
          <div className="art-label"><span>✳</span> THE RIGHT PEOPLE MAKE THE HYPE.</div>
        </div>
        <div className="hero-bottom"><div><b>30+</b><span>public-profile leads</span></div><i></i><div><b>19</b><span>creator categories</span></div><i></i><div><b>2</b><span>states in focus</span></div></div>
      </section>

      <section className="category-strip">
        <div className="section-heading compact-heading"><div><span className="eyebrow">FIND YOUR PEOPLE</span><h2>What’s your <span>vibe?</span></h2></div><button className="see-all" onClick={()=>{setCategory('All creators');document.getElementById('discover-creators')?.scrollIntoView({behavior:'smooth'})}}>All categories <ArrowRight size={15}/></button></div>
        <div className="category-grid">{categories.slice(1,13).map((c,i)=>{const Icon=c.icon;return <button key={c.name} className={'category-tile cat-'+(i%6)+(category===c.name?' selected':'')} onClick={()=>{setCategory(category===c.name?'All creators':c.name);document.getElementById('discover-creators')?.scrollIntoView({behavior:'smooth'})}}><span className="category-icon"><Icon size={19}/></span><span>{c.name}</span><ChevronRight size={14} className="cat-arrow"/></button>})}</div>
      </section>

      <section id="discover-creators" className="creator-section">
        <div className="section-heading"><div><span className="eyebrow">YOUR NEXT COLLAB STARTS HERE</span><h2>Creators worth <span>knowing.</span></h2><p>Explore the demo directory and shortlist your favourites.</p></div><button className="outline-button" onClick={()=>setShowBrief(true)}><WandSparkles size={16}/> Find my match</button></div>
        <div className="search-toolbar"><div className="searchbox"><Search size={19}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search creators, niches, cities..." aria-label="Search creators"/></div><button className={'filter-button '+(showFilters?'filter-active':'')} onClick={()=>setShowFilters(!showFilters)}><SlidersHorizontal size={16}/> Filters {activeFilters>0&&<span>{activeFilters}</span>}</button><label className="sort-select"><span>Sort:</span><select value={sort} onChange={e=>setSort(e.target.value)}><option>Recommended</option><option>Followers: high to low</option><option>Followers: low to high</option><option>Budget: low to high</option></select><ChevronDown size={14}/></label></div>
        {showFilters&&<div className="filter-panel"><label>Platform<select value={platform} onChange={e=>setPlatform(e.target.value)}><option>Any platform</option><option>Instagram</option><option>YouTube</option><option>Both</option></select></label><label>Location<select value={state} onChange={e=>setState(e.target.value)}><option>All locations</option><option>Telangana</option><option>Andhra Pradesh</option></select></label><label>Creator size<select value={size} onChange={e=>setSize(e.target.value)}><option>Any size</option>{sizes.map(s=><option key={s}>{s}</option>)}</select></label><label>Category<select value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c.name}>{c.name}</option>)}</select></label><button className="clear-button" onClick={()=>{setCategory('All creators');setPlatform('Any platform');setState('All locations');setSize('Any size');setQuery('')}}>Clear all</button></div>}
        <div className="results-line"><span><b>{filtered.length.toLocaleString('en-IN')}</b> profiles & sample records</span><span className="demo-note"><i></i> Public-profile leads appear first · metrics need checking</span></div>
        <div className="creator-grid">{filtered.slice(0,visibleCount).map(c=><CreatorCard key={c.id} creator={c} saved={shortlist.includes(c.id)} onSave={()=>toggleShortlist(c.id)} onOpen={()=>setSelected(c)}/>)}</div>
        {filtered.length===0&&<div className="empty-state"><Search size={30}/><h3>No creators found</h3><p>Try another keyword or clear your filters.</p><button className="primary-button" onClick={()=>{setQuery('');setCategory('All creators');setPlatform('Any platform');setState('All locations');setSize('Any size')}}>Reset search</button></div>}
        {filtered.length>visibleCount&&<button className="load-more" onClick={()=>setVisibleCount(n=>Math.min(n+12,filtered.length))}>Load 12 more creators ({Math.max(0,filtered.length-visibleCount).toLocaleString('en-IN')} remaining) <ArrowRight size={16}/></button>}
      </section>
      <section className="cta-band"><div className="cta-icon"><Sparkles size={25}/></div><div><span className="eyebrow">HAVE A CAMPAIGN IN MIND?</span><h2>Let's make some <em>good noise.</em></h2><p>Tell us what you’re building. We’ll line up a shortlist that fits.</p></div><button className="primary-button" onClick={()=>setShowBrief(true)}>Build your campaign brief <ArrowRight size={17}/></button></section>
    </main>}

    {view==='matches'&&<main className="subpage"><div className="page-intro"><span className="eyebrow"><Sparkles size={14}/> SMARTER COLLABS START HERE</span><h1>Your <span>match list.</span></h1><p>Local demo scoring ranks creators against the campaign details you provide. It is a prototype, not an external AI service.</p><button className="primary-button" onClick={()=>setShowBrief(true)}><WandSparkles size={16}/> Edit campaign brief</button></div>{matchResults?<><div className="results-line"><span><b>{matchResults.length}</b> suggested demo matches</span><span className="demo-note"><i></i> Local heuristic ranking</span></div><div className="creator-grid">{matchResults.map(c=><CreatorCard key={c.id} creator={c} saved={shortlist.includes(c.id)} onSave={()=>toggleShortlist(c.id)} onOpen={()=>setSelected(c)} score={c.score}/>)}</div></>:<div className="empty-state"><Target size={36}/><h3>Let’s find your fit.</h3><p>Build a brief to get your first match list.</p><button className="primary-button" onClick={()=>setShowBrief(true)}>Build a campaign brief</button></div>}</main>}

    {view==='shortlist'&&<main className="subpage"><div className="page-intro"><span className="eyebrow"><Heart size={14}/> YOUR SAVED CREATORS</span><h1>Your <span>shortlist.</span></h1><p>Keep promising creator profiles together while you compare options.</p></div>{shortlistCreators.length?<><div className="results-line"><span><b>{shortlistCreators.length}</b> saved demo profiles</span><button className="clear-button" onClick={()=>{setShortlist([]);setToast('Shortlist cleared')}}>Clear shortlist</button></div><div className="creator-grid">{shortlistCreators.map(c=><CreatorCard key={c.id} creator={c} saved onSave={()=>toggleShortlist(c.id)} onOpen={()=>setSelected(c)}/>)}</div></>:<div className="empty-state"><Bookmark size={34}/><h3>Your shortlist is waiting.</h3><p>Tap the bookmark on any creator card to save it here.</p><button className="primary-button" onClick={()=>setView('discover')}>Discover creators <ArrowRight size={16}/></button></div>}</main>}

    <footer className="footer"><div className="footer-brand"><span className="brand-mark small-mark">H<span className="brand-spark">✦</span></span><span><b>HypeMatch</b><small>Right Creator. Right Brand. Right Hype.</small></span></div><p>Creator discovery, reimagined.</p><span className="footer-disclaimer">Prototype · demo profiles · no external creator verification</span><span>© 2026 HypeMatch</span></footer>

    {showBrief&&<div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setShowBrief(false)}}><div className="modal brief-modal" role="dialog" aria-modal="true" aria-labelledby="brief-title"><button className="modal-close" onClick={()=>setShowBrief(false)} aria-label="Close"><X size={20}/></button><div className="modal-kicker"><span><Sparkles size={15}/></span> AI-ASSISTED BRIEF BUILDER</div><h2 id="brief-title">Let’s find your <span>perfect fit.</span></h2><p className="modal-sub">Share a few campaign details. HypeMatch ranks public-profile leads first, then illustrative sample records using local matching logic.</p><form onSubmit={findMatches} className="brief-form"><label>Brand or campaign name<input value={brief.brand} onChange={e=>setBrief({...brief,brand:e.target.value})} placeholder="e.g. Fresh launch, festive drop"/></label><div className="form-row"><label>Campaign goal<select value={brief.goal} onChange={e=>setBrief({...brief,goal:e.target.value})}>{['Brand awareness','Product launch','Sales & conversions','Community growth','Event promotion'].map(x=><option key={x}>{x}</option>)}</select></label><label>Creator category<select value={brief.niche} onChange={e=>setBrief({...brief,niche:e.target.value})}>{niches.map(x=><option key={x}>{x}</option>)}</select></label></div><div className="form-row"><label>Preferred platform<select value={brief.platform} onChange={e=>setBrief({...brief,platform:e.target.value})}>{['Instagram','YouTube','Both'].map(x=><option key={x}>{x}</option>)}</select></label><label>Creator budget<select value={brief.budget} onChange={e=>setBrief({...brief,budget:e.target.value})}>{['Under ₹10,000','₹10,000–₹30,000','₹30,000–₹50,000','₹50,000+'].map(x=><option key={x}>{x}</option>)}</select></label></div><label>Location focus<select value={brief.location} onChange={e=>setBrief({...brief,location:e.target.value})}>{['Telangana + Andhra Pradesh','Telangana','Andhra Pradesh','India-wide'].map(x=><option key={x}>{x}</option>)}</select></label><label>Creative tone<select value={brief.tone} onChange={e=>setBrief({...brief,tone:e.target.value})}>{['Warm & relatable','Bold & energetic','Premium & polished','Funny & playful','Educational & trusted'].map(x=><option key={x}>{x}</option>)}</select></label><div className="brief-tip"><Zap size={16}/><span><b>What happens next?</b> This prototype uses local matching logic. Public profile links and creator metrics should be verified before outreach; sample records are not real people.</span></div><button className="primary-button full-button" type="submit">Generate my match list <ArrowRight size={17}/></button></form></div></div>}

    {selected&&<div className="modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}><div className="modal profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-name"><button className="modal-close" onClick={()=>setSelected(null)} aria-label="Close"><X size={20}/></button><div className="profile-cover" style={{background:selected.color || "#ffb703"}}>{selected.avatarUrl && <img className="profile-public-avatar" src={selected.avatarUrl} alt={`${selected.name} public profile avatar`} onError={e=>{e.currentTarget.style.display='none'}}/>}<div className="profile-avatar-letters">{selected.avatar || "HM"}</div><span className="demo-label">{selected.real ? "PUBLIC PROFILE LEAD" : "ILLUSTRATIVE DEMO"}</span></div><div className="profile-content"><div className="profile-title-row"><div><h2 id="profile-name">{selected.name}</h2><p>{selected.handle} · <MapPin size={13}/> {selected.city}, {selected.state}</p></div><button className={'save-button big-save '+(shortlist.includes(selected.id)?'saved':'')} onClick={()=>toggleShortlist(selected.id)}>{shortlist.includes(selected.id)?<Check size={17}/>:<Bookmark size={17}/>} {shortlist.includes(selected.id)?'Saved':'Save profile'}</button></div><p className="profile-bio">{selected.bio}</p><div className="profile-stats"><div><b>{selected.real ? (selected.rank<=10 ? "Top tier" : "Creator") : compact(selected.followers)}</b><span>{selected.real ? "Discovery priority" : "Sample followers"}</span></div><div><b>{selected.real ? "Check profile" : selected.engagement+"%"}</b><span>{selected.real ? "Current metrics" : "Sample engagement"}</span></div><div><b>{selected.real ? "Confirm direct" : money(selected.budget)}</b><span>{selected.real ? "Rates & availability" : "Sample budget"}</span></div></div><div className="profile-tags"><span>{selected.niche}</span><span>{selected.platform}</span><span>{selected.size}</span></div><div className="profile-warning"><BadgeCheck size={17}/><span>{selected.real ? "Public creator/channel lead. This page does not verify identity, current follower counts, engagement, rates, location or willingness to accept campaigns. Confirm all details from the official profile before outreach." : "Sample data only: this is not a real person or real creator profile. Do not use it for outreach."}</span></div>{selected.profile && selected.verifiedLink && <a className="primary-button full-button profile-link-button" href={selected.profile} target="_blank" rel="noreferrer">Open public profile <ArrowUpRight size={16}/></a>}<button className="primary-button full-button" onClick={()=>{setSelected(null);setShowBrief(true)}}>Match for a campaign <ArrowRight size={16}/></button></div></div></div>}
    {toast&&<div className="toast"><CheckCircle2 size={17}/>{toast}</div>}
  </div>;
}

function CreatorCard({creator:c,saved,onSave,onOpen,score}){
  const isReal=!!c.real;
  return <article className={'creator-card '+(isReal?'real-creator-card':'sample-creator-card')}>
    <button className="card-photo" style={{background:c.color || '#ffd44f'}} onClick={onOpen} aria-label={`View ${c.name} profile details`}>
      {c.avatarUrl && <img className="creator-photo" src={c.avatarUrl} alt={`${c.name} public profile avatar`} loading="lazy" onError={e=>{e.currentTarget.style.display='none'}}/>}<span className="creator-avatar-letters">{c.avatar || 'HM'}</span>
      <span className="photo-caption">{isReal ? 'PUBLIC PROFILE' : 'SAMPLE ONLY'}</span>
      <span className="size-tag">{isReal ? (c.rank<=10?'POPULAR':'DISCOVERY') : c.size}</span>
      {score&&<span className="match-score"><Sparkles size={12}/>{score}% match</span>}
    </button>
    <div className="card-body"><div className="creator-name-row"><button className="creator-name" onClick={onOpen}>{c.name}</button><button className={'save-button '+(saved?'saved':'')} onClick={onSave} aria-label={saved?'Remove from shortlist':'Add to shortlist'}>{saved?<Heart size={17} fill="currentColor"/>:<Bookmark size={17}/>}</button></div>
      <div className="creator-handle">{c.handle} <span>·</span> <MapPin size={12}/>{c.city}</div>
      <div className="creator-tags"><span>{c.niche}</span><span>{c.platform==='Both'?'Instagram + YouTube':c.platform}</span></div>
      <div className="card-metrics"><div><b>{isReal ? (c.rank<=10?'Popular':c.rank<=20?'Established':'Discover') : compact(c.followers)}</b><small>{isReal?'Discovery priority':'Sample followers'}</small></div><div><b>{isReal?'Public link':c.engagement+'%'}</b><small>{isReal?'Open profile to verify':'Sample engagement'}</small></div></div>
      <div className="card-footer"><span>{isReal?<Globe2 size={15}/>:<CircleDollarSign size={15}/>} {isReal?'Public profile lead':money(c.budget)} <small>{isReal?'':'sample'}</small></span>{isReal&&c.verifiedLink?<a href={c.profile} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}>Open profile <ArrowUpRight size={14}/></a>:<button onClick={onOpen}>View details <ArrowUpRight size={14}/></button>}</div>
      <div className="card-demo-warning">{isReal?'Public profile lead · verify current details':'Illustrative sample — not a real creator'}</div>
    </div></article>
}
createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
