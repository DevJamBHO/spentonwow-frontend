import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import styles from '@/styles/Loading.module.scss';

class RColor {
    hue: number;
    goldenRatio: number;
    hexwidth: number;

    constructor() {
        this.hue = Math.random();
        this.goldenRatio = 0.618033988749895;
        this.hexwidth = 2;
    }

    hsvToRgb(h: number, s: number, v: number): number[] {
        const h_i = Math.floor(h * 6),
            f = h * 6 - h_i,
            p = v * (1 - s),
            q = v * (1 - f * s),
            t = v * (1 - (1 - f) * s);
        let r = 255,
            g = 255,
            b = 255;
        switch (h_i) {
            case 0:
                r = v;
                g = t;
                b = p;
                break;
            case 1:
                r = q;
                g = v;
                b = p;
                break;
            case 2:
                r = p;
                g = v;
                b = t;
                break;
            case 3:
                r = p;
                g = q;
                b = v;
                break;
            case 4:
                r = t;
                g = p;
                b = v;
                break;
            case 5:
                r = v;
                g = p;
                b = q;
                break;
        }
        return [Math.floor(r * 256), Math.floor(g * 256), Math.floor(b * 256)];
    }

    padHex(str: string): string {
        if (str.length > this.hexwidth) return str;
        return new Array(this.hexwidth - str.length + 1).join('0') + str;
    }

    get(hex: boolean, saturation?: number, value?: number): string | number[] {
        this.hue += this.goldenRatio;
        this.hue %= 1;
        if (typeof saturation !== 'number') saturation = 0.5;
        if (typeof value !== 'number') value = 0.95;
        const rgb = this.hsvToRgb(this.hue, saturation, value);
        if (hex)
            return (
                '#' +
                this.padHex(rgb[0].toString(16)) +
                this.padHex(rgb[1].toString(16)) +
                this.padHex(rgb[2].toString(16))
            );
        else return rgb;
    }
}

interface LoadingProps {
    progress?: number;
}

const Loading: React.FC<LoadingProps> = ({ progress }) => {
    useEffect(() => {
        const animateCalculator = (counter: number) => {
            const polys = document.querySelectorAll("#calc g polygon");
            const rand = Math.floor(Math.random() * polys.length);
            const item = polys[rand] as HTMLElement | undefined;
            const screen = document.getElementById("screenText") as HTMLElement | null;

            if (!item || !screen) return;

            const color2 = "#121212";
            const color1 = "#FFD700";

            gsap.to(screen, { duration: 0.5, fill: color2 });
            gsap.to(item, {
                duration: 0.5,
                fill: color1,
                onComplete: function () {
                    counter++;
                    item.style.fill = "#E0E0E0";

                    if (counter < 500) {
                        animateCalculator(counter);
                    }
                },
                onCompleteParams: [item]
            });
        };

        animateCalculator(0);
    }, []);

    useEffect(() => {
        const screenText = document.getElementById("screenText") as HTMLElement | null;
        if (screenText) {
            // Mise à jour du contenu du texte et des attributs pour s'assurer qu'il reste lisible
            screenText.textContent = progress !== undefined ? `${Math.round(progress)}%` : '';
            // Changer la couleur après mise à jour
            screenText.setAttribute("fill", "#121212");
            screenText.setAttribute("text-anchor", "middle");
        }
    }, [progress]);

    return (
        <div className={styles.calcContainer}>
            <svg xmlns="http://www.w3.org/2000/svg" id="calc" className={styles.calc} clipRule="evenodd" fillRule="evenodd" imageRendering="optimizeQuality" shapeRendering="geometricPrecision" textRendering="geometricPrecision" viewBox="0 0 500 500" width="200" height="200">
                <defs>
                    <linearGradient gradientUnits="userSpaceOnUse" id="a" x1="249.997" x2="249.997" y1="82.801" y2="417.199">
                        <stop offset="0" stopColor="#1F1F1F" />
                        <stop offset="1" stopColor="#1F1F1F" />
                    </linearGradient>
                </defs>
                <g>
                    <path d="M100 30h300c11 0 20 9 20 20v400c0 11-9 20-20 20h-300c-11 0-20-9-20-20v-400c0-11 9-20 20-20z" fill="url(#a)" stroke="#121212" strokeWidth="10" />
                    <rect id="screen" x="120" y="60" width="260" height="80" rx="10" ry="10" fill="#E0E0E0" stroke="#121212" strokeWidth="10" />
                    <text id="screenText" className="lcd-text" x="300" y="120" fontFamily="LCD" fontSize="70" fill="#121212" textAnchor="middle" />
                    <polygon fill="#E0E0E0" points="190,175 235,175 235,220 190,220" />
                    <polygon fill="#E0E0E0" points="265,175 310,175 310,220 265,220" />
                    <polygon fill="#E0E0E0" points="335,175 380,175 380,220 335,220" />
                    <polygon fill="#E0E0E0" points="115,175 160,175 160,220 115,220" />
                    <polygon fill="#E0E0E0" points="190,245 235,245 235,290 190,290" />
                    <polygon fill="#E0E0E0" points="265,245 310,245 310,290 265,290" />
                    <polygon fill="#E0E0E0" points="335,245 380,245 380,290 335,290" />
                    <polygon fill="#E0E0E0" points="115,245 160,245 160,290 115,290" />
                    <polygon fill="#E0E0E0" points="190,320 235,320 235,365 190,365" />
                    <polygon fill="#E0E0E0" points="265,320 310,320 310,365 265,365" />
                    <polygon fill="#E0E0E0" points="115,320 160,320 160,365 115,365" />
                    <polygon fill="#E0E0E0" points="190,395 235,395 235,440 190,440" />
                    <polygon fill="#E0E0E0" points="265,395 310,395 310,440 265,440" />
                    <polygon fill="#E0E0E0" points="335,320 380,320 380,440 335,440" />
                    <polygon fill="#E0E0E0" points="115,395 160,395 160,440 115,440" />
                </g>
            </svg>
        </div>
    );
};

export default Loading;