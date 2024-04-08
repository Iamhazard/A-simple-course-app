interface NavItems {
 value:string;
  label: string;
  href:string;
}

export const NAV_ITEMS:NavItems[] = [
  {
    label: "Home",
      href: `/products?category=ui_kits`,
        value: "home" as const,
    
  },
     
   {
    label: "About Us",
      href: `/products?category=ui_kits`,
        value: "home" as const,
   
  }
    ];

  
