import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Select.module.scss';

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    id: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    disabled?: boolean;
    label: string;
    options: Option[];
}

const Select: React.FC<SelectProps> = ({ id, value, onChange, required = false, disabled = false, label, options }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = (value: string) => {
        setSearchTerm(options.find(option => option.value === value)?.label || '');
        setShowOptions(false);
        onChange(value);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
            setShowOptions(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.inputGroup} ref={selectRef}>
            <label htmlFor={id}>{label}</label>
            <input
                type="text"
                id={id}
                className={styles.selectInput}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onFocus={() => setShowOptions(true)}
                required={required}
                disabled={disabled}
            />
            {showOptions && searchTerm && (
                <ul className={styles.optionsList}>
                    {filteredOptions.map(option => (
                        <li key={option.value} onMouseDown={() => handleSelect(option.value)}>
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Select;