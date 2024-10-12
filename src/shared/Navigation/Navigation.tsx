"use client"
import React from "react";
import NavigationItem from "./NavigationItem";
import { menu } from "@/services/api/shop/menu";
import { useQuery } from "react-query";

    function Navigation() {
 
    const {data, isSuccess} = useQuery({
      queryKey: ['menu'],
      queryFn: () => menu(),
      staleTime: 5000,
  });

   return (
    <ul className="nc-Navigation flex items-center">
      {data?.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
