"use client";

import { Route } from "next";
import { me } from "@/services/api/auth/me";
import {setUser, useUser} from "@/services/globalState/GlobalState";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { FC } from "react";
import { useQuery } from "react-query";
import Image from "next/image";
import avatar from "@/images/avatar.svg";

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
  },  {
    name: "کیف پول",
    link: "/account-wallet",
  },
  {
    name: "لیست علاقه مندی",
    link: "/account-savelists",
  },
  {
    name: "آدرس های من",
    link: "/account-address",
  },{
    name: "سفارش ها",
    link: "/account-order",
  },
  {
    name: "سفارش های معلق",
    link: "/account-order-on-hold",
  },
  {
    name: "تغییر رمز عبور",
    link: "/account-password",
  }
];

const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const router = useRouter();
  const [user] = useUser();

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
    <div className="nc-AccountCommonLayout  dark:bg-neutral-900 container">
      <div className="pt-7 sm:pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 flex-wrap flex-col justify-center">
            <div className="relative rounded-full overflow-hidden flex w-20 h-20 shrink-0">
              <Image
                  src={(user?.avatar) ?
                      `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/avatar/${user?.avatar}`
                      : avatar
                  }

                  alt="avatar"
                  width={128}
                  height={128}
                  className=" w-20 h-20 rounded-full object-cover z-0"
              />
            </div>
            <div>
              <span className={"text-slate-600"}>
                {user?.name}
              </span>
            </div>

          </div>
          <hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>

          <div className="flex gap-x-8 md:gap-x-10 overflow-x-auto hiddenScrollbar">
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
