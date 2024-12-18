import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Lists from "../components/Lists";
import ListAdd from "../components/ListAdd";

const Home = () => {
    const [user, setUser] = useState<UserType>();
    const [lists, setLists] = useState<any[]>([]);
    const [Time, setTime] = useState()

    const navigate = useNavigate();

    const Api = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}Dashboard`, {
                withCredentials: true,
            });

            if (!data.success) {
                if (data.message !=="Time Over") {
                    
                    navigate("/Login");
                }
                else{
                    alert(data.message);
                    navigate("/Payment");
                }

            }
            setUser(data.data.user);
            setTime(data.data.Time);
            setLists(data.data.lists);
        } catch (error) {
            console.log(error);
        }
    };

    const { User } = useSelector((p: any) => p.data);

    useEffect(() => {
        Api();
    }, [User]);
    const [sideShow, setSideShow] = useState<boolean>(false)



    return (
        <div style={{ background: `${user?.Color}` }} className="flex  w-full min-h-screen mt-[-1px]">
            <div>
                <div className=" mt-4 relative" >
                    {
                        sideShow && <div className=" w-72 h-screen z-40 bg-zinc-900 border-2 absolute top-0 left-0">


                        </div>
                    }
                    <div className="text-white cursor-pointer mix-blend-difference absolute z-50 top-3" style={{ right: sideShow ? "-299px" : "-20px" }} onClick={() => setSideShow(p => !p)}>
                        {
                            sideShow ? ">" : "<"
                        }
                    </div>
                </div>
            </div>
            <div>
                <div className="px-2 mb-6 text-white">
                    <h1 className="font-bold text-5xl text-center my-4">DashBoard</h1>
                    <hr />
                    <div className="flex justify-between w-full px-3">
                        <div>Name: {user?.name}</div>

                        <div className="flex gap-3 items-center">
                            <div className="bg-white text-black mix-blend-difference px-3 py-1 rounded-md">
                                {
                                    Time
                                } days
                            </div>
                            <Link to={'/Profile'} className="bg-white text-black w-6 h-6 flex justify-center items-center rounded-full">
                                {user?.name[0]?.toString().toUpperCase()}
                            </Link>
                        </div>
                    </div>
                    <hr />
                </div>
                <Lists lists={lists} setLists={setLists} />
                <ListAdd user={user} />
            </div>

        </div>
    );
};

export default Home;
