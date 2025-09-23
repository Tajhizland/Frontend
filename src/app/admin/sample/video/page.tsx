"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Panel from "@/shared/Panel/Panel";
import Image from "next/image";
import {useQuery, useQueryClient} from "react-query";
import {toast} from "react-hot-toast";
import {useState} from "react";
import {deleteVideo, getVideo, setVideo} from "@/services/api/admin/sample";
import SampleTab from "@/components/Tabs/SampleTab";
import Input from "@/shared/Input/Input";
import {VlogResponse} from "@/services/types/vlog";
import {search} from "@/services/api/admin/vlog";
import PageLink from "@/shared/PageLink/PageLink";
import NcModal from "@/shared/NcModal/NcModal";
import {TrashIcon} from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Page() {
    const queryClient = useQueryClient();
    const [showModal, setShowModal] = useState(false);
    const [serachResponse, setSearchResponse] = useState<VlogResponse[]>();
    const {data: data, isLoading: isLoading} = useQuery({
        queryKey: [`sample_video`],
        queryFn: () => getVideo(),
        staleTime: 5000,
    });

    async function add(id: number) {

        let response = await setVideo(id)
        if (response?.success) {
            queryClient.refetchQueries(['sample_video']);
            toast.success(response?.message as string);
        }
    }

    async function removeVideo(id: number) {
        let response = await deleteVideo(id)
        if (response?.success) {
            queryClient.refetchQueries(['sample_video']);
            toast.success(response?.message as string);
        }
    }

    async function searchVlog(query: string) {
        let response = await search(query);
        setSearchResponse(response);
    }

    const renderContent = () => {
        return (
            <div>
                <div className="mt-8 relative rounded-md shadow-sm">
                    <Input type={"text"} placeholder="جستجوی نام ویدیو" onChange={(e) => {
                        searchVlog(e.target.value)
                    }}/>
                </div>
                <div className=" mt-5 max-h-96 overflow-y-scroll ">
                    <div className="flex flex-col gap-y-5">
                        {
                            serachResponse && serachResponse.map((item) => (<>
                                <div
                                    className="flex justify-between items-center border shadow  rounded pl-5 cursor-pointer hover:bg-slate-100"
                                    onClick={() => {
                                        add(item.id)
                                    }}>
                                    <div className="w-[100px] h-[100px]">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item.poster}`}
                                            alt={"image"} width={100} height={100}/>
                                    </div>
                                    <span>
                                        {item.title}
                                    </span>
                                </div>
                            </>))
                        }
                    </div>
                </div>
            </div>
        );
    };

    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "پروژه های تجهیز شده",
                href: "sample"
            },
            {
                title: "ویدیو ها",
                href: "sample/video"
            }
        ]}/>
        <Panel>
            <SampleTab/>
            <PageLink>
                <ButtonPrimary onClick={() => {
                    setShowModal(true)
                }}> افزودن</ButtonPrimary>
                <Link href={"/admin/sample/video/sort"}>
                    <ButtonPrimary> سورت کردن</ButtonPrimary>
                </Link>
            </PageLink>
            <NcModal
                isOpenProp={showModal}
                onCloseModal={() => {
                    setShowModal(false)
                }}
                contentExtraClass="max-w-4xl"
                renderContent={renderContent}
                triggerText={""}
                modalTitle="افزودن"
                hasButton={false}
            />
            <div className={"grid grid-cols-1 md:grid-cols-2  xl:grid-cols-5 gap-5  mt-10"}>
                {
                    data?.map((item) => (<>
                        <div className="flex flex-col justify-center items-center gap-y-4 ">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/vlog/${item?.vlog?.poster}`}

                                alt={"image"} width={720} height={100} className="w-full h-full"/>
                            <TrashIcon className="w-8 h-8 text-red-500 cursor-pointer " onClick={() => {
                                removeVideo(item.id)
                            }}/>
                        </div>
                    </>))
                }
            </div>

        </Panel>

    </>)
}
