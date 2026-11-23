/** Genuine published-edition cover lookup with source-aware fallbacks.
 * No unrelated stock photos or AI-generated book covers are presented as originals.
 * If all image providers are unreachable, show a clearly labelled preview placeholder.
 */
const editionISBN = {
  1342:'9780141439518',11:'9780141321073',84:'9780141439471',
  1661:'9780140437713',2701:'9780142437247',345:'9780141439846',
  98:'9780141439600',174:'9780141439570',43:'9780141439730',
  76:'9780142437179',1400:'9780141439563',1260:'9780141441146',
  5200:'9780553213690',2554:'9780140449136',33:'9780142437261',74:'9780143039563'
};
function openLibraryISBN(isbn){return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`;}
function sourceVariants(source){
 if(!source)return [];
 try{
  const url = new URL(source);
  if(/ketabton\.com$/i.test(url.hostname)){
   return [`https://mail.ketabton.com${url.pathname}`,`https://www.ketabton.com${url.pathname}`,`https://ketabton.com${url.pathname}`];
  }
 }catch{}
 return [source];
}
export function coverCandidates(book){
 const id=Number(book?.id);
 const fromRecord=book?.formats?.['image/jpeg'];
 const candidates=[];
 if(book?.isPashto){candidates.push(...sourceVariants(fromRecord));}
 else{
   if(editionISBN[id])candidates.push(openLibraryISBN(editionISBN[id]));
   if(fromRecord)candidates.push(fromRecord);
 }
 return [...new Set(candidates.filter(Boolean))];
}
export async function findOpenLibraryCover(book,signal){
 if(book?.isPashto)return null;
 const title=String(book?.title||'').split(';')[0].trim();
 if(!title)return null;
 const author=book?.authors?.[0]?.name||'';
 const params=new URLSearchParams({title,author,fields:'cover_i,key,title',limit:'3'});
 const response=await fetch(`https://openlibrary.org/search.json?${params}`,{signal});
 if(!response.ok)return null;
 const data=await response.json();
 const match=data.docs?.find(item=>item.cover_i);
 return match?.cover_i ? `https://covers.openlibrary.org/b/id/${match.cover_i}-L.jpg?default=false` : null;
}
