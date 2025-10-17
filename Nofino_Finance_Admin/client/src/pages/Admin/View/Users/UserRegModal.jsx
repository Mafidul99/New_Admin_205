import React from 'react'
import Modal from '../../../../components/ui/Modal'

const UserRegModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
      const openModal = () => setIsModalOpen(true);
      const closeModal = () => setIsModalOpen(false);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2 className="text-2xl font-bold mb-4">U</h2>
          <p>This is the content of your modal.</p>
          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </Modal>
      </div>
  )
}

export default UserRegModal