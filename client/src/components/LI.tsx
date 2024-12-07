import { useState } from "react";

const LI = ({i,t}:{i:number,t:any}) => {
    const [color,SetColor] =useState<boolean>(true)
    return (
        <li className={`${i % 2 == 0 ? "bg-slate-500" : "bg-slate-600"} ${!color&&"text-red-600"} px-2`} key={t}>
          <input type="checkbox"  onChange={()=>SetColor(p=>!p)}/>  {t.title}
        </li>
    );
};

export default LI;