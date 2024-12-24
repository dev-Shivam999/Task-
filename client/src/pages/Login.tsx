import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const Api = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (email.current?.value !== "" && password.current?.value !== "") {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API}Login`,
                    {
                        email: email.current?.value,
                        password: password.current?.value,
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
            alert("Login failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Log In to Trello
                </h1>
                <form className="space-y-4" onSubmit={Api}>
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
                        Log In
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/sign" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
