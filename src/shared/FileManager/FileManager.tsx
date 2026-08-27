"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/solid";
import { getFiles, remove, upload } from "@/services/api/admin/fileManager";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import NcImage from "@/shared/NcImage/NcImage";
import Uploader from "@/shared/Uploader/Uploader";
import SimpleUploader from "@/shared/Uploader/SimpleUploader";
import Progress from "@/shared/Progress/Progress";
import Spinner from "@/shared/Loading/Spinner";

type Props = {
    modelId: number;
    modelType: string;
    imagePath?: string;
    showPath?: "name" | "url" | false;
    uploader?: "default" | "simple";
};

const FileManager: React.FC<Props> = ({ modelId, modelType, imagePath, showPath = "name", uploader = "default" }) => {
    const queryClient = useQueryClient();
    const [progress, setProgress] = useState(0);

    const queryKey = ["files", modelType, modelId];
    const folder = imagePath ?? `${modelType}/file`;

    const { data, isLoading } = useQuery({
        queryKey,
        queryFn: () => getFiles({ model_id: modelId, model_type: modelType }),
        staleTime: 5000,
    });

    const invalidate = () => queryClient.invalidateQueries(queryKey);

    const uploadMutation = useMutation(
        (form: FormData) =>
            upload({ model_id: modelId, file: form.get("file") as File, model_type: modelType }, setProgress),
        {
            onSuccess: (response) => {
                toast.success(response?.message as string);
                invalidate();
            },
            onError: () => {
                toast.error("آپلود فایل انجام نشد");
            },
            onSettled: () => setProgress(0),
        }
    );

    const removeMutation = useMutation((fileId: number) => remove(fileId), {
        onSuccess: (response) => {
            toast.success(response?.message as string);
            invalidate();
        },
        onError: () => {
            toast.error("حذف فایل انجام نشد");
        },
    });

    return (
        <>
            <div className="flex flex-col gap-y-4">
                <form action={(form) => uploadMutation.mutate(form)}>
                    {uploader === "simple" ? <SimpleUploader name="file" /> : <Uploader name="file" />}
                    {uploadMutation.isLoading && <Progress progress={progress} />}
                    <ButtonPrimary loading={uploadMutation.isLoading} disabled={uploadMutation.isLoading}>
                        آپلود
                    </ButtonPrimary>
                </form>
            </div>

            {isLoading ? (
                <div className="mt-10 flex justify-center">
                    <Spinner />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 border rounded mt-10">
                    {data?.map((item) => (
                        <div key={item.id} className="flex flex-col justify-center items-center gap-y-4">
                            <div className="relative flex-shrink-0 bg-slate-50 dark:bg-slate-300 rounded-3xl overflow-hidden z-1 group w-96 h-96">
                                <NcImage
                                    alt="file"
                                    containerClassName="flex aspect-w-11 aspect-h-12 w-full h-full"
                                    className="object-cover w-full h-full drop-shadow-xl"
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 40vw"
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${folder}/${item.path}`}
                                />
                            </div>
                            {showPath && (
                                <span className="break-all text-center text-xs">
                                    {showPath === "url"
                                        ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${folder}/${item.path}`
                                        : item.path}
                                </span>
                            )}
                            <TrashIcon
                                className="w-8 h-8 text-red-500 cursor-pointer"
                                onClick={() => removeMutation.mutate(item.id)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};

export default FileManager;
