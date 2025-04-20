 import React, { FC } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import Checkbox from "@/shared/Checkbox/Checkbox";
import Input from "@/shared/Input/Input";
 import Label from "@/shared/Label/Label";
 import {MdOutlineAlternateEmail} from "react-icons/md";
 import Select from "@/shared/Select/Select";
 import {FaPhone} from "react-icons/fa";
 import {setUser, useUser} from "@/services/globalState/GlobalState";
 import {me, update} from "@/services/api/auth/me";
 import {toast} from "react-hot-toast";
 import {useQuery, useQueryClient} from "react-query";
 import {deleteCookie, getCookie} from "cookies-next";

interface Props {
  isActive: boolean;
  onOpenActive: () => void;
  onCloseActive: () => void;
}

const ContactInfo: FC<Props> = ({ isActive, onCloseActive, onOpenActive }) => {
    const [user] = useUser();
    const queryClient = useQueryClient();


    const {data, isSuccess} = useQuery({
        queryKey: ['user'],
        queryFn: () => me(),
        staleTime: 5000,
        enabled: !!getCookie("token"),
        onSuccess: (user) => {
            setUser(user);
        },
        onError: () => {
            deleteCookie("token");
        }
    });

    async function submit(e: FormData) {
        let response = await update({
            name: e.get("name") as string,
            email: e.get("email") as string,
            gender: e.get("gender") as string,
            last_name: e.get("last_name") as string,
            national_code: e.get("national_code") as string,
            avatar: e.get("avatar") as File
        })
        if (response?.success) {
            toast.success(response?.message as string);
            queryClient.invalidateQueries([`user`]);
        }
    }
    const renderAccount = () => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row items-start p-6 justify-between  sm:items-center">
            <div className={"flex items-center"}>
          <span className="hidden sm:block">
            <svg
              className="w-6 h-6 text-slate-700 dark:text-slate-400 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="sm:mr-8">
            <h3 className=" text-slate-700 dark:text-slate-300 flex ">
              <span className="uppercase tracking-tight">مشخصات کاربری</span>

            </h3>
          </div>
            </div>
          <button
            className="py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0   text-sm font-medium rounded-lg"
            onClick={() => onOpenActive()}
          >
            ویرایش
          </button>
        </div>
        <div
          className={`border-t border-slate-200 dark:border-slate-700 px-6 py-7 space-y-4 sm:space-y-6 ${
            isActive ? "block" : "hidden"
          }`}
        >
            <form action={submit}>
            <div className="flex-grow mt-10 md:mt-0 md:pr-16 max-w-3xl space-y-6  w-full">
                <div>
                    <Label>نام </Label>
                    <Input className="mt-1.5" defaultValue={user?.name} name={"name"}/>
                </div>
                <div>
                    <Label>نام خانوادگی </Label>
                    <Input className="mt-1.5" defaultValue={user?.last_name} name={"last_name"}/>
                </div>
                <div>
                    <Label>کد ملی </Label>
                    <Input className="mt-1.5" defaultValue={user?.national_code} name={"national_code"}/>
                </div>

                {/* ---- */}

                {/* ---- */}
                <div>
                    <Label>ایمیل</Label>
                    <div className="mt-1.5 flex">
                <span
                    className="inline-flex items-center px-2.5 rounded-r-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                  <MdOutlineAlternateEmail/>

                </span>
                        <Input
                            className="!rounded-r-none"
                            placeholder="example@email.com"
                            name={"email"}
                            defaultValue={user?.email}
                        />
                    </div>
                </div>
                <div>
                    <Label>جنسیت</Label>
                    <Select className="mt-1.5" name={"gender"} defaultValue={user?.gender}>
                        <option value="1" selected={user?.gender == 1}>مرد</option>
                        <option value="0" selected={user?.gender == 0}>زن</option>
                    </Select>
                </div>

                {/* ---- */}
                <div>
                    <Label>شماره همراه</Label>
                    <div className="mt-1.5 flex">
                <span
                    className="inline-flex items-center px-2.5 rounded-r-2xl border border-r-0 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 text-sm">
                <FaPhone/>

                </span>
                        <Input name={"mobile"} className="!rounded-r-none" defaultValue={user?.username}
                               readOnly/>
                    </div>
                </div>

                <div className="pt-2">
                    <ButtonPrimary>ویرایش</ButtonPrimary>
                </div>
            </div>
            </form>
        </div>
      </div>
    );
  };

  return renderAccount();
};

export default ContactInfo;
