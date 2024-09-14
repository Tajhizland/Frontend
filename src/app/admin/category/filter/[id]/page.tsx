"use client"
import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import CategoryTab from "@/components/CategoryTabs/CategoryTab";
import Panel from "@/shared/Panel/Panel";
import {useParams} from "next/navigation";
import {useQuery} from "react-query";
import {findByCategoryId} from "@/services/api/admin/filter";
import FilterForm from "@/app/admin/category/filter/[id]/FilterForm";
import {useState} from "react";
import ButtonCircle from "@/shared/Button/ButtonCircle";

export default function Page() {
    const [extraFilter, setExtraFilter] = useState(0);

    const {id} = useParams();
    const {data: data} = useQuery({
        queryKey: [`filter-info`],
        queryFn: () => findByCategoryId(Number(id)),
        staleTime: 5000,
    });

    function handleAddForm() {
        setExtraFilter(extraFilter + 1);
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
                title: "ویرایش فیلتر دسته بندی  ",
                href: "category/filter/" + id
            }
        ]}/>
        <Panel>
            <CategoryTab id={id + ""}/>
            {
                data && data.map((filter) => (<>
                    <FilterForm filter={filter}/>
                </>))
            }
            {Array.from({length: extraFilter}).map((_, index) => (
                <>
                    <FilterForm/>
                </>
            ))}
            <ButtonCircle type="button" className={"w-48 bg-orange-600"} onClick={handleAddForm}>
                +
            </ButtonCircle>

        </Panel>

    </>)
}
