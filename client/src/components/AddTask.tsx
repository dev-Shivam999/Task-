import axios from 'axios';
import  { useContext, useRef, useState } from 'react';
import UseContext from '../context/context';

const AddTask = ({p}:{p:any}) => {


    const [AddTask, SetAddTask] = useState<Boolean>(false)


    const { setUser }:any = useContext(UseContext)
    const TaskRef = useRef<HTMLInputElement>(null)

    const TaskApi = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault()
        await axios.post(`${import.meta.env.VITE_API}TaskAdd`, {
            Id: id,
            Task: TaskRef.current?.value
        })
        SetAddTask(false)
        setUser((p:Boolean)=>!p)
    }
    return (
        <div className='flex gap-1 items-center'>
            {
                AddTask && <form className='ps-2' onSubmit={(e) => TaskApi(e, p._id)} >
                    <input type="text" ref={TaskRef} placeholder="name" />
                </form>
            }
            <button onClick={() => SetAddTask(true)} className='font-bold px-3 bg-slate-50 text-black rounded-md p-1'> Add</button>
        </div>
    );
};

export default AddTask;