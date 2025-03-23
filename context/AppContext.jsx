'use client'
import { productsDummyData, userDummyData } from "@/assets/assets";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext)
}

export const AppContextProvider = (props) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY
    const router = useRouter()

    const {isLoaded, user} = useUser();
    const {getToken}= useAuth(); // getToken is a method. with the help of which we can create multiple token for the authentication

    const [products, setProducts] = useState([])
    const [userData, setUserData] = useState(false)
    const [isSeller, setIsSeller] = useState(false)
    const [cartItems, setCartItems] = useState({})

    const fetchProductData = async () => {
        try {
            const {data}=await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products);
            } else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const fetchUserData = async () => {
        try{
            // console.log(user);

            if(user.publicMetadata.role==='seller'){
                setIsSeller(true);
            }

            const token=await getToken();
            // if (!token) {
            //     console.error("Token is null or undefined!");
            // } else {
            //     console.log("Generated Token:", token);
            // }
            const {data}=await axios.get('/api/user/data', {headers: {Authorization: `Bearer ${token}`}});
            // console.log(data);
            // console.log(data);
            if(data.success){
                setUserData(data.user);
                setCartItems(data.user.cartItems)
            } else{
                toast.error(data.message);
            }
        } catch(error){
            toast.error(error.message);
        }   
    }

    const addToCart = async (itemId) => {

        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);

    }

    const updateCartQuantity = async (itemId, quantity) => {

        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData)

    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                totalCount += cartItems[items];
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items];
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    useEffect(() => {
        fetchProductData()
    }, [])

    useEffect(() => {
        // console.log("pagal")
        if (isLoaded) {
            // console.log("Clerk user data loaded:", user);
            if (user) {
                // console.log("User exists, calling fetchUserData...");
                fetchUserData();
            } else {
                // console.log("User is null or undefined.");
            }
        } else {
            // console.log("Clerk user data is still loading...");
        }
    }, [isLoaded, user]);

    // useEffect(() => {
    //     console.log("Triggered! isLoaded:", isLoaded, "user:", user);
    // }, [isLoaded, user]);

    const value = {
        user, getToken,
        currency, router,
        isSeller, setIsSeller,
        userData, fetchUserData,
        products, fetchProductData,
        cartItems, setCartItems,
        addToCart, updateCartQuantity,
        getCartCount, getCartAmount
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
