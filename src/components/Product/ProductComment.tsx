"use client"
import { useState } from "react";
import ModalViewAllReviews from "./ModalViewAllReviews";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { StarIcon } from "@heroicons/react/24/solid";
import { CommentResponse } from "@/services/types/comment";
import NcModal from "@/shared/NcModal/NcModal";
import CommentModal from "@/components/Modal/CommentModal";
import ReviewItem from "@/components/Product/ReviewItem";

export default function ProductComment({ comments ,productId }: { comments: CommentResponse[] ,productId:number}) {
    const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] = useState(false);
    const [showModal, setShowModal] = useState(false);
    function renderContent(){
        return (<CommentModal productId={productId} />)
    }
    return (<>

        <div id="reviews" className="scroll-mt-[150px]">
            <h2 className="text-2xl font-semibold flex items-center  dark:text-white">
                <StarIcon className="w-7 h-7 mb-0.5" />
                <span className="mr-1.5"> {comments.length} نظر </span>
            </h2>

            <div className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
                    {
                        comments.slice(0, 4).map((item) => (<>
                            <ReviewItem data={
                                {
                                    name: item.user,
                                    date: item.created_at,
                                    comment: item.text,
                                    starPoint: Number(item.rating)
                                }
                            } />
                        </>))
                    }

                </div>

                <ButtonSecondary
                    onClick={() => setIsOpenModalViewAllReviews(true)}

                    className="mt-10 border border-slate-300 dark:border-slate-700 "
                >
                    نمایش همه نظرات
                </ButtonSecondary>
                <ButtonSecondary
                    onClick={() => setShowModal(true)}

                    className="mt-10 border border-slate-300 dark:border-slate-700 mx-2"
                >
                   ثبت نظر
                </ButtonSecondary>
                <NcModal
                    isOpenProp={showModal}
                    onCloseModal={() => { setShowModal(false) }}
                    contentExtraClass="max-w-4xl"
                    renderContent={renderContent}
                    triggerText={"ثبت نظر"}
                    modalTitle="افزودن"
                    hasButton={false}
                />
            </div>
        </div>


        <ModalViewAllReviews
            data={comments}
            show={isOpenModalViewAllReviews}
            onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
        />
    </>)
}
