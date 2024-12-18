import { FC, useState } from "react";
import Color from "./Color";


const Dot:FC<{id:string,type:string}> = ({id,type}) => {
    const [show,setShow]=useState<boolean>(false)
    const arr=['red', 'green', 'pink','gray'];
    return (
        <>
        <div onClick={()=>setShow(p=>!p)} className="text-3xl">
            ...
        </div>

        {
            show &&
            <div className="absolute right-[-25%] z-50 -translate-x-1/4">
                {
                    arr.map((p)=><Color click={setShow} id={id} type={type} Color={p}/>)
                }
            </div>
        }
        </>
    );
};

export default Dot;