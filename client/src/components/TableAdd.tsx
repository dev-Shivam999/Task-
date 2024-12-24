import axios from "axios";
import { useState } from "react";


const TableAdd = () => {
const Api=async()=>{
    await axios.get(`${import.meta.env.VITE_API}TableAdd`,{
        withCredentials: true,
    })

}

    const [show,setShow]=useState<Boolean>(false)
    return (
        <div className="p-3  flex gap-3 cursor-pointer border-2 border-white rounded-md w-max  relative  top-[40vh] left-5">
            <div onClick={()=>setShow(p=>!p)} >
                +
            </div>
            {
                show && <div className="flex gap-3" >
                    <input type="text" className="bg-transparent border-2 border-white px-2" placeholder="List Name" />
                    <input type="text" className="bg-transparent border-2 border-white px-2" placeholder="task Name Name" />
                    <button onClick={()=>Api()} className="bg-white text-black px-3 py-1 rounded-md hover:bg-gray-200 transition">Add</button>
                </div>
            }
        </div>
    );
};

export default TableAdd;