import { ColorResponse } from "./color";
import { CommentResponse } from "./comment";

export type ProductResponse = { 
    id:number ;
    name:string ;
    url:string ;
    status:string ;
    view:number ;
    description:string ;
    category:string ;
    min_price:number ;
    rating:number ;
    favorite:boolean ;
    study:string ;
    created_at:string ;
    updated_at:string ;
    colors:ColorResponse [] ;
    comments:CommentResponse[] ;
  };