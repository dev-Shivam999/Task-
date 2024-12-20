import { FC, useState } from "react";
import Color from "./Color";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setList } from "../store/data";


const Dot: FC<{ id: string, type: string, color?: string, name?: string }> = ({ id, type, color, name }) => {
    const [show, setShow] = useState<boolean>(false)
    const dispatch = useDispatch()
    const Handle = async (Color: string) => {
        setShow(p => !p)

        await axios.put(`${import.meta.env.VITE_API}/UpdateColor`, {
            type: type,
            Color: Color,
            id: id
        })
        dispatch(setList())

        console.log("change the color of ", type, " ", id);

    }
  
    const arr = ['red', 'green', 'pink', 'gray'];
    return (
        <>
            <div onClick={() => setShow(p => !p)} className="text-3xl cursor-pointer">
                ...
            </div>

            {
                show && type != "List" ?
                    <div className="absolute right-[-25%] z-50 -translate-x-1/4">
                        {
                            arr.map((p) => <Color click={Handle} Color={p} />)
                        }
                    </div> : show && 
                    <div className="absolute z-50 top-1/2 w-[800px] bg-zinc-800  h-[500px] ">
                        <div  >
                            <div className="flex justify-between py-5 rounded-sm w-full px-3" style={{ backgroundColor: color }} >
                                <div>
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
                                    arr.map((p) => <Color click={Handle} Color={p} />)
                                }
                            </div>
                            <button>
                                Date
                            </button>

                            <div>
                               <div>
                                        <input type="file" />

                               </div>
                            </div>

                        </div>

                    </div>
            }
        </>
    );
};

export default Dot;