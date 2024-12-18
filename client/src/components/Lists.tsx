import AddTask from "./AddTask";
import Dot from "./Dot";
import LI from "./LI";



const Lists = ({ p }: { p: any }) => {



    return (
        <div key={p} style={{backgroundColor:p.Color}} className=" rounded-md py-3 text-black w-[300px] mx-2 border-2">
            <div className="flex items-baseline justify-between px-3 relative">
                <h1 className='font-bold py-3 text-center'>{String(p.list).toLocaleUpperCase()}</h1>
              <Dot id={p._id} type="Task"/>
            </div>
            {
                p.tasks.length > 0 &&
                <ul>{p.tasks.map((t: any, i: number) =>
                    <LI key={i} t={t} />)}
                </ul>}
            <AddTask p={p} />
        </div>
    );
};

export default Lists;