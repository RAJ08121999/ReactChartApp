import { useState } from "react"
import type { TransactionData } from "../types"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../api";


const TransactionForm = () => {
    const [formData , setFormData ] = useState<TransactionData>({
        id:"",
        date:"",
        amount:0,
        description:""
    });

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        e.preventDefault();
        const {name , value } = e.target;

        setFormData((prev)=>({
            ...prev,
            [name]:name==="amount"? Number(value):value,
        }));
    };

    function handleSubmit(e:React.FormEvent){
        e.preventDefault();
        postDataMutation.mutate(formData);

        const newTransactions = {
            ...formData,
            id:Date.now().toString(),
        };

        console.log(`Submitting:${newTransactions}`);

        setFormData({
            id: "",
            date: "",
            amount: 0,
            description: "",
        });
    };
  
    const queryClient = useQueryClient();

    const postDataMutation = useMutation({
      mutationFn:(formData:TransactionData)=>postData(formData),
      onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:["transactions"]});
      },
    });


  return (
    <div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <label>Date:</label>
        <input type="date" name = "date" onChange={(e)=>handleChange(e)} value={formData.date} required />

        <label>Amount:</label>
        <input type="number" name = "amount" onChange={(e)=>handleChange(e)} value={formData.amount} required />

        <label>Description:</label>
        <input type="text" name="description" onChange={(e)=>handleChange(e)} value={formData.description}/>

        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default TransactionForm
