type TOrder = {
    id: string;
    userId: string;
    orderDate: string;
    status: string;
    totalPrice: number;
};

type TOrderDetail = {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
};

type TProduct = {
    id: string;
    imageId: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
    categoryId: string;
    subcategoryId: string;
};

type TUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    lastSeen: string;
};

interface Feedback {
    id: string;
    grade: number;
    feedback: string;
    userId: string;
    orderId: string;
    createdAt: string;
}

export type TParsedOrder = {
    status: string;
    productName: string;
    totalPrice: number;
    quantity: number;
    customerName: string;
    orderId: string;
    userId: string;
    productId: string;
    date: string;
    email: string;

};


export type TParsedFeedback = {
    feedback: string;
    customerName: string;
    grade: number;
    productName: string;
    productImage: string;
    productId: string;
    orderId: string;
    userId: string;
    date: string;
}


export type FeedbackData = {
    users: TUser;
    orders: TOrder;
    orderDetails: TOrderDetail;
    products: TProduct;
    feedback: Feedback;
}

export type OrderData = {
    orders: TOrder;
    orderDetails: TOrderDetail;
    products: TProduct;
    users: TUser;
};

