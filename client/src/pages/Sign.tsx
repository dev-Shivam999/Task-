import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Sign = () => {
    const navigate = useNavigate();
    const name = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const Api = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (
                name.current?.value !== "" &&
                email.current?.value !== "" &&
                password.current?.value !== ""
            ) {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API}Sign`,
                    {
                        email: email.current?.value,
                        password: password.current?.value,
                        name: name.current?.value,
                    },
                    { withCredentials: true }
                );

                if (data.success) {
                    navigate("/");
                } else {
                    alert(data.message);
                }
            } else {
                alert("Please fill in all the fields.");
            }
        } catch (error) {
            console.error(error);
            alert("Sign-up failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Create Your Account
                </h1>
                <form className="space-y-4" onSubmit={Api}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            ref={name}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            ref={email}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            ref={password}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Sign;
