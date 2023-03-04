import './UserInputModal.css'
import Modal from 'react-modal'
import { useState } from 'react'

function UserInputModal(setEntryDoor, setGoalLocation) {

    const [isModalOpen, setIsModalOpen] = useState(true)

    
    return (
        <Modal
            isOpen={isModalOpen}>
            <h2>Hello</h2>
            <button onClick={()=>{setIsModalOpen(false)}}>close</button>
            <div>I am a modal</div>
            <form>
                <input />
                <button>tab navigation</button>
                <button>stays</button>
                <button>inside</button>
                <button>the modal</button>
            </form>
        </Modal>
    )
}

export default UserInputModal
