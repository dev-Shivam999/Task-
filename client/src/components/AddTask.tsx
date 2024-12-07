import axios from 'axios';
import  { useContext, useRef, useState } from 'react';
import UseContext from '../context/context';

const AddTask = ({p}:{p:any}) => {


    const [AddTask, SetAddTask] = useState<Boolean>(false)


    const { setUser }:any = useContext(UseContext)
    const TaskRef = useRef<HTMLInputElement>(null)

    const TaskApi = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault()
        await axios.post('http://localhost:3000/api/TaskAdd', {
            Id: id,
            Task: TaskRef.current?.value
        })
        SetAddTask(false)
        setUser((p:Boolean)=>!p)
    }
    return (
        <div className='flex gap-1 items-center'>
            {
                AddTask && <form onSubmit={(e) => TaskApi(e, p._id)} >
                    <input type="text" ref={TaskRef} placeholder="name" />
                </form>
            }
            <button onClick={() => SetAddTask(true)}> Add</button>
        </div>
    );
};

export default AddTask;