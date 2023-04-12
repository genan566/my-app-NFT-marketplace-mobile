export type NftTypesValues = {
    id: number,
    title: string,
    description: string,
    price: number | string,
    owner_id: number,
    image: string,
    categories_trending: number[],
    sales_history?: number[],
}
