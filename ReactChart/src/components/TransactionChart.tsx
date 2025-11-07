import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../api"
import Spinner from "./Spinner";
import { CartesianGrid,
         Line, 
         LineChart, 
         ResponsiveContainer, 
         Tooltip, 
         XAxis ,
         YAxis,
        } from "recharts";
import type { CustomTooltipProps } from "../types";

const TransactionChart = () => {
    const { data , isLoading , isError , error } = useQuery({
        queryKey:["transactions"],
        queryFn:fetchData
    });

    if(isLoading) return <Spinner/>
    if(isError) return <p>Error in fetching data {error.message}</p>

    if(!data || data.length === 0 ){
        return <p> No transaction found </p>
    }

    // sort data by date;

    const sortedData = [...data].sort(
        (a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // ensure date is formatted as a string 

    const formattedData = sortedData.map(item => ({
        ...item,
        date: new Date(item.date).toISOString().split("T")[0]
    }));

    const CustomTooltip:React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          const { amount, description } = payload[0].payload;
          return (
            <div
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                padding: "8px",
                borderRadius: "8px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <p style={{ margin: 0, fontWeight: "bold" }}>Date: {label}</p>
              <p style={{ margin: 0, color: amount >= 0 ? "green" : "red" }}>
                Amount: {amount}
              </p>
              <p style={{ margin: 0 }}>{description}</p>
            </div>
          );
        }
        return null;
      };
      

  return (
    <div className="w-full h-[600px]">

      <ResponsiveContainer width="100%" height={450} >
        <LineChart data={formattedData}>
            <CartesianGrid stroke="#ccc" strokeDasharray= "3 3"/>
            <XAxis dataKey="date"/>
            <YAxis/>
            <Tooltip content={(props) => <CustomTooltip {...(props as CustomTooltipProps)} />} />
            <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#4ade80" 
            strokeWidth={2} 
            dot={{ r: 5 }}
            activeDot={{r:8}}
            />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart
