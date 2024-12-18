import { useState } from "react";
import Dot from "./Dot";

const LI = ({t}:{t:any}) => {
    const [color,SetColor] =useState<boolean>(true)
    return (
      <li style={{ backgroundColor: t.Color }} className={` my-1 flex relative font-bold items-end justify-between px-3 ${!color ? "text-red-600" :"text-white"} px-2`} key={t}>
    <div >
          <input type="checkbox" onChange={() => SetColor(p => !p)} />  {t.title}
    </div>
    
      <Dot id={t._id} type="List" />

  
        </li>
    );
};

export default LI;