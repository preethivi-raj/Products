import { useState } from "react";
import { Link } from "react-router-dom";


import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";

import { useMutation,useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import baseUrl from "../../BaseUrl/baseUrl";
import Loading from "../../Common/Loading";

const Signin = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	
	const queryClient = useQueryClient()
	const{mutate : login , isError , isPending , error}=useMutation({
		mutationFn :  async({email , password})=>{
			try {
				const res = await fetch(`${baseUrl}/api/auth/login`,{
					method : 'POST',
					credentials: 'include',
					headers : {
						'Content-Type' : 'application/json'
					},
					body : JSON.stringify({email , password})
				})
				const data = await res.json()
				if(!res.ok){
					throw new Error(data.error || 'Something went wrong')
				}
				return data
			} catch (error) {
				throw error
			}
		},
		onSuccess : ()=>{
			toast.success('Login Success')
			queryClient.invalidateQueries({querykey :['authUser']})
		}
	})
	const handleSubmit = (e) => {
		e.preventDefault();
		login(formData);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	

	return (
		<div className='max-w-screen-xl mx-auto flex h-screen'>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='flex gap-4 flex-col' onSubmit={handleSubmit}>
					<h1 className='text-4xl font-extrabold text-center text-white'> Sign In</h1>
					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdOutlineMail />
						<input
							type='email'
							className='grow'
							placeholder='Email'
							name='email'
							onChange={handleInputChange}
							value={formData.email}
						/>
					</label>

					<label className='input input-bordered rounded flex items-center gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
					<button className='btn rounded-full btn-primary text-white'>
						{isPending ? <Loading/> : "Login"}	
					</button>
					{isError && <p className='text-red-500'>{error.message}</p>}
				</form>
				<div className='flex flex-col gap-2 mt-4'>
					<p className='text-white text-lg'>{"Don't"} have an account?</p>
					<Link to='/signup'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Signin;