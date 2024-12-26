import { FC, useEffect, useState } from "react";
import Color from "./Color";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setList } from "../store/data";


const Dot: FC<{ id: string, type: string, color?: string, name?: string }> = ({ id, type, color, name }) => {
    const [show, setShow] = useState<boolean>(true)
    const [time, setTime] = useState(false)
    const [todatDate, setTodayDate] = useState<Date | null>(null)

    const [GetHours, setHours] = useState("")
    const [EndDate, setEndDate] = useState<{
        month: number | undefined,
        year: number | undefined,
        day: number | undefined
    }>({
        month: undefined,
        year: undefined,
        day: undefined
    })
    const [img, setImg] = useState<string | null>(null)
    const dispatch = useDispatch()


    const Handle1 = async (Color: string) => {
        console.log("hi");

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

            setEndDate({
                day: Number(String(data.data.
                    EndTime
                ).split('/')[0]),
                month: Number(String(data.data.
                    EndTime
                ).split('/')[1]),
                year: Number(String(data.data.
                    EndTime
                ).split('/')[2])
            })
            //@ts-ignore
            setHours(Number(data.data.Reminder))
            setTodayDate(new Date(data.data.StartTime))

        }
        if (data.data2) {
            
        }



    }
    const Timmer = async () => {
        await axios.post(`${import.meta.env.VITE_API}Timmer`, {
            id,
            GetHours, EndDate, todatDate
        })

    }
    useEffect(() => {
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
                    <div className="absolute left-8 z-50 top-1/2 w-[800px] bg-zinc-800  h-[500px] ">
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
                            <div className="w-3/6 flex flex-wrap px-3">
                                {
                                    arr.map((p) => <Color click={Handle1} Color={p} />)
                                }
                            </div>
                            <div className="px-3">
                                <button onClick={() => setTime(p => !p)} className=" bg-white p-3 rounded-md text-black w-max mt-4  mix-blend-difference">

                                    Date
                                </button>
                                {
                                    time && <div className="flex items-center gap-2">
                                        StartDate  <div onClick={() => setTodayDate(new Date())} className="bg-black rounded-md p-3 w-max">{
                                            todatDate && <>
                                                {todatDate.getDate()}
                                                /{
                                                    todatDate.getMonth()
                                                }/{
                                                    todatDate.getFullYear()
                                                }

                                            </>
                                        }</div>


                                        EndDate <div onClick={() => setEndDate({ day: todatDate?.getDate(), month: todatDate?.getMonth(), year: todatDate?.getFullYear() })} className="bg-black rounded-md p-3 w-max">

                                            {
                                                EndDate.day && <>
                                                    <input type="number" className="bg-transparent text-white w-9" value={EndDate.day} onChange={(e) => setEndDate(p => ({ ...p, day: Number(e.target.value) }))} />/
                                                    <input type="number" className="bg-transparent text-white w-9" value={EndDate.month} onChange={(e) => setEndDate(p => ({ ...p, month: Number(e.target.value) }))} />
                                                    /
                                                    <input type="number" className="bg-transparent text-white w-14" value={EndDate.year} onChange={(e) => setEndDate(p => ({ ...p, year: Number(e.target.value) }))} />

                                                </>
                                            }
                                        </div>

                                        {EndDate.day && time &&
                                            <div className="bg-black rounded-md p-3">
                                                Remainder
                                                <input type="number" value={GetHours} onChange={(e) => setHours(e.target.value)} className=" mx-2 px-1 w-16 bg-transparent text-white" placeholder="enter the hours" />
                                                Hours

                                            </div>
                                        }
                                    </div>

                                }

                                {
                                    time && GetHours && EndDate.day && <button onClick={() => Timmer()} className=" mx-auto block  bg-white p-3 rounded-md text-black w-max mt-10  mix-blend-difference">

                                        save
                                    </button>
                                }

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


                            </div>
                        </div>
                    </div>
            }
        </>
    );
};

export default Dot;