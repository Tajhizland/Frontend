
export type CartResponse = {
    id:number ;
    count:number ;
    hasStock:boolean ;
    product:{
        name:string ,
        url:string ,
        image:string ,
    };
    color:{
        id:number|string ,
        title:string ,
        code:string ,
        status:number ,
        delivery_delay:number ,
        price:number ,
        discount:number ,
        discountedPrice:number ,
    }

};
