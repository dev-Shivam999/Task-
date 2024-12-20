import { FC, useEffect, useState } from "react";
import Color from "./Color";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setList } from "../store/data";


const Dot: FC<{ id: string, type: string, color?: string, name?: string }> = ({ id, type, color, name }) => {
    const [show, setShow] = useState<boolean>(true)
    const [apiData,SetApi]=useState({
        
        FileName:false,
        FileUrl:false,
        StartDate:false,
        EndDate:false,
        Remainder:false,

    })
    const [img, setImg] = useState<string|null>(null)
    const dispatch = useDispatch()
 
    
    const Handle1 = async (Color: string) => {
        console.log("hi");
        
     const {data}=   await axios.put(`${import.meta.env.VITE_API}UpdateColor`, {
            type: type,
            Color: Color,
            id: id

        })
        console.log(data);
        
        dispatch(setList())
        setShow(p => !p)

        console.log("change the color of ", type, " ", id);

    }

    const file = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = new FormData()
        if (e.target.files == null) {
            return null
        }
        try {
            setImg(e.target.files[0].name)

            data.append("file", e.target.files[0])
            data.append("upload_preset", "zkpqmxbs")
            data.append("cloud_name", "dqavwsmjz")
            const url = await fetch("  https://api.cloudinary.com/v1_1/dqavwsmjz/image/upload", {
                method: "post",
                body: data
            })
            const data2 = await url.json()


            await axios.post(`${import.meta.env.VITE_API}TaskFile`, {
                id: id,
                Url: data2.secure_url,
                name: img
            })
        } catch (error) {
            setImg("error")
            alert("Error")
            console.log(error);
            
        }
    }


    
const TaskApi=async()=>{
  const {data}=  await axios.post(`${import.meta.env.VITE_API}TaskApi`,{
        id
    })

    
}
    useEffect(()=>{
        type == "List" && TaskApi()
    },[])
    const arr = ['red', 'green', 'pink', 'gray'];
    return (
        <>
            

            {
               show&&  type != "List" ?
                    <div className="absolute right-[-25%] z-50 -translate-x-1/4">
                        {
                            arr.map((p) => <Color click={Handle1} Color={p} />)
                        }
                    </div> :show&& type=="List"&&
                    <div className="absolute z-50 top-1/2 w-[800px] bg-zinc-800  h-[500px] ">
                        <div  >
                            <div style={{ backgroundColor: color }} className="flex justify-between text-white  py-5 rounded-sm w-full px-3" >
                                <div className="text-white">
                                    {
                                        name
                                    }
                                    
                                </div>
                                <div onClick={() => setShow(p => !p)} className="cursor-pointer">
                                    x

                                </div>
                            </div>
                            <div className="w-3/6 flex px-3">
                                {
                                    arr.map((p) => <Color click={Handle1} Color={p} />)
                                }
                            </div>
                          <div className="px-3">
                                    <button className=" bg-white p-3 rounded-md text-black w-max mt-4  mix-blend-difference">

                                        Date
                                    </button>

                                    <div>
                                        <div>
                                            {
                                                //@ts-ignore
                                                img && <div
                                                    className=" bg-white p-3 rounded-md text-black w-max mt-4  mix-blend-difference">
                                                    {
                                                        img
                                                    }
                                                </div>
                                            }
                                            <input type="file" onChange={(e) => file(e)} />

                                        </div>
                                    </div>

                            <button className=" mx-auto block  bg-white p-3 rounded-md text-black w-max mt-10  mix-blend-difference">

                                Submit
                            </button>
                          </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default Dot;