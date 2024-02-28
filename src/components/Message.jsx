import React, { useEffect, useState } from 'react'
import { auth } from '../api/firebase.config'
import { formatDate } from '../helpers'

const Message = ({ message }) => {
    let mymessage = false;
    const [date, setdate] = useState(null);

    useEffect(() => {
        renderDate()
    },[message.timestamp])

    if (auth.currentUser) {
        const user = auth.currentUser.uid;
        const newUser = message.uid;
        mymessage = user === newUser ? true : false;
    }

    const renderDate = async () => {
        const formattedDate = await formatDate(message.timestamp);
        setdate(formattedDate)
    };

    return (
        mymessage ?
            <article className='w-[98%] m-2 flex items-start justify-end'>
                <div>
                    <div className='flex flex-col items-end'>
                        <p className='text-black p-3 rounded-lg bg-white w-fit flex justify-end'>{message.text}</p>
                        <p className='text-black text-xs mt-1 justify-end flex'>{date}</p>
                    </div>
                </div>
                <img src={message.photo} className='rounded-full w-12 ml-2' alt="" />
            </article>
            :
            <article className='m-2 flex items-start text-left ml-3'>
                <img src={message.photo} className='rounded-full w-10 mr-2' alt="" referrerPolicy='no-refferer' />
                <div>
                    <div className='flex flex-col items-start'>
                        <p className='text-white p-3 rounded-lg bg-[#202431] w-fit'>{message.text}</p>
                        <p className='text-black text-xs mt-1 justify-start flex'>{date}</p>
                    </div>
                </div>
            </article>
        );
};


export default Message