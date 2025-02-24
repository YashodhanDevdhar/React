import { Product } from "../types/productTypes";

export type StateType = {
    cart : Product[];
    products : Product[];
    selectedCategory: string;
    isAdmin: boolean;
};

export type ActionType = 
    | { type: "LOAD_PRODUCTS"; payload: Product[] }
    | {type: "ADD_TO_CART"; payload:Product}
    | { type: "INCREASE_QUANTITY"; payload: number }
    | { type: "DECREASE_QUANTITY"; payload: number }
    | {type: "REMOVE_FROM_CART"; payload: number}
    | {type: "ADMIN_ADD_PRODUCT"; payload: Product}
    | {type: "ADMIN_EDIT_PRODUCT"; payload: Product}
    | { type: "FILTER_BY_CATEGORY"; payload: string }
    | { type: "ADMIN_LOGIN" }
    | { type: "ADMIN_LOGOUT" };;

export const GlobalReducer = (state: StateType, action: ActionType):StateType => {
    switch(action.type){
        case "LOAD_PRODUCTS":
            return { ...state, products: action.payload };
        case "ADD_TO_CART":
            const existingProduct = state.cart.find((p) => p.id === action.payload.id);

            if (existingProduct) {
                return {
                    ...state,
                    cart: state.cart.map((p) =>
                        p.id === action.payload.id ? { ...p, quantity: p.quantity + 1 } : p
                    ),
                };
            } else {
                return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
            }
        
        case "INCREASE_QUANTITY":
            return {
                ...state,
                cart: state.cart.map((p) =>
                    p.id === action.payload ? { ...p, quantity: p.quantity + 1 } : p
                ),
            };

            case "DECREASE_QUANTITY":
                return {
                    ...state,
                    cart: state.cart
                        .map((p) =>
                            p.id === action.payload ? { ...p, quantity: p.quantity - 1 } : p
                        )
                        .filter((p) => p.quantity > 0), 
                };

        case "REMOVE_FROM_CART":
            return { ...state, cart: state.cart.filter((p) => p.id !== action.payload) };
        case "ADMIN_ADD_PRODUCT":
            return { ...state, products: [...state.products, action.payload] };
        case "ADMIN_EDIT_PRODUCT":
            return {
                ...state,
                products: state.products.map((p) => (p.id === action.payload.id ? action.payload : p)),
              };
        case "FILTER_BY_CATEGORY":
            return { ...state, selectedCategory: action.payload };
        case "ADMIN_LOGIN":
            return { ...state, isAdmin: true };
        case "ADMIN_LOGOUT":
            return { ...state, isAdmin: false };
        default:
            return state;
    }
}