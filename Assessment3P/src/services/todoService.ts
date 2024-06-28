import create from "./httpServices";


export interface Todo{
    id:number;
    title:string;
}

export default create('/todos')