import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";


const Sign = () => {
    const navigate = useNavigate()
    const name = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const Api = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (name.current?.value != "" && email.current?.value != "" && password.current?.value != "") {


                const { data } = await axios.post(`${ import.meta.env.VITE_API }Sign`, {
                    email: email.current?.value,
                    password: password.current?.value,
                    name: name.current?.value,
                }, {
                    withCredentials: true
                });
                console.log(data);
                if (data.success) {
                    navigate('/');
                }else{
                    alert(data.message);
                }
            }else{
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
                <h1 className="font-bold text-5xl my-4">Sign</h1>
                <Link to={'/Login'} className="text-purple-400">you have an account</Link>

            </div>
            <form className="border-2 border-zinc-600 flex w-1/2 px-3 my-3 gap-y-4 py-3 mx-auto flex-col" onSubmit={(e) => Api(e)}>
                <input placeholder="Enter your name" type="text" className="border-2 border-zinc-950 p-2 rounded-lg" ref={name} />
                <input placeholder="Enter your password" type="password" className="border-2 border-zinc-950 p-2 rounded-lg" ref={password} />
                <input placeholder="Enter your email" type="email" className="border-2 border-zinc-950 p-2 rounded-lg" ref={email} />
                <button className="bg-black text-white w-max rounded-md p-2 px-4 mx-auto">Sign</button>
            </form>

        </div>
    );
};

export default Sign;