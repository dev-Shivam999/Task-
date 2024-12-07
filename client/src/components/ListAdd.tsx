import axios from 'axios';
import { useRef, useState } from 'react';

const ListAdd = ({user}:{user:any}) => {

    const [AddList, SetAddList] = useState<Boolean>(false)

    const ListRef = useRef<HTMLInputElement>(null)
    const ListApi = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data } = await axios.post('http://localhost:3000/api/List', {
            ListName: ListRef.current?.value,
            Id: user?._id
        })
        console.log(data);


    }
    return (
        <div>
            <button onClick={() => SetAddList(true)}>AddList</button>
            {
                AddList &&
                <form onSubmit={(e) => ListApi(e)} >
                    <input type="text" ref={ListRef} placeholder="name" />
                </form>
            }
        </div>
    );
};

export default ListAdd;