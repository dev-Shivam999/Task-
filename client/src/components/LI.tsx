
const LI = ({i,t}:{i:number,t:any}) => {
    return (
        <li className={`${i % 2 == 0 ? "bg-slate-500" : "bg-slate-600"} px-2`} key={t}>
            {t.title}
        </li>
    );
};

export default LI;