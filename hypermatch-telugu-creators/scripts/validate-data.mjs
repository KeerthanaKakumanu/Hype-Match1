import fs from 'node:fs';
const records=JSON.parse(fs.readFileSync(new URL('../data/creators.json',import.meta.url),'utf8'));
if(!Array.isArray(records)) throw new Error('Creator data must be an array');
const ids=new Set();
for(const c of records){
  for(const field of ['id','name','bio','profileUrl','sourceUrl','sourceName','verificationStatus']) if(!c[field]) throw new Error(`${c.name||'Unknown record'} missing ${field}`);
  if(ids.has(c.id)) throw new Error(`Duplicate id: ${c.id}`); ids.add(c.id);
  for(const key of ['profileUrl','sourceUrl']) if(!/^https:\/\//.test(c[key])) throw new Error(`${c.name}: ${key} must use HTTPS`);
  if(c.isDemo) throw new Error(`${c.name}: demo records are not allowed in the real creator seed data`);
}
console.log(`Validated ${records.length} source-linked Telugu creator/channel records. Source-linked does not mean independently verified or available for hire.`);
