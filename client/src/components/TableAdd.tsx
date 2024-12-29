import axios from "axios";
import { useRef, useState } from "react";


const TableAdd = ({SetCall }: { SetCall: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const List = useRef<HTMLInputElement>(null)
    const Task = useRef<HTMLInputElement>(null)

    const [show, setShow] = useState<Boolean>(false)
    const Api = async () => {
        if (List.current?.value && Task.current?.value) {
             await axios.post(`${import.meta.env.VITE_API}TableAdd`, {
                List: List.current.value,
                Task: Task.current.value
            }, {
                withCredentials: true,
            })
            List.current.value=""
            Task.current.value=""
            SetCall(p=>!p)
        }
     else alert("fill all the fields")
    }
    return (
        <div className="p-3  flex gap-3 cursor-pointer border-2 border-white rounded-md w-max  fixed  bottom-3 left-5">
            <div onClick={() => setShow(p => !p)} >
                +
            </div>
            {
                show && <div className="flex gap-3" >
                    <input type="text" className="bg-transparent border-2 border-white px-2" ref={List} placeholder="List Name" />
                    <input type="text" className="bg-transparent border-2 border-white px-2" ref={Task} placeholder="task Name Name" />
                    <button onClick={() => Api()} className="bg-white text-black px-3 py-1 rounded-md hover:bg-gray-200 transition">Add</button>
                </div>
            }
        </div>
    );
};

export default TableAdd;