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


    // compute cumulative sum and format data
    let cumulative = 0;
    const formattedData = sortedData.map(item => {
      cumulative+=Number(item.amount);
      return {
        ...item,
        uid:`${item.date}-${item.id}`,
        displayDate:new Date(item.date).toLocaleDateString('en-US',{
          month:'short',
          day:'numeric'
        }),
        amount:Number(item.amount),
        cumulativeSum:cumulative
      }
    });

    // Determine line color based on final cumulative sum
    const lineColor = cumulative >= 0 ? "#166534" : "#991b1b";

    const CustomTooltip:React.FC<CustomTooltipProps> = ({ active, payload, }) => {
        if (active && payload && payload.length) {
          const { cumulativeSum, description ,displayDate ,amount } = payload[0].payload;
          return (
            <div
            className="bg-gray-800 text-white p-2 rounded"
            >
              <p>{`Date: ${displayDate}`}</p>
              <p>{`Amount: ${amount}`}</p>
              <p>{`Total: ${cumulativeSum}`}</p>
              <p>{`Description:${description||'will be added'}`}</p>
            </div>
          );
        }
        return null;
      };
      

  return (
    <div className="w-full h-[500px] sm:h-[400px] xs:h-[350px] overflow-x-auto">

      <ResponsiveContainer width="100%" height="100%">

        <LineChart data={formattedData}>

            <CartesianGrid stroke="#ffffff" strokeDasharray= "3 3"/>

            <XAxis 
              dataKey="uid" 
              tickFormatter={(uid) => {
                const item = formattedData.find(d => d.uid === uid);
                return item ? item.displayDate : "";
              }} 
              tick={{ fill: "#ffffff", fontSize: 14 }}
             />

            <YAxis
              tick={{ fill: "#ffffff", fontSize: 14 }} 
            />

            <Tooltip content={<CustomTooltip/>} />

            <Line
              type="monotone"
              dataKey="cumulativeSum"
              stroke={lineColor}
              dot={(props) => {
                const { cx, cy, } = props;
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    r={2}
                    fill={lineColor}
                  />
                );
              }}
            />  
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart
