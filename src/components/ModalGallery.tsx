"use client";
import React, {FC, Fragment, ReactNode, useEffect, useState} from "react";
import {Dialog, Transition, TransitionChild} from "@headlessui/react";
import {RiCloseCircleLine, RiCloseLine} from "react-icons/ri";

export interface ModalProps {
    children: ReactNode;
    contentExtraClass?: string;
    isOpenProp?: boolean;
    CloseModal?: () => void;
}

const Modal: FC<ModalProps> = ({
                                   children,
                                   contentExtraClass = " ",
                                   isOpenProp,
                                   CloseModal
                               }) => {
    let [isOpen, setIsOpen] = useState(!!isOpenProp);

    function closeModal() {
        CloseModal && CloseModal();
    }


    return (
        <div className="nc-Modal">


            <Transition appear show={isOpenProp} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className={"absolute top-5 right-5   lg:top-10 lg:right-10  z-50 cursor-pointer"}  onClick={CloseModal}>
                        <RiCloseLine className={"w-8 h-8  text-white transition-all hover:opacity-50 cursor-pointer"}/>
                    </div>
                    <div className="  px-1 text-center md:px-4">
                        <TransitionChild
                            enter="ease-out duration-75"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-75"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-75  backdrop-blur-lg  "/>
                        </TransitionChild>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block  align-middle"
                            aria-hidden="true"
                        >
              &#8203;
            </span>
                        <TransitionChild
                            enter="ease-out duration-75"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-75"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                                    {children}
                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Modal;
