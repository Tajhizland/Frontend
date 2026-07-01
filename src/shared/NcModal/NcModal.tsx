"use client";
import React, { FC, Fragment, ReactNode, useEffect, useState } from "react";
import { Dialog, Transition, TransitionChild } from "@headlessui/react";
import Button from "@/shared/Button/Button";
import ButtonClose from "@/shared/Button/ButtonClose";

export interface NcModalProps {
  renderContent: () => ReactNode;
  renderTrigger?: (openModal: Function) => ReactNode;
  contentExtraClass?: string;
  contentPaddingClass?: string;
  triggerText?: ReactNode;
  modalTitle?: ReactNode;
  isOpenProp?: boolean;
  onCloseModal?: () => void;
  hasButton?: boolean;
}

const NcModal: FC<NcModalProps> = ({
  renderTrigger,
  renderContent,
  contentExtraClass = "max-w-screen-xl",
  contentPaddingClass = "py-4 px-6 md:py-5",
  triggerText = "Open Modal",
  modalTitle = "Modal title",
  isOpenProp,
  onCloseModal,
  hasButton = true,
}) => {
  let [isOpen, setIsOpen] = useState(!!isOpenProp);

  function closeModal() {
    if (typeof isOpenProp !== "boolean") {
      setIsOpen(false);
    }
    onCloseModal && onCloseModal();
  }

  function openModal() {
    if (typeof isOpenProp !== "boolean") {
      setIsOpen(true);
    }
  }

  useEffect(() => {
    setIsOpen(!!isOpenProp);
  }, [isOpenProp]);

  return (
    <div className="nc-NcModal">
      <>
        {hasButton && (
          <>
            {renderTrigger ? (
              renderTrigger(openModal)
            ) : (
              <Button onClick={openModal}> {triggerText} </Button>
            )}
          </>
        )}
      </>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[200]" onClose={closeModal}>
          {/* بک‌دراپ با بلور شیشه‌ای */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-neutral-900/40 backdrop-blur-md dark:bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-full sm:translate-y-4 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-full sm:translate-y-4 sm:scale-95"
              >
                <Dialog.Panel
                  style={{ direction: "rtl" }}
                  className={`flex w-full max-h-[92vh] transform flex-col overflow-hidden bg-white text-right align-middle shadow-2xl ring-1 ring-black/5 transition-all rounded-t-3xl sm:my-8 sm:max-h-[85vh] sm:rounded-3xl dark:bg-neutral-900 dark:ring-white/10 text-neutral-900 dark:text-neutral-200 ${contentExtraClass}`}
                >
                  {/* دستگیره حالت شیت در موبایل */}
                  <div className="flex justify-center pt-3 sm:hidden">
                    <span className="h-1.5 w-10 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  </div>

                  <div className="relative flex-shrink-0 px-6 py-4 text-center md:py-5">
                    <ButtonClose
                      onClick={closeModal}
                      IconclassName="w-5 h-5 text-neutral-500 dark:text-neutral-300"
                      className="absolute left-3 top-1/2 h-8 w-8 -translate-y-1/2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 sm:left-4"
                    />
                    {modalTitle && (
                      <Dialog.Title
                        as="h3"
                        className="mx-10 text-base font-semibold text-neutral-900 dark:text-neutral-100 lg:text-lg"
                      >
                        {modalTitle}
                      </Dialog.Title>
                    )}
                  </div>

                  <div className="h-px w-full flex-shrink-0 bg-neutral-100 dark:bg-neutral-800" />

                  <div className={`overflow-y-auto pb-[max(1rem,env(safe-area-inset-bottom))] ${contentPaddingClass}`}>
                    {renderContent()}
                  </div>
                </Dialog.Panel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default NcModal;
