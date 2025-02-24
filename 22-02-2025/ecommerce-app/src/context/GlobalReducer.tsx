import { Product } from "../types/productTypes";

export type StateType = {
    cart : Product[];
    products : Product[];
    selectedCategory: string;
};

export type ActionType = 
    | { type: "LOAD_PRODUCTS"; payload: Product[] }
    | {type: "ADD_TO_CART"; payload:Product}
    | {type: "REMOVE_FROM_CART"; payload: number}
    | {type: "ADMIN_ADD_PRODUCT"; payload: Product}
    | {type: "ADMIN_EDIT_PRODUCT"; payload: Product}
    | { type: "FILTER_BY_CATEGORY"; payload: string };

export const GlobalReducer = (state: StateType, action: ActionType):StateType => {
    switch(action.type){
        case "LOAD_PRODUCTS":
            return { ...state, products: action.payload };
        case "ADD_TO_CART":
            return {...state, cart:[...state.cart, action.payload]}
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
        default:
            return state;
    }
}