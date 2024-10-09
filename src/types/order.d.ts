export interface IOrder {
    order: Order;
}

export interface Order {
    id: string;
    amount: string;
    description: string;
    itemAmount: string;
    localTaxRegistrationId?: string;
    merchantCategoryCode?: string;
    surchargeAmount?: string;
    item: Item[];
}

export interface Item {
    brand?: string;
    category: string;
    description: string;
    industryCategory?: string;
    name: string;
    quantity: string;
    sku?: string;
    unitDiscountAmount?: string;
    unitOfMeasure?: string;
    unitPrice: string;
    unitTaxAmount?: string;
}
