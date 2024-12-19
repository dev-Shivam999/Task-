
import axios from 'axios';
import { useEffect, useState } from 'react';
import Inp from '../components/Inp';
import { useNavigate } from 'react-router';

const Edits = () => {
    const [date, setdate] = useState({
        Color
            :
            "",
        email
            :
            "",
        name
            :
            "",
        _id
            :
            ""
    })

    const navigate=useNavigate()
const Handle=async()=>{

    const { data } = await axios.post(`${import.meta.env.VITE_API}UpdateProfile`,{
        date
    } ,{
        withCredentials: true
    })
    if (data.success) {
        navigate('/Profile')
    }
}

    const api = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API}Profile`, {
            withCredentials: true
        })
        if (data.success) {
            setdate(data.message)
        }

    }
    useEffect(()=>{
        api()
    },[])
    return (
        <div className='min-h-screen text-white mix-blend-difference ' style={{backgroundColor:date.Color}}>
        
            <div className="flex items-center gap-3">
                <div className="bg-white mix-blend-difference rounded-full w-40 h-40 flex flex-wrap justify-center items-center text-black text-6xl">
                    {
                        date.name[0]
                    }
                </div>
                <div>

                    UserName :
                    <Inp change={(e)=>setdate(p=>({...p,name:e}))} type='text' value={date.name} />
                           <br />
                    UserEmail :  <Inp change={(e) => setdate(p => ({ ...p, email: e }))} type='email' value={date.email}  />

                    <br />
                    UserDefaultColor : 
                    <Inp change={(e) => setdate(p => ({ ...p, Color: e }))} type='text' value={date.Color}  />

                    

                </div>
            </div>
            <button className='mx-auto w-max rounded-md px-3 py-1 block text-black mix-blend-difference  bg-white' onClick={() => Handle()}>Submit</button>
        </div>
    );
};

export default Edits;