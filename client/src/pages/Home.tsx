import axios from "axios";
import { useContext, useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import Lists from "../components/Lists";
import ListAdd from "../components/ListAdd";
import UseContext from "../context/context";

const Home = () => {
    const [user, SetUser] = useState<UserType>()
    const [List, SetList] = useState<String[]>([])

    const { userInfo }: any = useContext(UseContext)
    const navigate = useNavigate()
    const Api = async () => {
        try {
            const { data } = await axios.get('http://localhost:3000/api/Dashboard', {
                withCredentials: true
            })


            if (!data.success) {
                navigate('/Login')
            }
            SetUser(data.data.user);
            SetList(data.data.lists);
        } catch (error) {
            console.log(error);

        }

    }


    



    useEffect(() => {
        Api()
    }, [userInfo])
    return (
        <div>
            DashBoard
            <hr />

            Name:{
                user?.name
            }

            <hr />
            <div className="flex flex-wrap gap-3">

                {
                    List?.length > 0 ? List.map((p: any,i) => <Lists key={i} p={p} />) : <>
                        Add List
                    </>
                }
                <ListAdd user={user}/>

             
            </div>
        </div>
    );
};

export default Home;