import { createContext, ReactNode, useEffect, useReducer } from "react";
import { GlobalReducer, StateType } from "./GlobalReducer";
import { fetchProducts } from "../api/ProductApi";

const initialState : StateType = {
    cart: [],
    products: [],
    selectedCategory: "all",
};

export const GlobalContext = createContext<{
    state: StateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});

export const GlobalProvider: React.FC<{children:ReactNode}> = ({children}) => {
    const [state, dispatch] = useReducer(GlobalReducer,initialState);

    useEffect(() => {
        const getProducts = async () => {
            const products = await fetchProducts();
            dispatch({type: "LOAD_PRODUCTS", payload: products})
        };
        getProducts();
    }, []);

    console.log("Cart State:", state.cart);
    console.log("Products State:", state.products);

    return (
        <GlobalContext.Provider value={{state,dispatch}}>
            {children}
        </GlobalContext.Provider>
    );
};