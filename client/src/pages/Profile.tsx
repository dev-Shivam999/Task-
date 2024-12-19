import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Profile = () => {
    const [date, setdate] = useState({
        Color
            :
            "",
        email
            :
            "",
        name
            :
            "",
        _id
            :
            ""
    })
    const api = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API}Profile`, {
            withCredentials: true
        })
        console.log(data);
        if (data.success) {
            setdate(data.message)
        }

    }
    useEffect(() => {
        api()
    }, [])
    return (
        <div style={{ backgroundColor: date.Color }} className="text-white   px-5 py-6 mix-blend-difference min-h-screen">


            <div className="flex items-center gap-3">
                <Link to={'/'} className="bg-white mix-blend-difference rounded-full w-40 h-40 flex flex-wrap justify-center items-center text-black text-6xl">
                    {
                        date.name[0]?.toString().toLocaleUpperCase()
                    }
                </Link>
                <div>

                    UserName :  {
                        date.name
                    }
                    <br />
                    UserEmail :  {
                        date.email
                    }
                    <br />
                    UserDefaultColor :  {
                        date.Color
                    }

                </div>
           </div>

           <Link to={`/Edits/${date._id}`}  className=" border-2 rounded-md px-3 py-1 relative left-3/4">pen</Link>
        </div>
    );
};

export default Profile;