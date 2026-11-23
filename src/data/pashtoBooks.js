/** Curated verified third-party title metadata. No ebook files are hosted here. */
import catalog from './pashtoCatalog.json';
export const pashtoBooks = catalog.map((entry)=>({
 id:`ps-${entry.id}`,
 title:entry.title,
 authors:[{name:entry.author}],
 formats:{'image/jpeg':entry.coverUrl},
 subjects:[entry.subject], languages:['ps'], bookshelves:[],
 copyright:null, download_count:null,
 sourceUrl:entry.sourceUrl, readUrl:entry.sourceUrl, downloadUrl:entry.sourceUrl,
 sourceName:entry.source, description:entry.description, pages:entry.pages,
 genre:entry.genre, isPashto:true, isExternal:true
}));
export const pashtoGenres = [
 ['all','ټول کتابونه'], ['novel','ناولونه او کیسې'],
 ['poetry','شعر او شاعري'], ['history','تاریخ او میراث'],
 ['technology','کمپیوټر او ټکنالوژي'], ['education','زده کړه او ګرامر'],
 ['literature','ادبیات او فکرونه']
];
export function getPashtoBook(id){return pashtoBooks.find(book=>String(book.id)===String(id))||null;}
export function searchPashtoBooks({search='',genre='all'}={}){
 const needle=search.trim().toLocaleLowerCase();
 return pashtoBooks.filter(book =>
   (genre==='all'||book.genre===genre) &&
   (!needle||`${book.title} ${book.authors[0].name} ${book.subjects.join(' ')} ${book.description}`.toLocaleLowerCase().includes(needle))
 );
}
