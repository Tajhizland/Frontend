import type {Metadata} from "next";
import ClientLayout from "./ClientLayout";
export const metadata: Metadata = {robots: {index: false, follow: false}};
export default function Layout({children}: {children: React.ReactNode}) {
    return <ClientLayout>{children}</ClientLayout>;
}
