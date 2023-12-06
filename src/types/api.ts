export type Product = {
    id: string;
    imageId: string;
    name: string;
    price: number;
    description: string | null;
    quantity: number | null;
    categoryId: string | null;
    subcategoryId: string | null;
}

export type OrderDetails = {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    imageId: string;
}

export type Order = {
    id: string;
    userId: string;
    orderDate: string;
    status: string;
    totalPrice: number;
}

export type ViewOrder = {
    orderDetails: OrderDetails
    products: Product
    orders: Order
}

type Feedback = {
    id: string;
    grade: number;
    feedback: string;
    userId: string;
    orderId: string;
    createdAt: string;
}

export type ViewOrderWithFeedback = ViewOrder & {
    feedback: Feedback | null;
}


