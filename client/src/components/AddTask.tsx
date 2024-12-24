import axios from 'axios';
import  {  useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setList } from '../store/data';

const AddTask = ({p}:{p:any}) => {


    const [AddTask, SetAddTask] = useState<Boolean>(false)

const dispatch=useDispatch()
    const TaskRef = useRef<HTMLInputElement>(null)

    const TaskApi = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault()
        await axios.post(`${import.meta.env.VITE_API}TaskAdd`, {
            Id: id,
            Task: TaskRef.current?.value
        })
        SetAddTask(false)
        dispatch(setList())
    }
    return (
        <div className='flex gap-1 items-center'>
            {
                AddTask && <form className='ps-2' onSubmit={(e) => TaskApi(e, p._id)} >
                    <input type="text" ref={TaskRef} className='bg-transparent' placeholder="name" />
                </form>
            }
            <button onClick={() => SetAddTask(true)} className='font-bold px-3 bg-slate-50 text-black rounded-md p-1'> Add</button>
        </div>
    );
};

export default AddTask;