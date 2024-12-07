import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {

    const navigate = useNavigate()
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const Api = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if ( email.current?.value != "" && password.current?.value != "") {


                const { data } = await axios.post(`${import.meta.env.VITE_API}Login`, {
                    email: email.current?.value,
                    password: password.current?.value,
                }, {
                    withCredentials: true
                });
                console.log(data);
                if (data.success) {
                    navigate('/');
                }
            } else {
                alert("fill all the fields")
            }
        } catch (error) {
            console.error(error);
            alert("Failed to sign up. Please try again.");
        }
    }
    return (
        <div>
            <div className=" text-center">
                <h1 className="font-bold text-5xl my-4">Login</h1>
                <Link to={'/sign'} className="text-purple-400">you not have an account</Link>

            </div>
            <form className="border-2 border-zinc-600 flex w-1/2 px-3 my-3 gap-y-4 py-3 mx-auto flex-col" onSubmit={(e) => Api(e)}>
                <input placeholder="Enter your password" type="password" className="border-2 border-zinc-950 p-2 rounded-lg" ref={password} />
                <input placeholder="Enter your email" type="email" className="border-2 border-zinc-950 p-2 rounded-lg" ref={email} />
                <button className="bg-black text-white w-max rounded-md p-2 px-4 mx-auto">Login</button>
            </form>

        </div>
    );
};

export default Login;