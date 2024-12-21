import { useEffect, useState } from 'react';
import Lists from './Lists';
import ListAdd from './ListAdd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router';

const First = () => {
    const [user, setUser] = useState<UserType>();
    const [lists, setLists] = useState<any[]>([]);

    const navigate = useNavigate();

    const Api = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API}Dashboard`, {
                withCredentials: true,
            });

            if (!data.success) {
                if (data.message !== "Time Over") {

                    navigate("/Login");
                }
                else {
                    alert(data.message);
                    navigate("/Payment");
                }

            }
            setUser(data.data.user);
            setLists(data.data.lists);
        } catch (error) {
            console.log(error);
        }
    };

    const { User } = useSelector((p: any) => p.data);

    useEffect(() => {
        Api();
    }, [User]);
    return (
        <>
            <Lists lists={lists} setLists={setLists} />
            <ListAdd user={user} />   
        </>
    );
};

export default First;