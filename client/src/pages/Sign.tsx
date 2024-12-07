import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";


const Sign = () => {
    const navigate=useNavigate()
    const name = useRef<HTMLInputElement>(null)
    const email = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)
    const Api = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/api/Sign', {
                email: email.current?.value,
                password: password.current?.value,
                name: name.current?.value,
            }, {
                withCredentials: true
            });
            console.log(data);
            if (data.success) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            alert("Failed to sign up. Please try again.");
        }
    }

    return (
        <div>
            <h1>Sign</h1>
            <Link to={'/Login'}>you have an account</Link>

            <form onSubmit={(e) => Api(e)}>
                <input type="text" ref={name} />
                <input type="text"  ref={password}/>
                <input type="text"  ref={email}/>
<button>Sign</button>
            </form>

        </div>
    );
};

export default Sign;