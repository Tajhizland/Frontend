"use client";

import { Route } from "@/routers/types";
import { me } from "@/services/api/auth/me";
import { setUser } from "@/services/globalState/GlobalState";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FC } from "react";
import { useQuery } from "react-query";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const pages: {
  name: string;
  link: Route;
}[] = [
  {
    name: "حساب کاربری",
    link: "/account",
  },
  {
    name: "لیست علاقه مندی",
    link: "/account-savelists",
  },
  {
    name: "سفارشات من",
    link: "/account-order",
  },
  {
    name: "تغییر رمز عبور",
    link: "/account-password",
  }
];

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const router = useRouter();

  const hasCookie=getCookie("token")
  if(!hasCookie)
  {  router.push("/login")}
  const { data, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: () => me(),
    staleTime: 5000,
    onSuccess: (user) => {
      setUser(user);
    }
    ,
    onError: (error) => {
      router.push("/login")
    }
  });

  return (
    <div className="nc-AccountCommonLayout container">
      <div className="mt-14 sm:mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-3xl xl:text-4xl font-semibold">حساب کاربری</h2>
        
          </div>
          <hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>

          <div className="flex gap-x-8 md:gap-x-14 overflow-x-auto hiddenScrollbar">
            {pages.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.link}
                  className={`block py-5 md:py-8 border-b-2 flex-shrink-0 text-sm sm:text-base ${
                    pathname === item.link
                      ? "border-primary-500 font-medium text-slate-900 dark:text-slate-200"
                      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <hr className="border-slate-200 dark:border-slate-700"></hr>
        </div>
      </div>
      <div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;
