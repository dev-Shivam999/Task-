import { useState } from "react";

const LI = ({task}:{task:any}) => {
    const [color,SetColor] =useState<boolean>(false)
    return (
      <div className={`${color? "text-green-600" : ""}`}>

        <input type="checkbox" className="mix-blend-difference bg-black" onChange={() => SetColor(p => !p)} />   {task.title}
      </div>
    );
};

export default LI;