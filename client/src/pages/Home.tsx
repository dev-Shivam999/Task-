import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [user, SetUser] = useState<UserType>()
    const [List, SetList] = useState<String[]>([])
    const [AddList, SetAddList] = useState<Boolean>(false)
    const [AddTask, SetAddTask] = useState<Boolean>(false)

    const ListRef = useRef<HTMLInputElement>(null)
    const TaskRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const Api = async () => {
        const { data } = await axios.get('http://localhost:3000/api/Dashboard', {
            withCredentials: true
        })
        SetUser(data.data.user);
        SetList(data.data.lists);

        if (!data.success) {
            navigate('/Login')
        }

    }


    const ListApi = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data } = await axios.post('http://localhost:3000/api/List', {
            ListName: ListRef.current?.value,
            Id: user?._id
        })
        console.log(data);


    }

    const TaskApi = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault()
        await axios.post('http://localhost:3000/api/TaskAdd', {
            Id: id,
            Task: TaskRef.current?.value
        })
    }


    useEffect(() => {
        Api()
    }, [])
    return (
        <div>
            DashBoard
            <hr />

            Name:{
                user?.name
            }

            <hr />

            {
                List?.length > 0 ? List.map((p: any) => <div>
                    <h1>{p.list}</h1>
                  {  p.tasks.length > 0 && p.tasks.map((t: any) =><p>{t.title}</p>)}
                    <button onClick={() => SetAddTask(true)}> Add</button>
                    {
                        AddTask && <form onSubmit={(e) => TaskApi(e, p._id)} >
                            <input type="text" ref={TaskRef} placeholder="name" />
                        </form>
                    }
                </div>) : <>
                    Add List
                </>
            }

            <button onClick={() => SetAddList(true)}>AddList</button>
            {
                AddList && <form onSubmit={(e) => ListApi(e)} >
                    <input type="text" ref={ListRef} placeholder="name" />
                </form>
            }
        </div>
    );
};

export default Home;