import React, {useEffect, useState, useRef} from 'react'
import {auth, db} from '../api/firebase.config'
import {query, collection, orderBy, onSnapshot, QuerySnapshot} from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import Message from './Message';
import SendMessage from './SendMessage';

const Chat = () => {

    const [loading, setloading] = useState(true);
    const [messages, setMessages] = useState();
    const [user] = useAuthState(auth)
    const scroll = useRef();

    useEffect(() => {
        const newQuery = query(collection(db, "messages"), orderBy('timestamp'))

        const unsuscribe = onSnapshot(newQuery, (QuerySnapshot) => {
            let currentMessages = [];
            QuerySnapshot.forEach(item => {
                currentMessages.push({content: item.data(), id: item.id})
            })
            setMessages(currentMessages);
            setloading(false)
            scroll.current.scrollIntoView({behavior: 'smooth'})
        })
        return unsuscribe
    },[])

    useEffect(() => {
        if (scroll.current) {
            setTimeout(() => {
                scroll.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }, 100);
        }
    }, [messages]);

    return (
        <section className={`${loading ? "flex justify-center items-center":""} bg-[#F3F6FB] relative w-6/12 h-[90%] rounded-lg text-white inter400 overflow-y-auto overflow-x-hidden pt-1`}>
            {
            loading ? 
            <div className="loader">
                <div className="loader-wheel"></div>
            </div>
            :
            <>
                {
                    messages && messages.map(item => (
                    <Message
                    key={item.id}
                    message={item.content}
                    />
                ))
                }
                {user && <SendMessage scroll={scroll}/>}
                <span ref={scroll}></span>
            </>
            }
        </section>
    )
}

export default Chat