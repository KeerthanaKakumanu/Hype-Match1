import { mkdir, writeFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
const assets=[
 {file:'allu-arjun.jpg',url:'https://commons.wikimedia.org/wiki/Special:FilePath/Allu_Arjun_at_69th_NFA.jpg?width=900',minimumBytes:8000,credit:'Bollywood Hungama; Wikimedia Commons; CC BY 3.0. Source: https://commons.wikimedia.org/wiki/File:Allu_Arjun_at_69th_NFA.jpg'},
 {file:'ss-rajamouli.jpg',url:'https://commons.wikimedia.org/wiki/Special:FilePath/SS_Rajamouli.jpg?width=900',minimumBytes:8000,credit:'Yasshu28; Wikimedia Commons; CC0 1.0. Source: https://commons.wikimedia.org/wiki/File:SS_Rajamouli.jpg'}
];
const dir=join(process.cwd(),'public','images'), credits=join(process.cwd(),'public','credits');
await mkdir(dir,{recursive:true}); await mkdir(credits,{recursive:true});
let failed=false;
for(const a of assets){
 try{
  const r=await fetch(a.url,{headers:{'User-Agent':'HypeMatch demo/2.0 (image attribution included)'}});
  if(!r.ok) throw new Error(`HTTP ${r.status}`);
  if(!(r.headers.get('content-type')||'').startsWith('image/')) throw new Error('Response is not an image');
  const b=Buffer.from(await r.arrayBuffer());
  if(b.length<a.minimumBytes||b[0]!==0xff||b[1]!==0xd8) throw new Error('Image file validation failed');
  const dest=join(dir,a.file); await writeFile(dest,b);
  if((await stat(dest)).size<a.minimumBytes) throw new Error('Local file check failed');
  console.log(`Verified local photo: public/images/${a.file} (${b.length} bytes)`);
 }catch(e){failed=true;console.error(`Could not fetch ${a.file}: ${e.message}`);}
 await writeFile(join(credits,a.file.replace('.jpg','.txt')),a.credit+'\n');
}
if(failed){console.error('Build stopped instead of shipping missing/broken portraits. Retry when Wikimedia Commons is reachable.');process.exit(1);}
