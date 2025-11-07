import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../api"
import Spinner from "./Spinner";
import { Bar, BarChart, CartesianGrid,
         Cell,
         ResponsiveContainer, 
         Tooltip, 
         XAxis ,
         YAxis,
        } from "recharts";
import type { CustomTooltipProps,} from "../types";

const TransactionChart = () => {
    const { data , isLoading , isError , error } = useQuery({
        queryKey:["transactions"],
        queryFn:fetchData
    });

    if(isLoading) return (<div className="min-h-screen w-full flex justify-center items-center">
      <Spinner/>
    </div>)
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
        displayDate: new Date(item.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric'
        }),
        amount:Number(item.amount),
        uid:`${item.date}-${item.id}`
    }));

    const CustomTooltip:React.FC<CustomTooltipProps> = ({ active, payload, }) => {
        if (active && payload && payload.length) {
          const { amount, description ,displayDate } = payload[0].payload;
          return (
            <div
            className="bg-gray-800 text-white p-2 rounded"
            >
              <p>{`Date: ${displayDate}`}</p>
              <p>
                {`Amount: ${amount}`}
              </p>
              <p>{`Description:${description||'will be added'}`}</p>
            </div>
          );
        }
        return null;
      };
      

  return (
    <div className="w-full h-[500px] sm:h-[400px] xs:h-[350px] overflow-x-auto">

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData}>
            <CartesianGrid stroke="#ffffff" strokeDasharray= "3 3"/>
            <XAxis
              dataKey="displayDate"
              tick={{ fill: "#ffffff", fontSize: 14 }} 
            />
            <YAxis
             tick={{ fill: "#ffffff", fontSize: 14 }} 
            />
            <Tooltip content={<CustomTooltip/>} />
            <Bar
              dataKey="amount"
              barSize={40}>
              {formattedData.map((entry)=>(
                <Cell
                key={entry.uid}
                fill={entry.amount >= 0 ? "#4ade80" : "#f87171"}
                />
              ))}
            </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart
