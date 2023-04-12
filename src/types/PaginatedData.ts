import { NftsInterface } from "./NFTsInterface";
import { SaleHistory } from "./SaleHistoryType";

export interface PaginatedDataNFT {
    results: NftsInterface[],
    count: number,
    next: string,
    previous: string,
}

export interface PaginatedDataSales {
    results: SaleHistory[],
    count: number,
    next: string,
    previous: string,
}