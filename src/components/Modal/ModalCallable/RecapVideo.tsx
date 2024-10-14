import { useRef, useEffect, useState } from 'react';
import { apiFetch } from '@/utils/apiService';
import Loading from "@/components/Loading";

const RecapVideo: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [webMUrl, setWebMUrl] = useState<string | null>(null); // WebM URL as backup
    const [processing, setProcessing] = useState<boolean>(false);

    const words = ["Bonjour", "Salut", "Coucou", "Hola", "Au revoir"];
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFA533"];
    const [index, setIndex] = useState<number>(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = colors[index];
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.font = '60px Arial';
                ctx.fillStyle = '#FFFFFF';
                ctx.textAlign = 'center';
                ctx.fillText(words[index], canvas.width / 2, canvas.height / 2);

                // Ajout du texte en haut à gauche, taille augmentée
                ctx.font = '40px Arial';
                ctx.textAlign = 'left';
                ctx.fillText('spentonwow.com', 10, 40);
            }
        }
    }, [index]);

    useEffect(() => {
        if (!canvasRef.current) return;
        setProcessing(true);

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
            setWebMUrl(webMVideoUrl); // Store WebM URL

            const mp4Blob = await convertWebMToMP4(blob);
            if (mp4Blob) {
                const videoURL = URL.createObjectURL(mp4Blob);
                setVideoUrl(videoURL);
                downloadVideo(mp4Blob);
            } else {
                // If conversion fails, use WebM URL
                setVideoUrl(webMVideoUrl);
            }
            setProcessing(false);
        };

        recorder.start();

        setTimeout(() => {
            recorder.stop();
        }, 10000);

        return () => recorder.stop();
    }, []);

    const convertWebMToMP4 = async (webMBlob: Blob) => {
        const formData = new FormData();
        formData.append('video', webMBlob, 'input.webm');

        try {
            const response = await apiFetch('/api/convert', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Réponse serveur non OK');
            }

            const mp4Blob = await response.blob();
            return mp4Blob;
        } catch (error) {
            console.error('Conversion échouée', error);
            return null;
        }
    };

    const downloadVideo = (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'recap.mp4';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="text-center">
            <canvas ref={canvasRef} width={1080} height={1920} style={{ display: 'none' }} />
            {videoUrl && (
                <div className="mt-4">
                    <video src={videoUrl} controls width="400" />
                </div>
            )}
            {processing && <Loading />}
        </div>
    );
};

export default RecapVideo;