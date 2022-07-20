import { Image } from 'antd';
import { StaticImageData } from 'next/image';
import * as React from 'react';

export interface ImagePageProps {
    src: string | StaticImageData;
    className?: string;
}

export function ImagePage(props: ImagePageProps) {
    return (
        <>
            {/* <Image
                src={src}
                alt="Logo"
                className="object-cover cursor-pointer"
                height="100px"
                width="320px"
                layout="intrinsic"
            /></> */}
            </>
    );
}
