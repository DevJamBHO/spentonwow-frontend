import React, { createContext, useContext, useState, ReactNode } from 'react';
import dynamic from "next/dynamic";

interface ModalContextInterface {
    isOpen: boolean;
    openModal: (componentName: string, title: string) => void;
    closeModal: () => void;
    ModalComponent: ReactNode;
    title: string;
}

const ModalContext = createContext<ModalContextInterface | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [ModalComponent, setModalComponent] = useState<React.ReactNode>(null);
    const [title, setTitle] = useState<string>('');

    const componentMapper: { [key: string]: React.ComponentType } = {
        RecapVideo: dynamic(() => import('@/components/Modal/ModalCallable/RecapVideo')),
    };

    const openModal = (componentName: string, title: string) => {
        const Component = componentMapper[componentName];
        if (Component) {
            setModalComponent(<Component />);
            setTitle(title);
            setIsOpen(true);
        } else {
            console.error(`Component "${componentName}" not found.`);
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setModalComponent(null);
        setTitle('');
    };

    return (
        <ModalContext.Provider value={{ isOpen, openModal, closeModal, ModalComponent, title }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};