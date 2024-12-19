import  { FC } from 'react';

const Inp: FC<{
    type: string, value: string, change: (e:string) => void
}> = ({type,value,change}) => {
    return (
       <input type={type} className='bg-transparent' value={value} onChange={(e)=>change(e.target.value)}/>
    );
};

export default Inp;