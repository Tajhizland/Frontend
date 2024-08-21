import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Tag from "@/shared/Tag/Tag";
import {Alert} from "@/shared/Alert/Alert";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";

export default function page() {
    return (<>
        <Breadcrump breadcrumb={[ ]}/>
        <Panel>
            <PageTitle>
                داشبورد
            </PageTitle>
            <PageLink>
                <Link href={"/admin/product"} >
                    <ButtonPrimary> مدیریت محصولات </ButtonPrimary>
                </Link>
            </PageLink>
        </Panel>
    </>)
}
