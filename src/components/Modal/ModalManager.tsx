import React, { Suspense } from 'react';
import Modal from './Modal';
import { useModal } from '@/context/ModalContext';

const ModalManager: React.FC = () => {
    const { isOpen, closeModal, ModalComponent, title } = useModal();

    return (
        <Modal isOpen={isOpen} onClose={closeModal} title={title}>
            <Suspense fallback={<div>Loading...</div>}>
                {ModalComponent}
            </Suspense>
        </Modal>
    );
};

export default ModalManager;