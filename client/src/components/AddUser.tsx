import axios from "axios";
import { useEffect, useState } from "react";
import Mail from "./Mail";

interface UserData {
    name: string,
    email: string
    _id: string
}
const AddUser = () => {
    const [Show, SetShow] = useState(false)
    const [user, setUser] = useState<UserData[]>([])
    const [id, setId] = useState('')
    const Api = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API}Friend`, {
            withCredentials: true,
        })
        setUser(data.message[0].userNames)
        setId(data.selfId)
    }

    useEffect(() => {
        if (Show) {
            Api()
        }
    }, [Show])


    return (
        <div className="cursor-pointer" >
            <div onClick={() => SetShow(p => !p)}>
                Add
            </div>
            {
                Show && <div className="absolute w-full z-50 flex justify-center items-center h-screen top-0 left-0 bg-[#00000078]">
                    <div className="bg-blue-950 p-4 w-[700px] min-h-[200px] rounded-lg text-white">
                        <div className="flex  justify-between ">
                            <div>
                                Add users
                            </div>
                            <div onClick={() => SetShow(p => !p)}>
                                X
                            </div>
                        </div>
                        <br />

                        <Mail />
                        {
                            user.length > 0 && user.map(user => <div key={user._id}>
                                {
                                    user._id !== id && <div className="flex gap-5 items-center">
                                        <div className="w-5 h-5 flex justify-center items-center bg-blue-600 p-5 text-white rounded-full">
                                            {
                                                user.name[0]
                                            }
                                        </div>        <div className="font-bold">
                                            {user.name}
                                        </div>
                                    </div>
                                }
                            </div>)
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default AddUser;