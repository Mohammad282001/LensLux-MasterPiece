// FaceDetection.js
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as faceapi from 'face-api.js';
import { Camera, RefreshCw, Upload, AlertCircle } from 'lucide-react';

const FaceDetection = ({ setFaceShape, setError }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [facePosition, setFacePosition] = useState({ x: 0, y: 0, width: 0, height: 0 });

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

        startVideo();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, [setError]);

    useEffect(() => {
        const detectFacePosition = async () => {
            if (videoRef.current) {
                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());
                if (detections && detections.length > 0) {
                    const { x, y, width, height } = detections[0].box;
                    setFacePosition({ x, y, width, height });
                }
            }
        };

        const interval = setInterval(detectFacePosition, 100);
        return () => clearInterval(interval);
    }, []);

    const detectFace = async () => {
        if (!videoRef.current) return;

        setError(null);
        try {
            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();

            if (detections && detections.length > 0) {
                const landmarks = detections[0].landmarks;
                const shape = analyzeFaceShape(landmarks);
                setFaceShape(shape);

                // Draw face landmarks
                const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
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

        const faceLength = jaw[8].y - (leftEyebrow[0].y + rightEyebrow[4].y) / 2;
        const jawWidth = jaw[16].x - jaw[0].x;
        const foreheadWidth = leftEyebrow[4].x - rightEyebrow[0].x;
        const chinWidth = jaw[10].x - jaw[6].x;
        const cheekboneWidth = (leftEye[3].x + rightEye[0].x) / 2 - (leftEye[0].x + rightEye[3].x) / 2;

        const lengthWidthRatio = faceLength / jawWidth;
        const foreheadJawRatio = foreheadWidth / jawWidth;
        const chinJawRatio = chinWidth / jawWidth;
        const cheekboneJawRatio = cheekboneWidth / jawWidth;

        if (lengthWidthRatio > 1.5) return 'Oblong';
        if (chinJawRatio < 0.8 && cheekboneJawRatio > 1) return 'Diamond';
        if (foreheadJawRatio < 0.8 && chinJawRatio < 0.9) return 'Triangle';
        if (foreheadJawRatio > 1 && chinJawRatio < 0.9) return 'Heart';
        if (lengthWidthRatio < 1.2 && cheekboneJawRatio < 1.1) return 'Round';
        if (lengthWidthRatio > 1.2 && lengthWidthRatio < 1.4 && cheekboneJawRatio < 1.1) return 'Square';
        return 'Oval';
    };

    return (
        <div className="relative">
            <video
                ref={videoRef}
                width="720"
                height="560"
                autoPlay
                muted
                className="rounded-lg shadow-lg transform scale-x-[-1]"
            />
            <canvas
                ref={canvasRef}
                width="720"
                height="560"
                className="absolute top-0 left-0 transform scale-x-[-1]"
            />
            <div
                className="absolute border-2 border-green-500 rounded-lg transition-all duration-200"
                style={{
                    left: `${facePosition.x}px`,
                    top: `${facePosition.y}px`,
                    width: `${facePosition.width}px`,
                    height: `${facePosition.height}px`,
                    transform: 'scaleX(-1)'
                }}
            />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={detectFace}
                className="mt-4 px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center w-full"
            >
                <Camera className="mr-2" size={20} />
                Detect Face Shape
            </motion.button>
        </div>
    );
};

// FileUpload.js


const FileUpload = ({ setUploadedImage, setFaceShape, setError }) => {
    const fileInputRef = useRef(null);
    const canvasRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
                const img = new Image();
                img.onload = () => {
                    setUploadedImage(img);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    const detectFace = async () => {
        if (!imagePreview) {
            setError('Please upload an image first.');
            return;
        }

        setError(null);
        try {
            const img = await faceapi.fetchImage(imagePreview);
            const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();

            if (detections && detections.length > 0) {
                const landmarks = detections[0].landmarks;
                const shape = analyzeFaceShape(landmarks);
                setFaceShape(shape);

                // Draw face landmarks
                const displaySize = { width: img.width, height: img.height };
                console.log(displaySize, "clicked")
                faceapi.matchDimensions(canvasRef.current, displaySize);
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
            } else {
                setError('No face detected. Please ensure the image contains a clear face.');
            }
        } catch (err) {
            console.error('Face detection error:', err);
            setError('Face detection failed. Please try a different image.');
        }
    };

    const analyzeFaceShape = (landmarks) => {
        // ... (same implementation as in FaceDetection component)
    };

    return (
        <div className="relative">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
            />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => fileInputRef.current.click()}
                className="px-6 py-3 bg-gray-200 text-black rounded-md shadow-md hover:bg-gray-300 transition-colors duration-300 flex items-center justify-center w-full mb-4"
            >
                <Upload className="mr-2" size={20} />
                Upload Image
            </motion.button>
            {imagePreview && (
                <div className="relative mb-4">
                    <img src={imagePreview} alt="Uploaded" className="w-full rounded-lg shadow-lg" />
                    <canvas
                        ref={canvasRef}
                        className="absolute top-0 left-0 w-full h-full"
                    />
                </div>
            )}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={detectFace}
                className="px-6 py-3 bg-black text-white rounded-md shadow-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center w-full"
                disabled={!imagePreview}
            >
                <RefreshCw className="mr-2" size={20} />
                Detect Face Shape
            </motion.button>
        </div>
    );
};

// Instructions.js


const Instructions = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-lg shadow-lg"
        >
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <AlertCircle className="mr-2" size={24} />
                For best results:
            </h2>
            <ul className="space-y-2">
                <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Ensure good lighting on your face
                </li>
                <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Face the camera directly
                </li>
                <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Remove glasses if possible
                </li>
                <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Keep hair away from your face
                </li>
                <li className="flex items-start">
                    <span className="mr-2">•</span>
                    For camera mode, position your face within the green guide box
                </li>
            </ul>
        </motion.div>
    );
};

export { FaceDetection, FileUpload, Instructions };