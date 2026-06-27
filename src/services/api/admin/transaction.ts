import {tableFetcher} from "@/shared/Table/fetcher";
import {TransactionResponse} from "@/services/types/transaction";

export const transactionTable = tableFetcher<TransactionResponse>("admin/transaction/dataTable");
