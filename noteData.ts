export interface Note {
  // key: number;
  id: string;
  title: string;
  content: string;
  noteId: string;
  created_at?: any; // href: string;
  tags?: any;
  lastEdited?: string | undefined;
}

 export const noteData: Note[] = [
   {
     // key: 1,
     title: "Welcome",
     content:
       "Get started by clicking the '+' button on the left to add a new note. Remember, this is a demo, and your updates in this notes will disappear after refreshing the page.",
     id: "welcome",
     noteId: "welcome",
     created_at: "2025-01-12T14:30:00Z",
     lastEdited: "2025-01-12T14:30:00Z",
     tags: ["dummy", "placeholder"],
   },
   //  {
   //    // key: 2,
   //    title: "Documentation",
   //    content:
   //      "lorem ipsum dolor sit amet, consectetur adipiscing. more lorem in lore, amet non ante et justo vit meris vit null tempor invid id et ullamcorper lorem et just preceding velit esse molestie et just preceding velit vel augue vel met magna al met mag et just",
   //    id: "documentation",
   //    noteId: "documentation",
   //    created_at: "2025-01-12T14:30:00Z",
   //  },
 ];

;
