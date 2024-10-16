
export type CartResponse = {
    id:number ;
    count:number ;
    product:{
        name:string ,
        url:string ,
        image:string ,
    };
    color:{
        id:number|string ,
        title:string ,
        code:string ,
        price:number ,
        discount:number ,
        discountedPrice:number ,
    }

};
