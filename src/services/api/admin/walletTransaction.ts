import {tableFetcher} from "@/shared/Table/fetcher";
import {WalletTransactionResponse} from "@/services/types/walletTransaction";

export const walletTransactionTable = tableFetcher<WalletTransactionResponse>("admin/wallet-transaction/dataTable");
