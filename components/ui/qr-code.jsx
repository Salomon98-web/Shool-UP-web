'use client';

import { QRCodeSVG } from "qrcode.react";

export default function QRCode({value, size=250}){
    return(
        <div className="bg-white p-2">
            <QRCodeSVG
                value={value}
                size={size}
                level="H"
                bgColor="#FFFFFF"
                fgColor="#000000"
                includeMargin={true}
            />
        </div>
    )
}