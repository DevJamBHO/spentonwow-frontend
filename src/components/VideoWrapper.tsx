import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';

interface VideoWrapperProps {
    children: React.ReactNode;
}

const VideoWrapper: React.FC<VideoWrapperProps> = ({ children }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [webMUrl, setWebMUrl] = useState<string | null>(null);

    useEffect(() => {
        if (!canvasRef.current || !contentRef.current) return;

        const stream = canvasRef.current.captureStream(30);
        const chunks: Blob[] = [];
        const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8' });

        recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        recorder.onstop = async () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            const webMVideoUrl = URL.createObjectURL(blob);
            setWebMUrl(webMVideoUrl);
        };

        recorder.start();

        const renderToCanvas = () => {
            if (contentRef.current && canvasRef.current) {
                html2canvas(contentRef.current).then((generatedCanvas) => {
                    // Vérifier les dimensions du canevas généré
                    if (generatedCanvas.width > 0 && generatedCanvas.height > 0) {
                        const ctx = canvasRef.current!.getContext('2d');
                        if (ctx) {
                            ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
                            ctx.drawImage(generatedCanvas, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
                        }
                    } else {
                        console.error('Le canevas généré a des dimensions invalides');
                    }
                });
            }
        };

        const intervalId = setInterval(renderToCanvas, 1000 / 30); // 30 FPS animation

        setTimeout(() => {
            recorder.stop();
            clearInterval(intervalId);
        }, 10000);

        return () => {
            recorder.stop();
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div>
            <canvas ref={canvasRef} width="300" style={{ display: 'none' }}></canvas>
            <div ref={contentRef} style={{ width: '300' }}>
                {children}
            </div>
            {webMUrl && <video src={webMUrl} controls autoPlay />}
        </div>
    );
};

export default VideoWrapper;