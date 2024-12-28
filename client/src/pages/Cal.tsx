import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const localizer = momentLocalizer(moment);
interface Event {
    title: string,
    start: Date,
    end: Date
}
interface Set {
    tasks: Tasks[]
}
interface Tasks {
    title: string
    timers: timers[]
}
interface timers {
    EndTime: Date,
    StartTime: Date
}
const MyCalendar = () => {
    const [events, setEvents] = useState<Event[]>([])
   console.log(events);
   
    const Api = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_API}Calender`, {
            withCredentials: true,
        })
        data.map((p: Set) => {
            p.tasks.map(e => {
                let event: Event={
                    title: e.title,
                    start: e.timers[0].StartTime,
                    end: e.timers[0].EndTime
                }
               
                setEvents(f => [event, ...f])
            }

            )


        }
        )

    }
    useEffect(() => {
        Api()

    }, [])


    return <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" />;
};




export default MyCalendar