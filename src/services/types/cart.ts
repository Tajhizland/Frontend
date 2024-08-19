
export type CartResponse = {
    id:number ;
    count:number ;
    product:{
        name:string ,
        url:string ,
    };
    color:{
        title:string ,
        code:string ,
        price:string ,
    }

};
