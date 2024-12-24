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
        <div className='bg-black py-4 w-[300px] rounded-md flex items-center flex-col my-5  mx-2 border-2'>
            <button onClick={() => SetAddList(p=>!p)} className='w-32 h-32 rounded-full bg-slate-100'>AddList</button>
            {
                AddList &&
                <form className='my-4' onSubmit={(e) => ListApi(e)} >
                    <input type="text" ref={ListRef} placeholder="name" />
                        <button className='font-bold px-3 text-white border-2 border-white rounded'>Add</button>
                </form>
            }
        </div>
    );
};

export default ListAdd;