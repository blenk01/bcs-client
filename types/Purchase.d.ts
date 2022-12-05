export type Purchase = {
    id: string,
    is_checked: boolean,
    customer: {
        id: number,
        stripe_id: string,
    },
    purchased_items: {
        item: {
            name: string,
            price: number,
            id: number,
        }
    }[],
}