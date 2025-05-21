"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import {findById, search, update} from "@/services/api/admin/product";
import {useState} from "react";
import {useParams} from "next/navigation";
import {useQuery, useQueryClient} from "react-query";
import toast from "react-hot-toast";
import GroupTab from "@/components/Tabs/GroupTab";
import {
    addField,
    addProduct,
    deleteField,
    deleteProduct,
    getField,
    getProduct
} from "@/services/api/admin/productGroup";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {FaTrash} from "react-icons/fa";
import Input from "@/shared/Input/Input";
import {ProductResponse} from "@/services/types/product";
import Image from "next/image";
import NcModal from "@/shared/NcModal/NcModal";

export default function Page() {
    const queryClient = useQueryClient();
    const {id} = useParams();

    const {data} = useQuery({
        queryKey: [`group-product`],
        queryFn: () => getProduct(Number(id)),
        staleTime: 5000,
    });

    const [showModal, setShowModal] = useState(false);
    const [serachResponse, setSearchResponse] = useState<ProductResponse[]>();

    async function searchProduct(query: string) {
        let response = await search({query: query});
        setSearchResponse(response);

    }

    const renderContent = () => {
        return (
            <div>

                <div className="mt-8 relative rounded-md shadow-sm">
                    <Input type={"text"} placeholder="جستجوی نام محصول" onChange={(e) => {
                        searchProduct(e.target.value)
                    }}/>
                </div>
                <div className=" mt-5 max-h-96 overflow-y-scroll ">
                    <div className="flex flex-col gap-y-5">
                        {
                            serachResponse && serachResponse.map((item) => (<>
                                <div
                                    className="flex justify-between items-center border shadow  rounded pl-5 cursor-pointer hover:bg-slate-100"
                                    onClick={() => {
                                        submit(item.id)
                                    }}>
                                    <div className="w-[100px] h-[100px]">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${item.images.data[0].url}`}
                                            alt={"image"} width={100} height={100}/>
                                    </div>
                                    <span>
                                        {item.name}
                            </span>
                                </div>
                            </>))
                        }
                    </div>
                </div>
            </div>
        );
    };

    async function submit(productId: number) {
        let response = await addProduct(
            {
                groupId: Number(id),
                productId: productId
            }
        )
        queryClient.refetchQueries(['group-product']);
        toast.success(response?.message as string)
    }

    async function removeHandler(id: number) {
        let response = await deleteProduct(id);
        if (response?.success) {
            queryClient.refetchQueries(['group-product']);
            toast.success(response?.message as string)
        }
    }

    return (<>
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
        <Breadcrump breadcrumb={[
            {
                title: "   محصول گروهی",
                href: "group"
            },
            {
                title: " ویرایش محصول گروهی",
                href: "/"
            }
        ]}/>
        <Panel>
            <PageTitle>
                ویرایش محصول گروهی
            </PageTitle>
            <GroupTab id={id + ""}/>
            <div className={"flex flex-col gap-2"}>

                <ButtonPrimary onClick={() => {
                    setShowModal(true)
                }}>
                    افزودن محصول
                </ButtonPrimary>
            </div>
            <hr/>
            <div className={"flex flex-col gap-2"}>
                {
                    data && data.map((item, index) => (
                        <div key={index} className={"flex justify-between items-center"}>
                            <span>
                                {item?.product?.name}
                            </span>
                            <ButtonPrimary onClick={() => {
                                removeHandler(item.id)
                            }}>
                                <FaTrash/>
                            </ButtonPrimary>
                        </div>
                    ))
                }
            </div>
        </Panel>

    </>)
}
