import axios from "axios";
import { useEffect, useState } from "react";

const AddUser = () => {
    const [Show, SetShow] = useState(false)
    const Api=async()=>{
        axios.get(`${import.meta.env.VITE_API}Friend`,{
            withCredentials: true,
        })
    }
    useEffect(()=>{
        if (Show) {
            Api()
        }
    },[Show])
    return (
        <div >
            <div onClick={() => SetShow(p => !p)}>
                Add
            </div>
            {
                Show && <div className="absolute w-screen flex justify-center items-center h-screen top-0 left-0 bg-[#00000078]">
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

                        <input type="email" placeholder="Enter your partner Email ... " className="bg-black p-2 rounded-md" />
                        <button className="bg-slate-700 p-3 rounded-md mx-3">Send E-mail</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default AddUser;