
export type CartResponse = {
    id:number ;
    count:number ;
    hasStock:boolean ;
    product:{
        name:string ,
        allow_digipay?:number ,
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
    },
    guaranty:{
        id:number|null,
        name:string|null,
        free:number|null
    }

};
