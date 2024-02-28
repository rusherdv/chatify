import React, {useState} from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '../api/firebase.config'
import Picker from 'emoji-picker-react'

const SendMessage = ({ scroll }) => {
    const [input, setinput] = useState('');
    const [open, setopen] = useState('hidden');

    const sendMessage = async (e) => {
        e.preventDefault()

        if(input.trim() == ''){
            return
        }

        const {uid, displayName, photoURL} = auth.currentUser
        await addDoc(collection(db, 'messages'), {
            text: input,
            name: displayName,
            uid,
            photo: photoURL,
            timestamp: serverTimestamp()
        })
        setinput('');
        scroll.current.scrollIntoView({behavior: 'smooth'})
    }

    const emoji = () => {
        open === "hidden" ? setopen('absolute bottom-24 left-0') : setopen('hidden')
    }

    const onEmojiClick = (event) => {
        setinput(`${input}${event.emoji}`)
    };

  return (
    <form onSubmit={sendMessage} className='w-11/12 relative m-auto rounded-md bg-white h-20 flex items-center justify-around mb-5'>
        <button
        type='button'
        onClick={emoji}
        className='w-10 h-10 bg-blue-600 text-white rounded-md ml-5 flex justify-center items-center'
        >
            <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 512 512">
                <path fill="#ffffff" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM96.8 314.1c-3.8-13.7 7.4-26.1 21.6-26.1H393.6c14.2 0 25.5 12.4 21.6 26.1C396.2 382 332.1 432 256 432s-140.2-50-159.2-117.9zm36.7-199.4l89.9 47.9c10.7 5.7 10.7 21.1 0 26.8l-89.9 47.9c-7.9 4.2-17.5-1.5-17.5-10.5c0-2.8 1-5.5 2.8-7.6l36-43.2-36-43.2c-1.8-2.1-2.8-4.8-2.8-7.6c0-9 9.6-14.7 17.5-10.5zM396 125.1c0 2.8-1 5.5-2.8 7.6l-36 43.2 36 43.2c1.8 2.1 2.8 4.8 2.8 7.6c0 9-9.6 14.7-17.5 10.5l-89.9-47.9c-10.7-5.7-10.7-21.1 0-26.8l89.9-47.9c7.9-4.2 17.5 1.5 17.5 10.5z"/>
            </svg>
        </button>
        <div className={open}>
            <Picker onEmojiClick={onEmojiClick}/>
        </div>
        <input 
        type="text"
        placeholder='Enter your message here'
        value={input}
        onChange={(e) => setinput(e.target.value)}
        className='flex-1 mr-2 ml-5 h-12 bg-transparent border-2 pl-3 pr-3 rounded-md text-black'
        />
        <button type="submit" className='h-12 w-[150px] border-2 rounded-md mr-5 bg-blue-700'>
            Send
        </button>
    </form>
  )
}

export default SendMessage