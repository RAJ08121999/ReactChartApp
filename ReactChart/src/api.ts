import axios from "axios";
import type { TransactionData } from "./types";

const baseUrl = "https://reactchartapp-1.onrender.com/transactions";

//fetch data;
export const fetchData = async () =>{
    try{
        const res = await axios.get(baseUrl);
        return res.data;
    }
    catch(error){
        console.log("Error in fetching data",error);
    }
};

// post data;

export const postData = async (data:TransactionData) =>{
    try{
        const res = await axios.post(baseUrl,data);
        return res.data;
    }
    catch(error){
        console.log("Error in posting data",error);
    }
};