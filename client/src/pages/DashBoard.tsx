import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Lists from "../components/Lists";
import ListAdd from "../components/ListAdd";

const DashBoard = () => {
    const [user, setUser] = useState<UserType>();
    const [lists, setLists] = useState<any[]>([]);

    const navigate = useNavigate();

    const Api = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}Dashboard`, {
                withCredentials: true,
            });

            if (!data.success) {
                navigate("/Login");
            }
            setUser(data.data.user);
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
        <div style={{ background: `${user?.Color}` }} className="flex  min-h-screen mt-[-15px]">
            <div>
                <div className=" mt-4 relative" >
                    {
                        sideShow && <div className=" w-72 h-screen z-40 bg-zinc-900 border-2 absolute top-0 left-0">

                        </div>
                    }
                    <div className="text-white mix-blend-difference absolute z-50 top-3" style={{ right: sideShow ? "-299px" : "-20px" }} onClick={() => setSideShow(p => !p)}>
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
                    <div className="flex justify-between px-3">
                        <div>Name: {user?.name}</div>
                        <div className="bg-white text-black w-6 h-6 flex justify-center items-center rounded-full">
                            {user?.name[0]}
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

export default DashBoard;
