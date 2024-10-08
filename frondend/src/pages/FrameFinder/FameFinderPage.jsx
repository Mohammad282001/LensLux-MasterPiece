import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';

const FaceFinderPage = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [faceShape, setFaceShape] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [facePosition, setFacePosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
    const [isUsingCamera, setIsUsingCamera] = useState(true);
    const [uploadedImage, setUploadedImage] = useState(null);

    useEffect(() => {
        const loadModels = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
                await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
                await faceapi.loadSsdMobilenetv1Model('/models')
                // accordingly for the other models:
                // await faceapi.loadTinyFaceDetectorModel('/models')
                // await faceapi.loadMtcnnModel('/models')
                // await faceapi.loadFaceLandmarkModel('/models')
                // await faceapi.loadFaceLandmarkTinyModel('/models')
                // await faceapi.loadFaceRecognitionModel('/models')
                // await faceapi.loadFaceExpressionModel('/models')
                setIsLoading(false);
            } catch (err) {
                setError('Failed to load face detection models. Please refresh and try again.');
                setIsLoading(false);
            }
        };

        loadModels();
    }, []);

    useEffect(() => {
        const startVideo = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                setError('Unable to access camera. Please ensure you have given permission.');
            }
        };

        if (!isLoading && isUsingCamera) {
            startVideo();
        }
    }, [isLoading, isUsingCamera]);

    useEffect(() => {
        const detectFacePosition = async () => {
            if (videoRef.current && !isLoading && isUsingCamera) {
                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());
                if (detections && detections.length > 0) {
                    const { x, y, width, height } = detections[0].box;
                    setFacePosition({ x, y, width, height });
                }
            }
        };

        const interval = setInterval(detectFacePosition, 100);
        return () => clearInterval(interval);
    }, [isLoading, isUsingCamera]);

    const detectFace = async () => {
        if ((!videoRef.current && !uploadedImage) || isLoading) return;

        setError(null);
        try {
            const detections = await faceapi.detectAllFaces(isUsingCamera ? videoRef.current : uploadedImage, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();
            if (detections && detections.length > 0) {
                const landmarks = detections[0].landmarks;
                const shape = analyzeFaceShape(landmarks);
                setFaceShape(shape);
                const displaySize = isUsingCamera
                    ? { width: videoRef.current.width, height: videoRef.current.height }
                    : { width: uploadedImage.width, height: uploadedImage.height };
                faceapi.matchDimensions(canvasRef.current, displaySize);
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
            } else {
                setError('No face detected. Please ensure your face is clearly visible.');
            }
        } catch (err) {
            console.error('Face detection error:', err);
            setError('Face detection failed. Please try again.');
        }
    };

    const analyzeFaceShape = (landmarks) => {
        const jaw = landmarks.getJawOutline();
        const nose = landmarks.getNose();
        const mouth = landmarks.getMouth();
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();
        const leftEyebrow = landmarks.getLeftEyeBrow();
        const rightEyebrow = landmarks.getRightEyeBrow();

        // Calculate face measurements
        const faceLength = jaw[8].y - (leftEyebrow[0].y + rightEyebrow[4].y) / 2;
        const jawWidth = jaw[16].x - jaw[0].x;
        const foreheadWidth = leftEyebrow[4].x - rightEyebrow[0].x;
        const chinWidth = jaw[10].x - jaw[6].x;
        const cheekboneWidth = (leftEye[3].x + rightEye[0].x) / 2 - (leftEye[0].x + rightEye[3].x) / 2;

        // Determine face shape based on ratios
        const lengthWidthRatio = faceLength / jawWidth;
        const foreheadJawRatio = foreheadWidth / jawWidth;
        const chinJawRatio = chinWidth / jawWidth;
        const cheekboneJawRatio = cheekboneWidth / jawWidth;


        console.log("lengthWidthRatio >> ", lengthWidthRatio);
        console.log("foreheadJawRatio >> ", foreheadJawRatio);
        console.log("chinJawRatio >> ", chinJawRatio);
        console.log("cheekboneJawRatio >> ", cheekboneJawRatio);

        if (lengthWidthRatio > 1.5) {
            return 'Oblong';
        } else if (chinJawRatio < 0.8 && cheekboneJawRatio > 1) {
            return 'Diamond';
        } else if (foreheadJawRatio < 0.8 && chinJawRatio < 0.9) {
            return 'Triangle';
        } else if (foreheadJawRatio > 1 && chinJawRatio < 0.9) {
            return 'Heart';
        } else if (lengthWidthRatio < 1.2 && cheekboneJawRatio < 1.1) {
            return 'Round';
        } else if (lengthWidthRatio > 1.2 && lengthWidthRatio < 1.4 && cheekboneJawRatio < 1.1) {
            return 'Square';
        } else {
            return 'Oval';
        }
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    setUploadedImage(img);
                    setIsUsingCamera(false);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleInputMethod = () => {
        setIsUsingCamera(!isUsingCamera);
        setFaceShape(null);
        setError(null);
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Face Shape Finder</h1>
            {isLoading ? (
                <p className="text-lg text-gray-600">Loading face detection models...</p>
            ) : (
                <>
                    <div className="flex justify-center mb-4">
                        <button
                                className="inline-flex items-center px-6 py-3 border border-black text-base font-medium text-black hover:bg-black hover:text-white transition-colors duration-300"
                            onClick={toggleInputMethod}
                        >
                            {isUsingCamera ? "Switch to Image Upload" : "Switch to Camera"}
                        </button>
                    </div>
                    <div className="relative flex justify-center">
                        {isUsingCamera ? (
                            <video
                                ref={videoRef}
                                width="720"
                                height="560"
                                autoPlay
                                muted
                                className="rounded-lg shadow-lg transform scale-x-[-1]"
                            />
                        ) : (
                            <div className="flex flex-col items-center">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    accept="image/*"
                                    className="mb-2"
                                />
                                {uploadedImage && (
                                    <img
                                        src={uploadedImage.src}
                                        alt="Uploaded"
                                        className="rounded-lg shadow-lg max-w-full max-h-560"
                                    />
                                )}
                            </div>
                        )}
                        <canvas
                            ref={canvasRef}
                            width="720"
                            height="560"
                            className="absolute top-0 left-0 rounded-lg"
                        />
                    </div>
                    <button
                            className="mt-6 inline-flex items-center px-6 py-3 border border-black text-base font-medium text-black hover:bg-black hover:text-white transition-colors duration-300"
                        onClick={detectFace}
                        disabled={isLoading}
                    >
                        Detect Face
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                    {faceShape && <p className="text-lg font-semibold mt-4">Your face shape is: <span className="text-red-600">{faceShape}</span></p>}
                </>
            )}
        </div>
    );
};

export default FaceFinderPage;








