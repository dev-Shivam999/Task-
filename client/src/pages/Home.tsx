import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [user,SetUser]=useState<UserType>()
    const [List,SetList]=useState<String[]>([])
    const [AddList,SetAddList]=useState<Boolean>(false)

    const ListRef=useRef<HTMLInputElement>(null)
    const navigate=useNavigate()
    const Api=async () => {
        const { data } = await axios.get('http://localhost:3000/api/Dashboard',{
            withCredentials: true
        })
        SetUser(data.data.user);
        SetList(data.data.lists);

        if (!data.success) {
            navigate('/Login')
        }
        
    }


    const ListApi = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const { data } = await axios.post('http://localhost:3000/api/List',{
            ListName:ListRef.current?.value,
            Id:user?._id
        })
        console.log(data);
        
        
    }

    useEffect(()=>{
        Api()
    },[])
    return (
        <div>
          DashBoard  
          <hr />

          Name:{
            user?.name
          }

          <hr />

{
    List?.length>0?<div></div>:<>
    Add List
    </>
}

            <button onClick={() => SetAddList(true)}>AddList</button>
{
    AddList&&<form onSubmit={(e)=>ListApi(e)} >
                    <input type="text" ref={ListRef} placeholder="name"  />
    </form>
}
        </div>
    );
};

export default Home;