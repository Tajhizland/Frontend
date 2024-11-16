"use client"
import React, {FC} from "react";
import Label from "@/components/Label/Label";
import Input from "@/shared/Input/Input";
import Textarea from "@/shared/Textarea/Textarea";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {storeContact} from "@/services/api/admin/contact";
import {toast} from "react-hot-toast";
import {useMutation, useQuery} from "react-query";
import {getProvince} from "@/services/api/shop/province";
import {getCity} from "@/services/api/shop/city";
import Select from "@/shared/Select/Select";
import Maps from "@/components/Map";

const info = [
    {
        title: "🗺 آدرس",
        desc: "تهران ، خیابان جمهوری ، بین خیابان دانشگاه و ابوریحان ، ضلع شمال خیابان جمهوری(لاین خط ویژه) ،پلاک 981 ",
    },
    {
        title: "💌 ایمیل",
        desc: "support@tajhizland.com",
    },
    {
        title: "☎ تلفن",
        desc: <a
            href="tel:02166477790"
        >
            021-66477790-1
        </a>,
    },
    {
        title: "📍 لوکیشن",
        desc: <Maps />,
    },
];
const PageContact = ({}) => {
    async function submitHandle(e: FormData) {
        let response = await storeContact(
            {
                name: e.get("name") as string,
                email: e.get("email") as string,
                message: e.get("message") as string
            }
        )
        toast.success(response.message as string)
    }

    const {data: provinces} = useQuery({
        queryKey: ['province'],
        queryFn: () => getProvince(),
        staleTime: 5000,
    });

    const {
        data: citys,
        mutateAsync: changeProvince,
        isLoading: notifyStockSubmitting,
        isSuccess: notifyStockSuccess,
    } = useMutation({
        mutationKey: [`city`],
        mutationFn: (id: number) =>
            getCity(id),
    });

    return (
        <div className={`nc-PageContact overflow-hidden`}>
            <div className="">
                <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
                    تماس با ما
                </h2>
                <div className="container max-w-7xl mx-auto">
                    <div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-2 gap-12 ">
                        <div className="max-w-sm space-y-8">
                            {info.map((item, index) => (
                                <div key={index}>
                                    <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                                        {item.title}
                                    </h3>
                                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                                </div>
                            ))} 
                        </div>
                        <div>
                            <form className="grid grid-cols-1 gap-6" action={submitHandle} method="post">
                                <label className="block">
                                    <Label>نام</Label>

                                    <Input
                                        placeholder="نام"
                                        type="text"
                                        className="mt-1"
                                        name="name"
                                    />
                                </label>
                                <label className="block">
                                    <Label>ایمیل</Label>

                                    <Input
                                        type="email"
                                        placeholder="ایمیل"
                                        className="mt-1"
                                        name="email"

                                    />
                                </label>
                                <label className="block">
                                    <Label>استان</Label>

                                    <Select name={"province_id"} onChange={(e) => {
                                        changeProvince(Number(e.target.value))
                                    }}>
                                        <option>انتخاب کنید</option>
                                        {
                                            provinces && provinces?.map((item) => (<>
                                                <option value={item.id as number}>
                                                    {item.name}
                                                </option>
                                            </>))
                                        }
                                    </Select>
                                </label>
                                <label className="block">
                                    <Label>شهر</Label>
                                    <Select name={"city_id"} className={"disabled:cursor-not-allowed"} disabled={!citys}>
                                        {
                                            citys && citys?.map((item) => (<>
                                                <option value={item.id}>
                                                    {item.name}
                                                </option>
                                            </>))
                                        }
                                    </Select>
                                </label>
                                <label className="block">
                                    <Label>پیام</Label>

                                    <Textarea name="message" className="mt-1" rows={6}/>
                                </label>
                                <div>
                                    <ButtonPrimary type="submit">ارسال پیام</ButtonPrimary>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};
export default PageContact;
