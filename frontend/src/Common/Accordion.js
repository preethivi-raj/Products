import React from "react";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import baseUrl from "../BaseUrl/baseUrl";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { formatDate } from "../Hook/formatDate";
const Accordion = ({ products }) => {
   
    const queryClient = useQueryClient();  
    const {mutate:deleteProduct} = useMutation({
      queryKey : ['deleteProduct'],
        mutationFn : async (id)=>{
            try {
                const response = await fetch(`${baseUrl}/api/product/delete/${id}`,{
                    method : 'DELETE',
                    credentials : 'include',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({id})
                })
                if(!response.ok){
                    throw new Error('Something went wrong')
                }
                return response.json() 
            } catch (error) {
                throw new Error(error)
            }
        },
        onSuccess : ()=>{
            toast.success('Product Deleted Successfully')
            queryClient.invalidateQueries({queryKey : ["products"]})
            window.location.href = '/'
        }
    });

    const handleDelete = (id)=>{ 
      
      deleteProduct(id);
    }
  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <div className="join join-vertical p-2 w-full min-w-96">
            <div className="collapse collapse-arrow join-item border-base-300 border">
            <div className="flex flex-row">
            <div className="m-2">
                < button className="w-12 btn btn-sm hover:cursor-pointer" onClick={()=>handleDelete(product?._id)}>Delete</button>
                </div>
            <div className="m-2">
               <Link to={`/edit/${product?._id}`} className="w-12 p-1 btn btn-sm  text-smhover:cursor-pointer" >Update</Link>
                </div>
            </div>
              <input type="radio" name="my-accordion-4"  />
              <div className="collapse-title text-xl font-medium uppercase">
                {product?.name}
              </div>
              <div className="collapse-content">
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th></th>
                        <th className="uppercase">Price</th>
                        <th className="uppercase">Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>1</th>
                        <td>Price</td>
                        <td> ₹ {product?.price}</td>
                      </tr>
                      <tr>
                        <th>2</th>
                        <td>Weight</td>
                        <td>{product?.weight}</td>
                      </tr>

                      <tr>
                        <th>3</th>
                        <td>Category</td>
                        <td>{product?.category}</td>
                      </tr>
                      <tr>
                        <th>4</th>
                        <td>CreateAt</td>
                        <td>{formatDate(product?.createdAt)}</td>
                      </tr>
                      <tr>
                        <th>5</th>
                        <td>UpdatedAt</td>
                        <td>{formatDate(product?.updatedAt)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
