
export interface NftsInterface {
    title: string,
    id: number,
    description: string,
    owner: number,
    image: string,
    price: string | number,
    created_at: string,
    sales_history: number[],
    categories_trending: number[],
}