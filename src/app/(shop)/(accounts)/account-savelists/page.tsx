"use client"
import ProductCard2 from "@/components/ProductCard";
import {PRODUCTS} from "@/data/data";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import {useQuery} from "react-query";
import {getCart} from "@/services/api/shop/cart";
import {getFavorite} from "@/services/api/shop/favorite";
import AdminPagination from "@/shared/Pagination/AdminPagination";
import {useState} from "react";

const AccountSavelists = () => {
    const [page, setPage] = useState(1);
    const {data: favorite} = useQuery({
        queryKey: ['get_favorite', page],
        queryFn: () => getFavorite(page),
        staleTime: 5000,
    });

    function changePageHandle(page: number) {
        setPage(page);
    }

    const renderSection1 = () => {
        return (
            <div className="space-y-10 sm:space-y-12">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-semibold">
                        لیست علاقه مندی ها
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
                    {favorite && favorite.data.map((item) => (
                        <ProductCard2 key={item.id} data={item}/>
                    ))}
                </div>
                <div className="flex !mt-20 justify-center items-center">
                    <AdminPagination currentPage={favorite?.meta?.current_page ?? 1}
                                     totalPages={favorite?.meta?.last_page ?? 1} onPageChange={(p)=>changePageHandle(p)}/>
                </div>
            </div>
        );
    };

    return renderSection1();
};

export default AccountSavelists;
