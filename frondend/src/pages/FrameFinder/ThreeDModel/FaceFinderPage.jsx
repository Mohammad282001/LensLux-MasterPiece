import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const FrameTryOn = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const fileInputRef = useRef(null);
    const [faceShape, setFaceShape] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUsingCamera, setIsUsingCamera] = useState(true);
    const [uploadedImage, setUploadedImage] = useState(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const glassesModelRef = useRef(null);
    const cameraRef = useRef(null);

    const loadGlassesModel = () => {
        const loader = new GLTFLoader();
        loader.load('/3D_Models/glasses.glb', (gltf) => {
            glassesModelRef.current = gltf.scene;
            glassesModelRef.current.scale.set(0.01, 0.01, 0.01);
            glassesModelRef.current.position.set(0, 0, 0);
            sceneRef.current.add(glassesModelRef.current);
            console.log('Glasses model loaded:', glassesModelRef.current);
        }, undefined, (error) => {
            console.error('Error loading glasses model:', error);
            setError('Failed to load glasses model. Please try again.');
        });
    };

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 720 / 560, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(720, 560);
        document.getElementById('3d-container').appendChild(renderer.domElement);
        camera.position.z = 5;

        sceneRef.current = scene;
        rendererRef.current = renderer;
        cameraRef.current = camera;

        loadGlassesModel();

        const animate = () => {
            requestAnimationFrame(animate);
            if (glassesModelRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };
        animate();

        return () => {
            renderer.dispose();
            document.getElementById('3d-container').innerHTML = '';
        };
    }, []);

    useEffect(() => {
        const loadModels = async () => {
            try {
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                    faceapi.nets.faceLandmark68Net.loadFromUri('/models')
                ]);
                setIsLoading(false);
            } catch (err) {
                console.error('Error loading face detection models:', err);
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
                console.error('Error accessing camera:', err);
                setError('Unable to access camera. Please ensure you have given permission.');
            }
        };

        if (!isLoading && isUsingCamera) {
            startVideo();
        }
    }, [isLoading, isUsingCamera]);

    const detectFace = async (input) => {
        if (!input) return;

        try {
            const detections = await faceapi.detectAllFaces(input, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks();

            if (detections && detections.length > 0) {
                const landmarks = detections[0].landmarks;
                const shape = analyzeFaceShape(landmarks);
                setFaceShape(shape);

                const eyeLeft = landmarks.getLeftEye();
                const eyeRight = landmarks.getRightEye();

                positionGlassesModel(eyeLeft, eyeRight);

                const displaySize = { width: input.width || input.videoWidth, height: input.height || input.videoHeight };
                faceapi.matchDimensions(canvasRef.current, displaySize);
                const resizedDetections = faceapi.resizeResults(detections, displaySize);
                canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
            } else {
                console.log('No face detected');
            }
        } catch (err) {
            console.error('Face detection error:', err);
        }
    };

    const positionGlassesModel = (eyeLeft, eyeRight) => {
        if (glassesModelRef.current) {
            const leftEyeCenter = getCenterPoint(eyeLeft);
            const rightEyeCenter = getCenterPoint(eyeRight);

            const midPoint = {
                x: (leftEyeCenter.x + rightEyeCenter.x) / 2,
                y: (leftEyeCenter.y + rightEyeCenter.y) / 2,
            };

            // Convert 2D coordinates to 3D world coordinates
            const vector = new THREE.Vector3(
                (midPoint.x / 720) * 2 - 1,
                -(midPoint.y / 560) * 2 + 1,
                0
            );
            vector.unproject(cameraRef.current);

            glassesModelRef.current.position.set(vector.x, vector.y, vector.z);

            // Calculate rotation based on eye positions
            const angle = Math.atan2(rightEyeCenter.y - leftEyeCenter.y, rightEyeCenter.x - leftEyeCenter.x);
            glassesModelRef.current.rotation.z = angle;

            // Adjust scale based on the distance between eyes
            const eyeDistance = Math.sqrt(
                Math.pow(rightEyeCenter.x - leftEyeCenter.x, 2) +
                Math.pow(rightEyeCenter.y - leftEyeCenter.y, 2)
            );
            const scale = eyeDistance / 100; // Adjust this factor as needed
            glassesModelRef.current.scale.set(scale, scale, scale);
        }
    };

    const getCenterPoint = (landmarks) => {
        const sum = landmarks.reduce(
            (acc, point) => ({
                x: acc.x + point.x,
                y: acc.y + point.y,
            }),
            { x: 0, y: 0 }
        );
        return { x: sum.x / landmarks.length, y: sum.y / landmarks.length };
    };

    const analyzeFaceShape = (landmarks) => {
        const jaw = landmarks.getJawOutline();
        const leftEyebrow = landmarks.getLeftEyeBrow();
        const rightEyebrow = landmarks.getRightEyeBrow();

        const faceLength = jaw[8].y - (leftEyebrow[0].y + rightEyebrow[4].y) / 2;
        const jawWidth = jaw[16].x - jaw[0].x;

        const lengthWidthRatio = faceLength / jawWidth;
        return lengthWidthRatio > 1.5 ? 'Oblong' : 'Round';
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    setUploadedImage(img);
                    setIsUsingCamera(false);
                    detectFace(img);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        let animationFrameId;

        const runDetection = async () => {
            if (isUsingCamera && videoRef.current && videoRef.current.readyState === 4) {
                await detectFace(videoRef.current);
            } else if (!isUsingCamera && uploadedImage) {
                await detectFace(uploadedImage);
            }
            animationFrameId = requestAnimationFrame(runDetection);
        };

        if (!isLoading) {
            runDetection();
        }

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isLoading, isUsingCamera, uploadedImage]);

    return (
        <div className="relative">
            <div className="flex justify-center mt-5">
                <video ref={videoRef} autoPlay muted className="rounded-lg" width="720" height="560" style={{ display: isUsingCamera ? 'block' : 'none' }} />
                {!isUsingCamera && uploadedImage && (
                    <img src={uploadedImage.src} alt="Uploaded" className="rounded-lg" width="720" height="560" />
                )}
                <canvas ref={canvasRef} className="absolute top-0 left-0" width="720" height="560" />
            </div>
            <div id="3d-container" className="absolute top-0 left-0" style={{ width: '720px', height: '560px' }} />
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="mt-4" accept="image/*" />
            {faceShape && <p className="mt-2">Your face shape is: {faceShape}</p>}
            {error && <p className="text-red-600 mt-2">{error}</p>}
        </div>
    );
};

export default FrameTryOn;