import axios from 'axios';
import  { useState } from 'react';
import CoverImg from './CoverImg';

const Template = ({ setUser }: { setUser: React.Dispatch<React.SetStateAction<UserType | undefined>> }) => {
    
        const [Template, ShowTemplate] = useState<boolean>(false);
    const CoverImgApi = async (e: string) => {
        ShowTemplate(p => !p)
        setUser(p =>p&&({ ...p, CoverImg: e }))
        await axios.post(`${import.meta.env.VITE_API}CoverImg`, {
            img: e
        }, {
            withCredentials: true
        })

    }
    return (
        <div className=" relative px-3">
            <div className="cursor-pointer" onClick={() => ShowTemplate(p => !p)}>
                Template
            </div>
            {

                Template && <div className="flex z-50 flex-col absolute ">
                    <CoverImg Click={(e) => CoverImgApi(e)} className="" src="https://tse4.mm.bing.net/th?id=OIP.xddyM5Z5llwe5nz0xAnhvAHaD_&pid=Api&P=0&h=180" />
                    <CoverImg Click={(e) => CoverImgApi(e)} className="" src="https://tse3.mm.bing.net/th?id=OIP.iVzMzoYnUTc-WxTcEeO71wHaEK&pid=Api&P=0&h=180" />
                    <CoverImg Click={(e) => CoverImgApi(e)} className="" src="https://tse2.mm.bing.net/th?id=OIP.JkcYOovXGNijhryz145aHwHaEK&pid=Api&P=0&h=180" />
                    <CoverImg Click={(e) => CoverImgApi(e)} className="" src="https://tse2.mm.bing.net/th?id=OIP.ZfWF34ga99OWM2X9Z1FIOQHaEo&pid=Api&P=0&h=180" />

                </div>
            }
        </div>
    );
};

export default Template;