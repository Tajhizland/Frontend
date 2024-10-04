"use client"
import { useState } from "react";
import ModalViewAllReviews from "./ModalViewAllReviews";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ReviewItem from "@/components/ReviewItem";
import { StarIcon } from "@heroicons/react/24/solid";
import { CommentResponse } from "@/services/types/comment";

export default function ProductComment({ comments }: { comments: CommentResponse[] }) {
    const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] = useState(false);
    return (<>
 
        <div id="reviews" className="scroll-mt-[150px]">
             <h2 className="text-2xl font-semibold flex items-center">
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
            </div>
        </div>
 

        <ModalViewAllReviews
            data={comments}
            show={isOpenModalViewAllReviews}
            onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
        />
    </>)
}