import React, { useState } from "react";
import { motion } from "framer-motion";
import single_vision_image from "../../../../assets/images/GlassesLenses/single_vision_image.apng";
import single_vision_static from "../../../../assets/images/GlassesLenses/single_vision_static.jpeg";
import frame_only_image from "../../../../assets/images/GlassesLenses/frame_only_image.apng";
import frame_only_static from "../../../../assets/images/GlassesLenses/frame_only_static.jpeg";
import non_prescription_image from "../../../../assets/images/GlassesLenses/non_prescription_image.apng";
import non_prescription_static from "../../../../assets/images/GlassesLenses/non_prescription_static.jpeg";
import progressive_image from "../../../../assets/images/GlassesLenses/progressive_image.apng";
import progressive_static from "../../../../assets/images/GlassesLenses/progressive_static.png.jpeg";

const VisionNeedSelector = ({ onSelect, selected }) => {
    const options = [
        {
            value: "single-vision",
            label: "Single Vision",
            description:
                "These lenses have one prescription that covers the entire lens for visual corrections (distance, astigmatism OR close up) and are therefore not for those who have multiple prescriptions. These lenses correct blurry vision from far away or blurry vision up close.",
            imageHovered: single_vision_image,
            imageStatic: single_vision_static,
            price: 10,
        },
        {
            value: "progressive",
            label: "Progressive",
            description: "These lenses are designed for people who require more than one vision correction, such as near-sightedness and farsightedness. This means they can correct both normal AND presbyopia prescriptions.",
            imageHovered: progressive_image,
            imageStatic: progressive_static,
            price: 15,
        },
        {
            value: "non-prescription",
            label: "Non-Prescription",
            description: "These clear lenses complement your lifestyle thanks to the possibility of adding protective treatments or stylish colorings, without needing the lenses for vision correction.",
            imageHovered: non_prescription_image,
            imageStatic: non_prescription_static,
            price: 5,
        },
        {
            value: "frame-only",
            label: "Frame Only",
            description: "Purchase the frame without lenses",
            imageHovered: frame_only_image,
            imageStatic: frame_only_static,
            price: 0,
        },
    ];

    const [hoveredOption, setHoveredOption] = useState(null);

    return (
        <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">Choose your vision need</h3>
            <div className="space-y-4">
                {options.map((option) => (
                    <motion.button
                        key={option.value}
                        onClick={() => onSelect(option.value, option.price)}
                        className={`w-full p-4 border rounded-lg transition-colors text-left ${selected === option.value
                                ? "border-black border-2"
                                : "border-gray-300"
                            }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onMouseEnter={() => setHoveredOption(option.value)}
                        onMouseLeave={() => setHoveredOption(null)}
                    >
                        <div className="grid grid-cols-[150px_1fr_auto] gap-4 items-start">
                            <motion.img
                                src={hoveredOption === option.value ? option.imageHovered : option.imageStatic}
                                alt={option.label}
                                className="w-[150px] h-[150px] object-cover rounded-lg"
                                animate={{ opacity: hoveredOption === option.value ? 1 : 0.9 }}
                                transition={{ duration: 0.2 }}
                            />
                            <div className="flex flex-col">
                                <h3 className="text-lg font-semibold mb-2">{option.label}</h3>
                                <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                                <p className="text-sm font-medium text-green-600 mt-auto">
                                    {option.price === 0 ? "No additional cost" : `+ ${option.price} JOD`}
                                </p>
                            </div>
                            {selected === option.value && (
                                <div className="text-green-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default VisionNeedSelector;