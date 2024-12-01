"use client"
import { OrderStatus } from "@/app/admin/order/orderStatus";
import Prices from "@/components/Prices";
import { PRODUCTS } from "@/data/data";
import { myOrders } from "@/services/api/shop/order";
import { OrderResponse } from "@/services/types/order";
import { OrderItemResponse } from "@/services/types/orderItem";
import { ProductResponse } from "@/services/types/product";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import AdminPagination from "@/shared/Pagination/AdminPagination";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";

const AccountOrder = () => {
  const [page, setPage] = useState(1);

  const { data: order } = useQuery({
    queryKey: ['my-order' , page],
    queryFn: () => myOrders(page),
    staleTime: 5000,
  });
  function changePageHandle(page: number) {
    setPage(page);
}

  const renderProductItem = (orderItem: OrderItemResponse, index: number) => {
    return (
      <div key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            sizes="100px"
            src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/product/${orderItem.product.images.data[0].url}`}
            alt={orderItem.product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="mr-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-1">{orderItem.product.name}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{orderItem.productColor.color_name}</span>
                  <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span>
                </p>
              </div>
              <Prices className="mt-0.5 ml-2" price={orderItem.price} />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">تعداد</span>
              <span className="inline-block sm:hidden">x</span>
              <span className="mr-2">{orderItem.count}</span>
            </p>

          </div>
        </div>
      </div>
    );
  };

  const renderOrder = (item: OrderResponse) => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 sm:p-8 bg-slate-50 dark:bg-slate-500/5">
          <div>
            <p className="text-lg font-semibold">{item.id}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 sm:mt-2">
              <span>{item.order_date}</span>
              <span className="mx-2">·</span>
              <span className="text-primary-500">{OrderStatus[Number(item.status)]}</span>
            </p>
          </div>

        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
          {
            item.orderItems?.data.map((orderItem, index) => (<>
              {renderProductItem(orderItem, index)}
            </>))
          }
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 sm:space-y-12  dark:text-white">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">تاریخچه سفارشات</h2>
      {order?.data?.map((item) => (<>
        {renderOrder(item)
        }      </>))}

      <div className="flex !mt-20 justify-center items-center">
        <AdminPagination currentPage={order?.meta?.current_page ?? 1}
          totalPages={order?.meta?.last_page ?? 1} onPageChange={(p) => changePageHandle(p)} />
      </div>
    </div>
  );
};

export default AccountOrder;
