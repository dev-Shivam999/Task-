import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Lists from "../components/Lists";
import ListAdd from "../components/ListAdd";
import UseContext from "../context/context";

const Home = () => {
    const [user, SetUser] = useState<UserType>()
    const [List, SetList] = useState<String[]>([])

    const { userInfo }: any = useContext(UseContext)
    const navigate = useNavigate()
    const Api = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}Dashboard`, {
                withCredentials: true
            })


            if (!data.success) {
                navigate('/Login')
            }
            SetUser(data.data.user);
            SetList(data.data.lists);
        } catch (error) {
            console.log(error);

        }

    }






    useEffect(() => {
        Api()
    }, [userInfo])

    return (
        <div style={{ background: `${user?.Color}` }} className="min-h-screen mt-[-15px]">
            <div className="px-2 mb-6  text-white">
                <h1 className="font-bold text-5xl text-center my-4">  DashBoard</h1>
                <hr />

                <div className="flex justify-between px-3">
                    <div>
                        Name:{
                            user?.name
                        }
                    </div>
                    <div className="bg-white text-black  w-6 h-6 flex justify-center items-center rounded-full ">
                        {user?.name[0]}
                    </div>
                </div>

                <hr />
            </div>
            <div className="flex flex-wrap gap-3">

                {
                    List?.length > 0 ? List.map((p: any, i) => <Lists key={i} p={p} />) : <>
                        Add List
                    </>
                }
                <ListAdd user={user} />


            </div>
        </div>
    );
};

export default Home;