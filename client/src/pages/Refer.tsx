import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Refer = () => {
    const navigate = useNavigate();
    const name = useRef<HTMLInputElement>(null);

    const Api = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (
                name.current?.value !== ""
            ) {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API}Refer`,
                    {
                        refer: name.current?.value,
                    },
                    { withCredentials: true }
                );

                if (data.success) {
                    if (data.message =="not  valid") {
                      alert(data.message);  
                    }
                    else{

                        navigate("/");
                    }
                } else {
                    alert(data.message);
                }
            } else {
                alert("Please fill in all the fields.");
            }
        } catch (error) {
            console.error(error);
            alert("Refer-up failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Enter the Refer Code If You Have
                </h1>
                <form className="space-y-4" onSubmit={Api}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Code
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            ref={name}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                    Send
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    
                    <Link to="/" className="text-blue-500 hover:underline">
                    Skip 
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Refer;
