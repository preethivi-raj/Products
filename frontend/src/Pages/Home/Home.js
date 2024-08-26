import React, {useEffect, useState} from "react";
import { useMutation } from "@tanstack/react-query";
import Accordion from "../../Common/Accordion";
import Loading from "../../Common/Loading";

const Home = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const {mutate:getAllProducts,isPending} = useMutation({
    queryKey : ["products"],
    mutationFn : async () => {
       try {
        const response = await fetch("http://localhost:5000/api/product",{
          method : "GET",
          credentials : "include",
          headers : {
            "Content-Type" : "application/json",
          }
        });
        const data = await response.json();
        setProducts(data);
        if(!response.ok){
          throw new Error(data.message||"Something went wrong!");
        }
        return data;
       } catch (error) {
        throw new Error(error);
       }
    }
  });

  useEffect(() => {
    getAllProducts();
  },[]);



  return (
    <div className="flex justify-center items-center join join-vertical">
      <div className="m-5" >
      <label className="input input-bordered flex items-center gap-2">
        <input type="text" className="grow w-64" placeholder="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      </div>
      
      {isPending ? <Loading/> : 
       <Accordion products={products.filter( (product)=>product?.name.toLowerCase().includes(search.toLowerCase()))}/>}
    </div>
  );
};

export default Home;
