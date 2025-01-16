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
     title: "The Beginning",
     content:
       "Every great journey starts with a single step, and today marks the beginning of a transformative era in how we capture, organize, and utilize our thoughts and ideas. Our newly launched notetaking app is here to revolutionize your digital workspace, setting a new standard for efficiency, style, and functionality.",
     id: "the-beginning",
     noteId: "the-beginning",
     created_at: "2025-01-12T14:30:00Z",
   },
   {
     // key: 2,
     title: "Documentation",
     content:
       "lorem ipsum dolor sit amet, consectetur adipiscing. more lorem in lore, amet non ante et justo vit meris vit null tempor invid id et ullamcorper lorem et just preceding velit esse molestie et just preceding velit vel augue vel met magna al met mag et just",
     id: "documentation",
     noteId: "documentation",
     created_at: "2025-01-12T14:30:00Z",
   },
   // {
   //   // key: 3,
   //   title: "Thoughts",
   //   content:
   //     "lorem ipsum dolor sit amet, consectetur adipiscing. more lorem in lore, amet non ante et justo vit meris vit null tempor invid id et ullamcorper lorem et just preceding velit esse molestie et just preceding velit vel augue vel met magna al met mag et just",
   //   id: "thoughts",
   // },
   // {
   //   // key: 4,
   //   title: "Schedule",
   //   content:
   //     "lorem ipsum dolor sit amet, consectetur adipiscing. more lorem in lore, amet non ante et justo vit meris vit null tempor invid id et ullamcorper lorem et just preceding velit esse molestie et just preceding velit vel augue vel met magna al met mag et just",
   //   id: "schedule",
   // },
 ];

;
