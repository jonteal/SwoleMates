import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import Modal from '../LoginForm/LoginForm'
import './welcome.css'

const Welcome = () => {
    //represents whether the modal is open or not, start false bc modal closed initially
    const [openModal, setModal] = useState(false);

    // const handleModal = (event) => {
    //     event.prevent.default();

    //     // ok so now i need it to be opposite of what is was (or setModal = !setModal)
    //     (setModal === false) ? setModal = true : setModal =false;
    // }

    return (
        <>
        {!openModal && 
        <div>
            <div className="container">
                <div className="shadows">
                    <span>S</span>
                    <span>W</span>
                    <span>O</span>
                    <span>L</span>
                    <span>E</span>
                    <span>M</span>
                    <span>A</span>
                    <span>T</span>
                    <span>E</span>
                    <span>S</span>
                </div>
            </div>
    

                <div className="welcomeBorder bg-red-500">
                Are you ready to find your one true swolemate?
                SCROLL DOWN
            </div>

            
                <div className="bg-white btnCard">
                    <button onClick={() => {setModal(true)}} value={openModal} className="openModalBtn">
                       Click here to login, mate
                        </button>
                    <br />

                        <div class="relative rounded-xl overflow-auto p-8">
                <div class="flex justify-center items-end">
                    <div className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-violet-500" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                        <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                    </div>
                </div>
                </div>
            </div>
        
        </div>}
        {openModal && <Modal />}
        </>
    )
}

export default Welcome;