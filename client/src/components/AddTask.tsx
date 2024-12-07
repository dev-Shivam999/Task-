import axios from 'axios';
import  { useRef, useState } from 'react';

const AddTask = ({p}:{p:any}) => {


    const [AddTask, SetAddTask] = useState<Boolean>(false)


    const TaskRef = useRef<HTMLInputElement>(null)

    const TaskApi = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault()
        await axios.post('http://localhost:3000/api/TaskAdd', {
            Id: id,
            Task: TaskRef.current?.value
        })
    }
    return (
        <>
            <button onClick={() => SetAddTask(true)}> Add</button>
            {
                AddTask && <form onSubmit={(e) => TaskApi(e, p._id)} >
                    <input type="text" ref={TaskRef} placeholder="name" />
                </form>
            }
        </>
    );
};

export default AddTask;