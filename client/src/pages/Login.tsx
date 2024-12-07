import { Link } from "react-router-dom";


const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <Link to={'/sign'}>you not have account</Link>
            
        </div>
    );
};

export default Login;