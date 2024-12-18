import axios from "axios";
import { FC } from "react";


const Color: FC<{ Color: string, type: string, id: string, click: React.Dispatch<React.SetStateAction<boolean>> }> = ({Color,id,type,click}) => {
    const Handle=async()=>{
        click(p=>!p)
        axios.put(`${import.meta.env.VITE_API}/UpdateColor`,{
            type:type,
            Color:Color,
            id:id
        })
        console.log("change the color of ",type," ", id);
        
    }
    return (
        <div style={{backgroundColor:`${Color}`}} onClick={()=>Handle()} className="p-3">
            {
                Color.toString().toLocaleUpperCase()
            }
        </div>
    );
};

export default Color;