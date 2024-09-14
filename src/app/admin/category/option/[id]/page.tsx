"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import CategoryTab from "@/components/CategoryTabs/CategoryTab";
import Panel from "@/shared/Panel/Panel";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";
import {findByCategoryId} from "@/services/api/admin/option";
import {useState} from "react";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import OptionForm from "@/app/admin/category/option/[id]/OptionForm";

export default function Page() {
    const [extraOption, setExtraOption] = useState(0);

    const {id} = useParams();
    const {data: data} = useQuery({
        queryKey: [`option-info`],
        queryFn: () => findByCategoryId(Number(id)),
        staleTime: 5000,
    });

    function handleAddForm() {
        setExtraOption(extraOption + 1);
    }
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "دسته بندی",
                href: "category"
            },
            {
                title: "ویرایش دسته بندی",
                href: "category/edit/" + id
            },
            {
                title: "ویرایش ویژگی دسته بندی  ",
                href: "category/option/" + id
            }
        ]}/>
        <Panel>
            <CategoryTab id={id + ""}/>
            {
                data && data.map((option) => (<>
                    <OptionForm option={option}/>
                </>))
            }
            {Array.from({length: extraOption}).map((_, index) => (
                <>
                    <OptionForm />

                </>
            ))}
            <ButtonCircle type="button" className={"w-48 bg-orange-600"} onClick={handleAddForm}>
                +
            </ButtonCircle>

        </Panel>

    </>)
}
