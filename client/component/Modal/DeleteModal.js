import { useState } from 'react';

const DeleteModal = ({ id, onClose }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/stores/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        throw new Error('Failed to delete store');
      }
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Delete Store</h2>
        <p>Are you sure you want to delete this store?</p>
        <div className="button-container">
          <button onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
          <button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Deleting...' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
