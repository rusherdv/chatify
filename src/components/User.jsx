import React, {useEffect, useState} from 'react'
import Login from './Login'
import Logout from './Logout'
import { auth } from '../api/firebase.config'
import { useAuthState } from 'react-firebase-hooks/auth'

const User = () => {
  
    const [user] = useAuthState(auth)
    const [loading, setloading] = useState(true);
    const [image, setimage] = useState("/user.png");
    const [username, setusername] = useState("Name User");

    useEffect(() => {
        const getData = () => {
            if(user){
                setimage(user.photoURL)
                setusername(user.displayName)
                setloading(false)
            }else{
                setimage("/user.png")
                setusername("Name User")
            }
        }
        getData()
    }, [user])

    return (
        <div className='flex flex-col items-center mr-10'>
            <h3 className='text-4xl inter600 mb-5'>Chatify</h3>
            <div className='h-[300px] w-[300px] flex flex-col'>
                <article className='bg-[#F3F6FB] h-full flex flex-col items-center justify-center rounded-md border-2'>
                    
                    {
                        loading ? 
                        <div className="loader">
                            <div className="loader-wheel"></div>
                        </div>
                        :
                        <>
                            <img src={image} className='rounded-full mb-5 w-[96px] h-[96px]' alt="" referrerPolicy='no-referrer'/>
                            <p className=' inter400 mb-4'>{username}</p>
                            {
                                user ? <Logout/> : <Login/>
                            }
                        </>
                    
                    }
                </article>
            </div>
        </div>
  )
}

export default User