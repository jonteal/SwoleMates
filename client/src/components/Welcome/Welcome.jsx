import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import Modal from '../LoginForm/LoginForm'

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
        {!openModal && <div>
        Welcome to SwoleMate, are you ready to find your one true swolemate?
        <button onClick={() => {setModal(true)}} value={openModal} className="openModalBtn">If you see me, the modal is closed</button>
        </div>}
        {openModal && <Modal />}
        </>
    )
}

export default Welcome;