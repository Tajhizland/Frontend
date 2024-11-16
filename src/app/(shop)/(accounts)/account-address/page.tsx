"use client"
import {Fragment, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {changeActiveAddress, getAllAddress} from "@/services/api/shop/address";
import {AddressResponse} from "@/services/types/address";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {Switch} from "@headlessui/react";
import {FaPencil} from "react-icons/fa6";
import AddressForm from "@/components/Address/AddressForm";
import ModalGallery from "@/components/ModalGallery";
import NcModal from "@/shared/NcModal/NcModal";

const AccountOrder = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editAddress, setEditAddress] = useState<AddressResponse>();
    const queryClient = useQueryClient();
    const {data: address} = useQuery({
        queryKey: ['my-address'],
        queryFn: () => getAllAddress(),
        staleTime: 5000,
    });

    const {
        mutateAsync: changeActive,
        isLoading: changeActiveAddressLoading,
        isSuccess: changeActiveAddressSiccess,
    } = useMutation({
        mutationKey: [`changeActiveAddress`],
        mutationFn: (id: number) =>
            changeActiveAddress({id: id}),
        onSuccess: data => {
            queryClient.invalidateQueries(['my-address']);
        }
    });

    const renderItem = (item: AddressResponse) => {
        return <div className={"border rounded-lg flex flex-col p-5 text-neutral-600 text-sm md:text-base gap-y-10"}>
            <div className={"flex items-center justify-between flex-col md:flex-row gap-y-5"}>
              <span>
                  استان :
                  {item.province?.name}
              </span>
                <span>
                    شهر :
                    {item.city?.name}
              </span>
                <span>
                  تلفن :
                    {item.tell}
              </span>
                <span>
                  موبایل :
                    {item.mobile}
              </span>
                <span>
                  کدپستی :
                    {item.zip_code}
              </span>
            </div>

            <div className={"flex  justify-center md:justify-start"}>
                <p>
                    {item.address}
                </p>
            </div>
            <div className={"flex items-center gap-x-5 justify-between"}>
                <div className={"flex items-center gap-x-5 justify-center  md:justify-start"}>
                <span>
                    فعال :
                </span>
                    <Switch
                        onChange={() => {
                            changeActive(item.id)
                        }}
                        disabled={item.active == 1 ? true : false}
                        checked={item.active == 1 ? true : false}
                        className={`${item.active ? "bg-teal-600" : "bg-slate-900"}
          relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-full border-4 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 disabled:cursor-not-allowed`}
                    >
                        <span className="sr-only">فعال</span>
                        <span
                            aria-hidden="true"
                            className={`${item.active ? "-translate-x-5" : "translate-x-0"}
            pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                        />
                    </Switch>
                </div>
                <div className={"cursor-pointer"} onClick={() => {
                    setEditAddress(item);
                    setShowEditModal(true)
                }}>
                    <FaPencil className={"w-8 h-8 text-black"}/>
                </div>
            </div>
        </div>
    }
    const renderContent = () => {
        return <div className={"text-right"}>
            {editAddress && <AddressForm address={editAddress}/>}
        </div>
    }
    const renderCreateContent = () => {
        return <div className={"text-right"}>
            <AddressForm  />
        </div>
    }

    return (
        <>
            <NcModal
                isOpenProp={showCreateModal}
                onCloseModal={() => {
                    setShowCreateModal(false);
                    queryClient.invalidateQueries(['my-address']);
                }}
                contentExtraClass="max-w-4xl"
                renderContent={renderCreateContent}
                triggerText={""}
                modalTitle="آدرس من"
                hasButton={false}
            />


            <NcModal
                isOpenProp={showEditModal}
                onCloseModal={() => {
                    setShowEditModal(false);
                    queryClient.invalidateQueries(['my-address']);
                }}
                contentExtraClass="max-w-4xl"
                renderContent={renderContent}
                triggerText={""}
                modalTitle="آدرس من"
                hasButton={false}
            />

            {/*<ModalGallery isOpenProp={showEditModal}>*/}
            {/*    <div className={"bg-white z-50 flex flex-col"}>*/}
            {/*        {editAddress && <AddressForm address={editAddress}/>}*/}
            {/*    </div>*/}
            {/*</ModalGallery>*/}
            <div className="space-y-10 sm:space-y-12">
                {/* HEADING */}
                <h2 className="text-2xl sm:text-3xl font-semibold">لیست آدرس ها</h2>
                <div>
                    <ButtonPrimary onClick={()=>{setShowCreateModal(true)}}>
                        افزودن آدرس جدید
                    </ButtonPrimary>
                </div>
                {
                    address && address.map((item, index) => (<Fragment key={index}>
                        {renderItem(item)}
                    </Fragment>))
                }
            </div>
        </>
    );
};

export default AccountOrder;
