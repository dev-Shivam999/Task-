import axios from 'axios';
import {  useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setList } from '../store/data';

const ListAdd = ({ user }: { user: any }) => {

    const [AddList, SetAddList] = useState<Boolean>(false)

    const ListRef = useRef<HTMLInputElement>(null)
    const dispatch=useDispatch()

    const ListApi = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (ListRef.current?.value.trim()=="") {
         return   alert("Please give nam eof list")
        }
        await axios.post(`${ import.meta.env.VITE_API }List`, {
            ListName: ListRef.current?.value,
            Id: user?._id
        })
        SetAddList(false)
        dispatch(setList())

    }
    return (
        <div className='bg-zinc-200 w-[300px] flex items-center flex-col my-5 mx-2 border-2'>
            <button onClick={() => SetAddList(true)} className='w-32 h-32 rounded-full bg-slate-100'>AddList</button>
            {
                AddList &&
                <form onSubmit={(e) => ListApi(e)} >
                    <input type="text" ref={ListRef} placeholder="name" />
                        <button className='font-bold px-3'>Add</button>
                </form>
            }
        </div>
    );
};

export default ListAdd;