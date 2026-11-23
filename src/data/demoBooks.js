// Genuine Project Gutenberg metadata and external source cover images for offline/API-failure catalog.
const specs = [
 [1342,'Pride and Prejudice','Austen, Jane', 'romance',65432],
 [11,"Alice’s Adventures in Wonderland",'Carroll, Lewis','children',62145],
 [84,'Frankenstein; Or, The Modern Prometheus','Shelley, Mary Wollstonecraft','science fiction',43156],
 [1661,'The Adventures of Sherlock Holmes','Doyle, Arthur Conan','mystery',39213],
 [2701,'Moby Dick; Or, The Whale','Melville, Herman','adventure',35123],
 [345,'Dracula','Stoker, Bram','fantasy',32983],
 [98,'A Tale of Two Cities','Dickens, Charles','fiction',27809],
 [174,'The Picture of Dorian Gray','Wilde, Oscar','fiction',25213],
 [43,'The Strange Case of Dr. Jekyll and Mr. Hyde','Stevenson, Robert Louis','mystery',20950],
 [76,'Adventures of Huckleberry Finn','Twain, Mark','adventure',19860],
 [1400,'Great Expectations','Dickens, Charles','fiction',18230],
 [1260,'Jane Eyre: An Autobiography','Brontë, Charlotte','romance',17125],
 [5200,'Metamorphosis','Kafka, Franz','fiction',16393],
 [2554,'Crime and Punishment','Dostoyevsky, Fyodor','fiction',15333],
 [33,'The Scarlet Letter','Hawthorne, Nathaniel','fiction',14250],
 [74,'The Adventures of Tom Sawyer','Twain, Mark','children',13955]
];
export const demoBooks = specs.map(([id,title,author,subject]) => ({
  id, title, authors:[{name:author}], subjects:[subject], bookshelves:[],languages:['en'],copyright:false,
  download_count:null, formats:{'image/jpeg':`https://www.gutenberg.org/cache/epub/${id}/pg${id}.cover.medium.jpg`},
  isDemo:true
}));
// No invented download metrics: the sample catalog does not fabricate popularity.
