import axios from 'axios';
import { useContext, useRef, useState } from 'react';
import UseContext from '../context/context';

const ListAdd = ({ user }: { user: any }) => {

    const [AddList, SetAddList] = useState<Boolean>(false)

    const ListRef = useRef<HTMLInputElement>(null)

    const { setUser }: any = useContext(UseContext)
    const ListApi = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post('http://localhost:3000/api/List', {
            ListName: ListRef.current?.value,
            Id: user?._id
        })
        SetAddList(false)
        setUser((p:boolean)=>!p)

    }
    return (
        <div>
            <button onClick={() => SetAddList(true)}>AddList</button>
            {
                AddList &&
                <form onSubmit={(e) => ListApi(e)} >
                    <input type="text" ref={ListRef} placeholder="name" />
                    <button>Add</button>
                </form>
            }
        </div>
    );
};

export default ListAdd;