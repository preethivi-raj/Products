import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import baseUrl from "../BaseUrl/baseUrl";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { formatDate } from "../Hook/formatDate";
const Accordion = ({ products }) => {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct } = useMutation({
    queryKey: ["deleteProduct"],
    mutationFn: async (id) => {
      try {
        const response = await fetch(`${baseUrl}/api/product/delete/${id}`, {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Product Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      window.location.href = "/";
    },
  });

  const handleDelete = (id) => {
    deleteProduct(id);
  };
  return (
    <div>
      {products.length === 0 ? <p className="text-2xl text-center mt-28">No Product</p> : (
      <div className="overflow-x-auto">
          <table className="table text-white table-zebra">
               <thead className="text-lg text-white font-bold">
                 <tr className="uppercase">
                   <th>Name</th>
                   <th>Price</th>
                   <th>Weight</th>
                   <th>Category</th>
                   <th>Created At</th>
                   <th>Updated At</th>
                   <th>Delete</th>
                   <th>Update</th>
                 </tr>
               </thead>
               <tbody className="uppercase">
                 {products.map((product) => (
                    <tr>
                     <td> {product?.name}</td>
                     <td> ₹ {product?.price}</td>
                     <td>{product?.weight}</td>
                     <td>{product?.category}</td>
                     <td>{formatDate(product?.createdAt)}</td>
                     <td>{formatDate(product?.updatedAt)}</td>
                     <td>< button className="w-14 btn  btn-error btn-sm hover:cursor-pointer" onClick={()=>handleDelete(product?._id)}>Delete</button></td>
                     <td> <Link to={`/edit/${product?._id}`} className="w-14 p-1 btn btn-success btn-sm  text-smhover:cursor-pointer" >Update</Link></td>

                 </tr>
                ))}
              </tbody>
            </table>
          </div>
          )}
        </div>
  );
};

export default Accordion;

