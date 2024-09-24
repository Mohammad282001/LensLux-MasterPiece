import React from 'react';
import contact from "./images/contact.jpeg"
import men from "./images/men.jpeg"
import women from "./images/women.jpeg"


const ImageCard = () => {
    const sections = [
        {
            sectionName: "Men",
            sectionCategories: ["Sunglasses", "Optical"],
            image: men,
            mainLink: "/MenCategory",
        },
        {
            sectionName: "Women",
            sectionCategories: ["Sunglasses", "Optical"],
            image: women,
            mainLink: "/WomenCategory",
        },
        {
            sectionName: "Contact Lens",
            sectionCategories: ["Clear", "Colored"],
            image: contact,
            mainLink: "/ContactLens",
        }
    ];

    return (
        <div className="flex flex-col items-center gap-8 px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8 md:px-24">

            <div className='flex flex-col md:flex-row justify-center w-full gap-8'>
                {sections.slice(0, 2).map((section) => (
                    <figure
                        key={section.sectionName}
                        className=" transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 card-container"
                    >
                        <a href={section.mainLink.toLowerCase()}>
                            <img
                                className="w-full h-auto"
                                src={section.image}
                                alt={`${section.sectionName} image`}
                            />
                        </a>
                        <figcaption className="absolute text-center text-sm sm:text-lg md:text-xl lg:text-2xl text-white bottom-6 w-full px-4">
                            <a href={section.mainLink.toLowerCase()}>
                                <h1 className='mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>{section.sectionName}</h1>
                            </a>
                            <div className="card-content">
                                {section.sectionCategories.map((category, index) => (
                                    <a
                                        key={index}
                                        href={`${section.mainLink.toLowerCase()}/${category.replace(/\s+/g, '-').toLowerCase()}`}
                                        className='block text-sm sm:text-base md:text-lg lg:text-xl hover:underline'
                                    >
                                        <p>{category}</p>
                                    </a>
                                ))}
                            </div>
                        </figcaption>
                    </figure>
                ))}
            </div>
            <div className='flex flex-col md:flex-row justify-center w-full '>
                {sections.slice(2).map((section) => (
                    <figure
                        key={section.sectionName}
                        className="relative max-w-full transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 card-container gap-8"
                    >
                        <a href={section.mainLink}>
                            <img
                                className="w-full h-auto "
                                src={section.image}
                                alt={`${section.sectionName} image`}
                            />
                        </a>
                        <figcaption className="absolute text-center text-sm sm:text-lg md:text-xl lg:text-2xl text-white bottom-6 w-full px-4">
                            <a href={section.mainLink.toLowerCase()}>
                                <h1 className='mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>{section.sectionName}</h1>
                            </a>
                            <div className="card-content">
                                {section.sectionCategories.map((category, index) => (
                                    <a
                                        key={index}
                                        href={`${section.mainLink.toLowerCase()}/${category.replace(/\s+/g, '-').toLowerCase()}`}
                                        className='block text-sm sm:text-base md:text-lg lg:text-xl hover:underline'
                                    >
                                        <p>{category}</p>
                                    </a>
                                ))}
                            </div>
                        </figcaption>
                    </figure>
                ))}
            </div>
        </div>
    );
};

export default ImageCard;
