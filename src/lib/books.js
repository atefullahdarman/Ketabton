export const API = 'https://gutendex.com/books/';
export const formatNumber = (v) => Number(v || 0).toLocaleString('en-US');
export const authorName = (book) => book?.authors?.map(a => a.name.split(', ').reverse().join(' ')).join(', ') || 'Unknown author';
export const bookCover = (book) => book?.formats?.['image/jpeg'] || null;
export const bookPage = (id, book) => book?.sourceUrl || (String(id).startsWith('ps-') ? '#' : `https://www.gutenberg.org/ebooks/${Number(id)}`);
export const bookSource = (book) => book?.sourceName || 'Project Gutenberg';
export const bookReadingLink = (book) => book?.readUrl || bookPage(book?.id,book);
export const bookDownloadLink = (book) => book?.downloadUrl || bookPage(book?.id,book);
export const languages = [{value:'',label:'All languages'},{value:'en',label:'English'},{value:'fr',label:'French'},{value:'de',label:'German'},{value:'es',label:'Spanish'},{value:'pt',label:'Portuguese'},{value:'it',label:'Italian'},{value:'ps',label:'پښتو · Pashto'}];
export function queryUrl({page=1, search='', topic='', language='', sort='popular', ids='', copyrightOnly=true}={}) {
  const params = new URLSearchParams();
  if (copyrightOnly) params.set('copyright','false');
  if (search?.trim()) params.set('search',search.trim());
  if (topic?.trim()) params.set('topic',topic.trim());
  if (language) params.set('languages',language);
  if (ids) params.set('ids',ids);
  if (sort === 'popular') params.set('sort','popular');
  params.set('page',String(Math.max(1,Number(page)||1)));
  return `${API}?${params.toString()}`;
}
export async function getBooks(options={},signal) {
  const response = await fetch(queryUrl(options), {signal});
  if (!response.ok) throw new Error(`Book service returned ${response.status}`);
  const data = await response.json();
  if (!Array.isArray(data.results)) throw new Error('Book service returned an unexpected response');
  return data;
}
export async function getBook(id,signal) {
  if (!/^\d+$/.test(String(id))) throw new Error('Invalid book ID');
  const response = await fetch(`${API}${id}/`,{signal});
  if (!response.ok) throw new Error(`Book service returned ${response.status}`);
  return response.json();
}
export function getSubject(book) {
  const subject = book?.subjects?.find(Boolean);
  return subject?.split(' -- ').slice(0,2).join(' · ') || 'Classic literature';
}
