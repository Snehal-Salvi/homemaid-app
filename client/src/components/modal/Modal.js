import React from 'react';
import styles from './modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

/**
 * Modal component to display content in a popup modal.
 * @param {boolean} isOpen - Boolean value indicating whether the modal is open or closed.
 * @param {function} onClose - Function to close the modal.
 * @param {JSX.Element} children - The content to be displayed inside the modal.
 */
export default function Modal({ isOpen, onClose, children }) {
  // If modal is not open, return null
  if (!isOpen) return null;

  return (
    // Modal overlay
    <div className={styles.modalOverlay}>
      {/* Modal container */}
      <div className={styles.modal}>
        {/* Modal header with close button */}
        <div className={styles.modalHeader}>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        {/* Modal content */}
        <div className={styles.modalContent}>
          {children}
        </div>
      </div>
    </div>
  );
};
