import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Slideshow.css';

const Slideshow = () => {
    const slidesRef = useRef([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: '/src/assets/images/slides/Logodemo.png'
        },
        {
            image: '/src/assets/images/slides/slider1.png'
        },
        {
            image: '/src/assets/images/slides/slider4.png'
        },
    ];

    useEffect(() => {
        slidesRef.current.forEach((slide, index) => {
            const direction = index === currentSlide ? 1 : 0;

            gsap.to(slide, {
                opacity: direction,
                x: direction ? '0%' : '100%',
                zIndex: direction ? 1 : 0,
                duration: 1,
                ease: 'power2.inOut'
            });
        });

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [currentSlide, slides.length]);

    const handleDotClick = (index) => {
        setCurrentSlide(index);
    };

    return (
        <div className="slideshow-container">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    ref={(el) => (slidesRef.current[index] = el)}
                    className="slide"
                    style={{
                        opacity: index === 0 ? 1 : 0,
                        backgroundImage: `url(${new URL(slide.image, import.meta.url).href})`
                    }}
                >
                    {/* <div className="slide-content">
                        <h2>{slide.title}</h2>
                        <p>{slide.description}</p>
                    </div> */}
                </div>
            ))}
            <div className="dots">
                {slides.map((_, index) => (
                    <span
                        key={index}
                        className={`dot ${currentSlide === index ? 'active' : ''}`}
                        onClick={() => handleDotClick(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slideshow;
