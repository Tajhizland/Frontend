import Breadcrump from "@/components/Breadcrumb/Breadcrump";
import Panel from "@/shared/Panel/Panel";
import PageTitle from "@/shared/PageTitle/PageTitle";
import Input from "@/shared/Input/Input";
import Label from "@/components/Label/Label";
import Button from "@/shared/Button/Button";
import ButtonCircle from "@/shared/Button/ButtonCircle";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import ButtonThird from "@/shared/Button/ButtonThird";
import Select from "@/shared/Select/Select";
import {Options} from "sucrase/dist/types/Options-gen-types";
import PageLink from "@/shared/PageLink/PageLink";
import Link from "next/link";

export default function page() {
    return (<>
        <Breadcrump breadcrumb={[
            {
                title: "محصولات",
                href: "product"
            }
        ]}/>
        <Panel>
            <PageTitle>
                مدیریت محصولات
            </PageTitle>
            <PageLink>
                <Link href={"/admin/product/create"} >
                    <ButtonPrimary> ایجاد</ButtonPrimary>
                </Link>
            </PageLink>




        </Panel>
    </>)
}
