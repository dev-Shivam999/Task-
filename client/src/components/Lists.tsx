import AddTask from "./AddTask";
import LI from "./LI";



const Lists = ({ p }: { p: any }) => {



    return (
        <div key={p} className="bg-zinc-200 w-[300px] mx-2 border-2">
            <h1 className='font-medium py-3 text-center'>{p.list}</h1>
            {
                p.tasks.length > 0 &&
                <ul>{p.tasks.map((t: any, i: number) =>
                   <LI i={i} key={i} t={t}/>)}
                </ul>}
            <AddTask p={p} />
        </div>
    );
};

export default Lists;