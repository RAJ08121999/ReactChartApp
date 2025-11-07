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
    <div className="max-w-md mx-auto mt-10 p-6 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Add Transaction
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white font-semibold mb-1">Date:</label>
          <input
            type="date"
            name="date"
            onChange={handleChange}
            value={formData.date}
            required
            className="w-full px-4 py-2 rounded-lg border border-white/50 focus:border-white focus:ring-2 focus:ring-white/40 outline-none transition duration-300"
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-1">Amount:</label>
          <input
            type="number"
            name="amount"
            onChange={handleChange}
            value={formData.amount}
            required
            className="w-full px-4 py-2 rounded-lg border border-white/50 focus:border-white focus:ring-2 focus:ring-white/40 outline-none transition duration-300"
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-1">Description:</label>
          <input
            type="text"
            name="description"
            onChange={handleChange}
            value={formData.description}
            placeholder="Optional"
            className="w-full px-4 py-2 rounded-lg border border-white/50 focus:border-white focus:ring-2 focus:ring-white/40 outline-none transition duration-300"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-4 bg-linear-to-r from-green-400 via-blue-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:scale-105 transform transition duration-300 hover:shadow-xl"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default TransactionForm
