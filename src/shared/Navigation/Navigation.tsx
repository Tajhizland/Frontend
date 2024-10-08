import React from "react";
import NavigationItem from "./NavigationItem";
import { menu } from "@/services/api/shop/menu";

  async function Navigation() {
    const response=await menu();
   return (
    <ul className="nc-Navigation flex items-center">
      {response.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
