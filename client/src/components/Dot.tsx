import { FC, useEffect, useRef, useState } from "react";
import Color from "./Color";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setList } from "../store/data";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import Firma from "./Ifrema";

const Dot: FC<{ id: string, type: string, color?: string, name?: string }> = ({ id, type, color, name }) => {
    const [show, setShow] = useState<boolean>(true)
    const fileRef = useRef<HTMLInputElement | null>(null)
    const [EndDate, setEndDate] = useState<Date | null>(null);
    const [time, setTime] = useState<boolean>(false)
    const [Location, setLocation] = useState<boolean>(false)

    const [todatDate, setTodayDate] = useState<Date | null>(null)

    const [GetHours, setHours] = useState("")

    const [img, setImg] = useState<string | null>(null)
    const dispatch = useDispatch()


    const Handle1 = async (Color: string) => {


        const { data } = await axios.put(`${import.meta.env.VITE_API}UpdateColor`, {
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
                name: e.target.files[0].name
            })
        } catch (error) {
            setImg("error")
            alert("Error")
            console.log(error);

        }
    }



    const TaskApi = async () => {
        const { data } = await axios.post(`${import.meta.env.VITE_API}TaskApi`, {
            id
        })
        if (data.data) {
            //@ts-ignore
            setTime(p => !p)


            //@ts-ignore
            setHours(Number(data.data.Reminder))
            setTodayDate(new Date(data.data.StartTime))
            setEndDate(new Date(data.data.
                EndTime))

            setImg(data.data2?.FileName)

        }
        if (data.data2) {

        }



    }
    
    const Timmer = async () => {
        await axios.post(`${import.meta.env.VITE_API}Timmer`, {
            id,
            GetHours, todatDate, EndDate
        })
        setTime(p => !p)

    }
   
   
    useEffect(() => {


        
        const data = localStorage.getItem(id)
        
       if (data) {
        setLocation(true)
       }

        type == "List" && TaskApi()
    }, [])
    const arr = ['red', 'green', 'pink', 'gray'];
    return (
        <>


            {
                show && type != "List" ?
                    <div className="absolute -right-20  z-50">
                        {
                            arr.map((p) => <Color click={Handle1} Color={p} />)
                        }
                    </div> : show && type == "List" &&
                    <div style={{ backgroundColor: color }} className="absolute left-8 z-50 top-6 w-[90%] min-h-[90vh] rounded-xl overflow-hidden bg-zinc-800  ">
                        <div   >
                            <div className="flex justify-between text-white  py-5 rounded-sm w-full px-3" >
                                <div className="text-white font-bold">
                                    {
                                        name?.toLocaleUpperCase()
                                    }

                                </div>
                                <div onClick={() => setShow(p => !p)} className="cursor-pointer">
                                    x

                                </div>
                            </div>
                            <div className="flex justify-between px-3">
                                <div>


                                      {
                                            EndDate && <div className={`${EndDate && EndDate< new Date() ? "bg-red-700" : "bg-yellow-400"}  px-3 py-1 rounded-lg`}>
                                                {todatDate?.getDate()}-{EndDate?.getDate()}
                                            </div>
                                      }

                                    {
                                        //@ts-ignore
                                        img && <div
                                            className=" bg-slate-700 p-3 my-5 rounded-md">
                                            {
                                                img
                                            }
                                        </div>
                                    }

                                    {
                                        Location && <div
                                            className=" bg-slate-700 p-3 my-5 rounded-md">
                                            <Firma />
                                        </div>
                                    }
                                </div>
                                <div className=" flex justify-end ">
                                    <div className="px-3">


                                        <div>
                                            <div className=" bg-slate-700 p-3 my-5 rounded-md">

                                                Start Date  <DatePicker selected={todatDate} className="bg-transparent" onChange={(date) => setTodayDate(date || new Date())} />
                                            </div>
                                            <div className=" bg-slate-700 p-3 my-5 rounded-md">
                                                End Date  <DatePicker selected={EndDate} className="bg-transparent" onChange={(date) => { setEndDate(date || new Date()), setTime(true) }} />
                                            </div>   </div>
                                        {
                                            todatDate && EndDate && <div>
                                                <input type="text" value={GetHours} onChange={(e) => setHours(e.target.value)} placeholder="enter the ex hour " className="bg-slate-700 p-3 my-5 rounded-md" />
                                            </div>
                                        }

                                        {
                                            todatDate && EndDate && GetHours.length > 0 && time && <button onClick={() => Timmer()} className=" mx-auto block  bg-white p-3 rounded-md text-black w-max mt-10  mix-blend-difference">

                                                save
                                            </button>
                                        }
                                        <div onClick={() =>{!Location&&setLocation(true),localStorage.setItem(id,JSON.stringify(true))}} className=" bg-slate-700 p-3 my-5 rounded-md">
                                            location
                                        </div>
                                        <div>
                                            <div>

                                                <div className=" bg-slate-700 p-3 my-5 rounded-md" onClick={() => fileRef.current?.click()}>
                                                    Attachment
                                                    <input type="file" className="hidden" ref={fileRef} onChange={(e) => file(e)} />
                                                </div>

                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default Dot;