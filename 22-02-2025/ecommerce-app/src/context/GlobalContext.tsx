import { createContext, ReactNode, useReducer } from "react";
import { GlobalReducer, StateType } from "./GlobalReducer";
import { fetchProducts } from "../api/ProductApi";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/productTypes";

const initialState : StateType = {
    cart: [],
    products: [],
    selectedCategory: "all",
    isAdmin: false
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

    // useEffect(() => {
    //     const getProducts = async () => {
    //         const products = await fetchProducts();
    //         dispatch({type: "LOAD_PRODUCTS", payload: products})
    //     };
    //     getProducts();
    // }, []);

    const { data: products } = useQuery<Product[]>({
        queryKey : ["products"], 
        queryFn: fetchProducts
    });

    if (products && state.products.length === 0) {
        dispatch({ type: "LOAD_PRODUCTS", payload: products });
      }


    console.log("Cart State:", state.cart);
    console.log("Products State:", state.products);

    return (
        <GlobalContext.Provider value={{state,dispatch}}>
            {children}
        </GlobalContext.Provider>
    );
};