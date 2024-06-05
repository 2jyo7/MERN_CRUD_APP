"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UpdateUser = (params: any) => {
    const [inputUser, setInputUser] = useState<any>({
      name: "",
      email: "",
      message: "",
    });
  const router = useRouter();
    // data fetching single
    const fetchSingleUser = async () => {
      const res = await axios.get(`http://localhost:5000/api/v1/users/oneUser/${params.params.id}`);
      console.log(res);
      setInputUser({
        name: res.data.name,
        email: res.data.email,
        message: res.data.message,
      });
    };
    
    
    useEffect(() => {
      fetchSingleUser();
    }, []);
  
    const handleChange = (e:any) => {
      setInputUser({
        ...inputUser,
        [e.target.name]: e.target.value,
      });
    };
    const handleSubmit = async (e:any) => {
      e.preventDefault();
      console.log(inputUser);
      const res = await axios.put(
        `http://localhost:5000/api/v1/users/updatedUser/${params.id}`,
        inputUser
      );
      setInputUser({
        name: "",
        email: "",
        message: "",
      })
      if (res.status === 200) {
        router.push("/")
      }
      // fetchAllUser();
    };
    return (
      <div className="w-2/3 mx-auto mt-5">
        <form onSubmit={handleSubmit}>
          <h1>Update User</h1>
          <div className="">
            <label className=" text-sm text-gray-500 ">Name</label>
            <input
              type="text"
              name="name"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
              placeholder="Enter name"
              required
              value={inputUser.name}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label className=" text-sm text-gray-500 ">Email</label>
            <input
              type="text"
              name="email"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
              placeholder="Enter email "
              required
              value={inputUser.email}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label className=" text-sm text-gray-500 ">Message</label>
            <input
              type="message"
              name="message"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
              placeholder="Enter Message "
              required
              value={inputUser.message}
              onChange={handleChange}
            />
          </div>
  
          <div className="flex justify-center my-4">
            <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
              Update User
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default UpdateUser;