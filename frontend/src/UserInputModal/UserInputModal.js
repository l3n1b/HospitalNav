import './UserInputModal.css'
import Modal from 'react-modal'
import { useState } from 'react'

function UserInputModal(setEntryDoor, setGoalLocation) {

    const [isModalOpen, setIsModalOpen] = useState(true)

    
    return (
        <Modal className='Modal'
            isOpen={isModalOpen}>
            <div className='ModalContent'>
                <h2>Hello</h2>
                <button onClick={()=>{setIsModalOpen(false)}}>close</button>
            </div>
        </Modal>
    )
}

export default UserInputModal
