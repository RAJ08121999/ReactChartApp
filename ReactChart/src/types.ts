export type TransactionData = {
    id:string;
    date:string;
    amount:number;
    description:string;
};

export type ApiResponse = TransactionData[];

export type CustomTooltipProps = {
    active?:boolean;
    payload?:{
        payload:{
            amount:number;
            description:string;
        };
    }[];
    label:string;
} 