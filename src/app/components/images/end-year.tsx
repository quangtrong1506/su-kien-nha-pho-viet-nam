'use client';

import React, { useEffect, useRef } from 'react';
import { drawAvatarCanvas, drawBackgroundCanvas, drawFullname, drawInitialCanvas, drawRole } from './draw';
import useDebounce from './use-debounce';

export type EndYearImageProps = {
    fullname?: string;
    description?: string;
    image?: File;
};
const EndYearImage: React.FC<EndYearImageProps> = ({ description, fullname, image }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const debouncedDescription = useDebounce<string | undefined>(description, 300);
    const debouncedFullname = useDebounce<string | undefined>(fullname, 300);
    const debouncedImage = useDebounce<File | undefined>(image, 300);

    useEffect(() => {
        const loadData = async () => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            await drawAvatarCanvas(ctx, debouncedImage);
            await drawBackgroundCanvas(ctx);
            drawFullname(ctx, debouncedFullname || 'Họ & Tên');
            drawRole(ctx, debouncedDescription || 'Chức danh');
            console.log(debouncedFullname);
        };
        loadData();
    }, [debouncedDescription, debouncedFullname, debouncedImage]);

    useEffect(() => {
        const loadData = async () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                await drawInitialCanvas(canvas);
                if (!ctx) return;
                await drawAvatarCanvas(ctx);
                await drawBackgroundCanvas(ctx);
                drawFullname(ctx, 'Họ & Tên');
                drawRole(ctx, 'Chức danh');
            }
        };
        loadData();
    }, []);

    return (
        <div className="flex justify-center items-center w-full">
            <canvas id='canvas-preview' ref={canvasRef} className="w-full"></canvas>
        </div>
    );
};

export default EndYearImage;
