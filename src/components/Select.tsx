import React, { useState } from 'react';
import styles from '@/styles/Select.module.scss';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    id: string;
    value: string;
    onChange: (value: string) => void;
    label?: string;
    options: SelectOption[];
    className?: string;
    hideLabel?: boolean;
    small?: boolean;
    filtrable?: boolean;
}

const Select: React.FC<SelectProps> = ({ id, value, onChange, label, options, className, hideLabel = false, small = false, filtrable = false }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOptionsVisible, setIsOptionsVisible] = useState(false);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setIsOptionsVisible(true);
    };

    const handleOptionClick = (value: string, label: string) => {
        onChange(value);
        setSearchTerm(label);
        setIsOptionsVisible(false);
    };

    const handleInputFocus = () => {
        setIsOptionsVisible(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => setIsOptionsVisible(false), 200);
    };

    const selectClassName = `${styles.selectInput} ${small ? styles.selectInputSmall : ''}`;
    const filterInputClassName = `${styles.filterInput} ${small ? styles.filterInputSmall : ''}`;
    const optionsListClassName = `${styles.optionsList} ${isOptionsVisible ? '' : styles.hidden}`;

    return (
        <div className={`${styles.inputGroup} ${className}`}>
            {!hideLabel && label && <label htmlFor={id} className={styles.label}>{label}</label>}
            {
                filtrable ? (
                    <div>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            className={filterInputClassName}
                            placeholder="Search..."
                        />
                        <ul className={optionsListClassName}>
                            {filteredOptions.map(option => (
                                <li key={option.value} onMouseDown={() => handleOptionClick(option.value, option.label)}>
                                    {option.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <select
                        id={id}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        className={selectClassName}
                    >
                        {options.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )
            }
        </div>
    );
};

export default Select;