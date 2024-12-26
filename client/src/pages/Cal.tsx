import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect } from 'react';
import axios from 'axios';

const localizer = momentLocalizer(moment);
const MyCalendar = () => {
    const Api = async () => {
        await axios.get(`${ import.meta.env.VITE_API }Calender`, {
            withCredentials: true,
        })
    }
    useEffect(() => {
        Api()

    }, [])
    const events = [
        // { title: 'Event 1', start: new Date(), end: new Date() },
        // { title: 'Event 1', start: new Date(), end: new Date() },
        { title: 'Event 1', start: new Date(), end: new Date() },
        { title: 'Event 2', start: "2024-12-24T12:41:18.108Z", end: new Date() },
    ];

    return <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" />;
};




export default MyCalendar