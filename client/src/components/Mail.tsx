import axios from "axios";
import { useRef, useState } from "react";


const Mail = () => {
    const [loading, setLoading] = useState(false)
    const mail = useRef<HTMLInputElement>(null)
    const Api = async () => {
        if (mail.current?.value) {
            setLoading(p => !p)
          const {data}=  await axios.post(`${import.meta.env.VITE_API}Email`, {
                email: mail.current.value
            },{
                withCredentials: true
            })
            if (data.success) {
                setLoading(p=>!p);
            }else{
                alert(data.messageId)
                setLoading(p=>!p);

            }

        } else {
            alert('please fill your email')
        }
    }
    return (
        <>
            <input type="email" ref={mail} placeholder="Enter your partner Email ... " className="bg-black p-2 rounded-md" />
            <button className="bg-slate-700 p-3 rounded-md mx-3" onClick={() => Api()}>{loading ? "Sending...." : "Send E-mail"}</button>
        </>
    );
};

export default Mail;