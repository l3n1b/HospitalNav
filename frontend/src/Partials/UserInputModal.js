import './UserInputModal.css'
import Modal from 'react-modal'
import { useState } from 'react'

function UserInputModal(setEntryDoor, setGoalLocation) {

    const [isModalOpen, setIsModalOpen] = useState(true)


    return (
        <Modal className='Modal'
            isOpen={isModalOpen}
            appElement={document.getElementById('root')}>

            <div className='ModalContent'>
                <h2>Hello</h2>
                <button className='btn btn-primary' onClick={()=>{setIsModalOpen(false)}}>close</button>
            </div>
        </Modal>
    )
}

export default UserInputModal
