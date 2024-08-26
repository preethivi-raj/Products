import { useMutation } from "@tanstack/react-query";
import React,{ useState} from "react";
import baseUrl from "../../BaseUrl/baseUrl";
import toast from "react-hot-toast";


const Add = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [weight, setWeight] = useState('')
    const [category, setCategory] = useState('')

    const {mutate:addProduct, error} = useMutation({
        queryKey : ['addProduct'],
        mutationFn : async()=>{
            try {
                const res = await fetch(`${baseUrl}/api/product/create`,{
                    method : 'POST',
                    credentials : 'include',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify({name,price,weight,category})
                })

                const data = await res.json()

                if(!res.ok){
                    throw new Error('Something went wrong')
                }
                return data;
            } catch (error) {
                throw new Error(error)
            }
        },
        onSuccess : ()=>{
            toast.success('Product Updated Successfully')
            setName('')
            setPrice('')
            setWeight('')
            setCategory('')

            window.location.href = '/'
        },
        onError : ()=>{
            toast.error(error.message)
        }   
    })

  return (
    <div>

            <div className="max-w-screen-xl mx-auto flex ">
            <div className="flex-1 flex flex-col justify-center items-center">
            <h1 className='text-4xl m-3 pb-3 font-extrabold text-center text-white'> Add New Product</h1>
            <div className="overflow-x-auto">
            <table className="table ">
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
                              <td>Name</td>
                              <td> <input type="text" placeholder={"Name"} value={name}  onChange={(e)=>{setName(e.target.value)}} className="input input-bordered w-full max-w-xs" /></td>
                            </tr>
                            <tr>
                              <th>2</th>
                              <td>Price</td>
                              <td> <input type="text" placeholder={"Price"} value={price}  onChange={(e)=>{setPrice(e.target.value)}} className="input input-bordered w-full max-w-xs" /></td>
                            </tr>
                            <tr>
                              <th>3</th>
                              <td>Weight</td>
                              <td><input type="text" placeholder={"Weight"} value={weight} onChange={(e)=>{setWeight(e.target.value)}} className="input input-bordered w-full max-w-xs" /></td>
                            </tr>
      
                            <tr>
                              <th>4</th>
                              <td>Category</td>
                              <td><input type="text" placeholder={"Category"} value={category} onChange={(e)=>{setCategory(e.target.value)}} className="input input-bordered w-full max-w-xs" /></td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="flex justify-center p-3 items-center">
                        <button className="btn btn-success  btn-outline w-1/2" onClick={(e)=>{
                            e.preventDefault()
                            addProduct()
                        }} >Add New</button>
                        </div>
                        </div>
      </div>
          </div>
    </div>
  );
};

export default Add;
