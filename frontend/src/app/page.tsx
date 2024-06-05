"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [inputUser, setInputUser ] = useState<any>({
    name: "",
    email: "",
    message: "",
  })
  const [userData, setUserData] = useState<any>([]);
  
  
  const handleChange = (e: any) => {
    setInputUser({
      ...inputUser,
      [e.target.name]: e.target.value,
    })
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(inputUser);

    const res = await axios.post("http://localhost:5000/api/v1/users/createdUser", inputUser);
    console.log(res);

    setInputUser({
      name: "",
      email: "",
      message: "",
    })

    fetchAllUsers();
    };
    
    

    const fetchAllUsers = async () => {
      const res = await axios.get("http://localhost:5000/api/v1/users/readAll")
      setUserData(res.data.data);
      
      
    };


    useEffect(() => {
      fetchAllUsers();
    }, []);


    const handleDelete = async (id: any) => {
      const res = await axios.delete(`http://localhost:5000/api/v1/users/deletedUser/${id}`);
      if (res.status === 201) {
        fetchAllUsers();
    };
  }



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <div className="w-2/3 mx-auto mt-5">
      {/* creating form */}
      <form onSubmit={handleSubmit}>
        <h1>Create User</h1>
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
            placeholder="Enter message "
            required
            value={inputUser.message}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-center my-4">
          <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm">
            Send message
          </button>
        </div>
      </form>

      <div className="relative overflow-x-auto shadow-md">
        <table className="w-full text-lg text-center text-gray-500 ">
          <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                SN.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item: any, i: any) => (
              <tr key={item._id} className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item?.name}
                </th>
                <td className="px-6 py-4"> {item?.email}</td>
                <td className="px-6 py-4"> {item?.message}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-x-4 justify-center">
                    <Link
                      href={`/readUser/${item._id}`}
                      className="font-medium text-green-600 dark:text-blue-500 hover:underline"
                    >
                      Read
                    </Link>
                    <Link
                      href={`/updateUser/${item._id}`}
                      className="font-medium text-yellow-400 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="font-medium text-red-500  hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>



    </main>
  );

}