import { useEffect, useState } from "react";

const RandomColor = () => {

    const [typeOfColor, setTypeOfColor] = useState('hex');
    const [color, setColor] = useState('#000000')

    const randomColorUtil = (arrLength) => {
        return Math.floor(Math.random() * arrLength);
    }

    const handleGenerateHexColor = () => {
        const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];

        let hexColor = '#'
        for (let i = 0; i < 6; i++) {
            hexColor += hex[randomColorUtil(hex.length)];
        }
        
        setColor(hexColor);
    }

    const handleGenerateRgbColor = () => {
        const r = randomColorUtil(255);
        const g = randomColorUtil(255);
        const b = randomColorUtil(255);
        const rgbColor = `rgb(${r}, ${g}, ${b})`;
        
        setColor(rgbColor);
    }

    // logs =================================================
    useEffect(() => {
        console.log("color type change:", typeOfColor);
    }, [typeOfColor]);

    useEffect(() => {
        console.log("color change:", color);
    }, [color]);

    return (
        <div className="container"
            style={{
                width: '100%',
                height: '100vh',
                background: color
            }}
        >
            <button onClick={() => setTypeOfColor('hex')}>
                Create HEX Color
            </button>
            <button onClick={() => setTypeOfColor('rgb')}>
                Create RGB Color
            </button>
            <button onClick={
                typeOfColor === 'hex' 
                ? handleGenerateHexColor
                : handleGenerateRgbColor
            }>
                Generate Random Color
            </button>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                fontSize: '64px',
                marginTop: '50px',
            }}>
                <h3>{typeOfColor === "hex" ? "HEX COLOR:" : "RGB COLOR:"}</h3>
                <h1>{color}</h1>
            </div>
        </div>
    );
}

export default RandomColor;