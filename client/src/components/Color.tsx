
import { FC } from "react";

const Color: FC<{ Color: string, click: (Color:string)=>void }> = ({Color,click}) => {
   
    return (
        <div style={{backgroundColor:`${Color}`}} onClick={()=>click(Color)} className="p-3 cursor-pointer">
            {
                Color.toString().toLocaleUpperCase()
            }
        </div>
    );
};

export default Color;