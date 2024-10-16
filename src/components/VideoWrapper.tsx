import React, { useRef, useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import Loading from './Loading';

interface VideoWrapperProps {
    children: React.ReactNode;
    animationDuration: number;
}

const VideoWrapper: React.FC<VideoWrapperProps> = ({ children, animationDuration }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [webMUrl, setWebMUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!canvasRef.current || !contentRef.current) return;

        setLoading(true);
        setProgress(0);

        const scale = 3;
        const width = 300;
        const height = 640;

        canvasRef.current.width = width * scale;
        canvasRef.current.height = height * scale;

        const frameRate = 60;
        const stream = canvasRef.current.captureStream(frameRate);
        const chunks: Blob[] = [];
        const recorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp8' });

        recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                chunks.push(event.data);
            }
        };

        recorder.onstop = async () => {
            const blob = new Blob(chunks, { type: 'video/webm' });
            if (!blob.size) {
                console.error('Le blob généré est vide');
                setLoading(false);
                return;
            }

            const webMVideoUrl = URL.createObjectURL(blob);
            setWebMUrl(webMVideoUrl);
            setLoading(false);
        };

        recorder.start();

        const renderToCanvas = () => {
            if (contentRef.current && canvasRef.current) {
                html2canvas(contentRef.current, {
                    logging: false,
                    scale: 2
                }).then((generatedCanvas) => {
                    if (generatedCanvas.width > 0 && generatedCanvas.height > 0) {
                        const ctx = canvasRef.current!.getContext('2d', { willReadFrequently: true });
                        if (ctx) {
                            ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
                            ctx.drawImage(generatedCanvas, 0, 0, generatedCanvas.width, generatedCanvas.height,
                                0, 0, canvasRef.current!.width, canvasRef.current!.height);
                        }
                    } else {
                        console.error('Le canevas généré a des dimensions invalides');
                    }
                });
            }
        };

        const startTime = Date.now();

        const intervalId = setInterval(() => {
            renderToCanvas();

            const elapsedTime = Date.now() - startTime;
            const calculatedProgress = (elapsedTime / animationDuration) * 100;
            setProgress(Math.min(calculatedProgress, 100));
        }, 1000 / frameRate);

        setTimeout(() => {
            recorder.stop();
            clearInterval(intervalId);
            setProgress(100);
        }, animationDuration);

        return () => {
            recorder.stop();
            clearInterval(intervalId);
        };
    }, [animationDuration]);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            {webMUrl ? (
                <video width="300" height="640" src={webMUrl} controls autoPlay />
            ) : (
                <>
                    <div ref={contentRef} style={{ width: '300px', height: '640px' }}>
                        {children}
                    </div>
                    <div style={{width: '100%', height: '100%'}}>
                        <Loading progress={progress} />
                    </div>
                </>
            )}
        </div>
    );
};

export default VideoWrapper;