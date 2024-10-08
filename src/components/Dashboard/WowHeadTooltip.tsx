// #file: WowHeadTooltip.tsx
import React from "react";

interface WowHeadTooltipProps {
    id: number;
    type: string;
    name: string;
    icon?: string
}

const WowHeadTooltip: React.FC<WowHeadTooltipProps> = ({id, type, name, icon}) => {

    const getIconUrl = (icon: string = '') => {
        if(icon !== '') {
            return `https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg`;
        }
        return ``;
    }

    const iconUrl = getIconUrl(icon);

    return (
        <a
            href={`https://www.wowhead.com/${type}=${id}`}
            target="_blank"
            data-wowhead={`${type}=${id}`}
            style={{ display: 'flex', alignItems: 'center' }} // css flex pour aligner icône et texte
        >
            {
                icon && (
                    <img
                        src={iconUrl}
                        alt={`${name} icon`}
                        style={{marginRight: '5px', width: '24px', height: '24px'}} // Ajuster le style
                    />
                )
            }
            {name}
        </a>
    );
}

export default WowHeadTooltip