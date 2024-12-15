import {atom} from "recoil"

interface ContentItem {
   _id:string
    type: string
    title: string;
    link:string ,
    tags:[],
    description:string
  }
  

 export const contentAtom = atom<ContentItem[]>({
    key: "contentAtom",
    default: [],
  });
  



export const allContentAtom = atom<ContentItem[]>({
  key: "allContentAtom",
  default: [],
});



export const contentRefreshTriggerAtom = atom({
  key: "contentRefreshTriggerAtom",
  default: 0, // Default trigger value
});