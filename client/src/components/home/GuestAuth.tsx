import { useEffect, useState } from "react";
import axios from "axios"

const GuestAuth = () => {

    useEffect(()=>{
        
    },[])

    return ( 
        <>
            <div className="flex flex-col gap-4">
                <img/>
                <form>
                    <input placeholder="Your username"/>
                    <button>Start Chatting!</button>
                </form>
            </div>
        </>
    );
}
 
export default GuestAuth;