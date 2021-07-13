import { Fragment, useState, useEffect } from 'react';
import styled from "styled-components";
import { data } from "../../data";

export default function Carousel() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [autoPlay, setAutoPlay] = useState(false);
    const dataLength = data.length;

    useEffect(() => {
        let interval = null;
        if (autoPlay) {
            interval = setInterval(() => {
                nextSlide();
            }, 3000)
        }
        return () => clearInterval(interval);
    }, [currentSlide, autoPlay])

    const nextSlide = () => {
        setCurrentSlide(currentSlide === dataLength - 1 ? 0 : currentSlide + 1);
    };
    
    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? dataLength - 1 : currentSlide - 1);
    };

    return (
        <Fragment>
            <Container>
                <ChangeSlideButton position="left" onClick={() => prevSlide()}>
                    <Icon className="fas fa-arrow-left" />
                </ChangeSlideButton>
                <ChangeSlideButton position="right" onClick={() => nextSlide()}>
                    <Icon className="fas fa-arrow-right" />
                </ChangeSlideButton>
                {
                    data.map((slide, index) => (
                        <Slide>
                            {
                                index === currentSlide && (
                                    <Img src={slide.image} key={index} />
                                )
                            }
                        </Slide>
                    ))
                }
                <Stepper>
                    {
                        data.map((step, index) => (
                            <StepperDot active={index === currentSlide ? true : false} />
                        ))
                    }
                </Stepper>
                <PlayButton onClick={() => setAutoPlay(!autoPlay)}>
                    <Icon className={autoPlay ? "fas fa-pause icon" : "fas fa-play icon"} />
                </PlayButton>
            </Container>
        </Fragment>
    )
}

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Slide = styled.div`
`;

const Img = styled.img`
    border-radius: 10px !important;
    height: 30rem;
    min-width: 60rem;
    max-width: 60rem;
    object-fit: contain;
`;

const ChangeSlideButton = styled.button`
    position: absolute;
    top: calc(50% - 25px);
    ${props => props.position ? props.position : 'left'}: 150px;
    background-color: white;
    height: 50px;
    width: 50px;
    border-radius: 25px;
    border: none;
    opacity: .6;
    cursor: pointer;
`;

const Icon = styled.i`
    color: black;
`;

const Stepper = styled.div`
    display: flex;
    position: absolute;
    bottom: -20px;
`;

const StepperDot = styled.div`
    background-color: ${props => props.active ? 'white' : 'transparent'};
    border: 2px solid white;
    height: 4px;
    width: 4px;
    border-radius: 50%;
    margin: 0px 5px;
`;

const PlayButton = styled.button`
    position: absolute;
    bottom: -60px;
    background-color: white;
    height: 30px;
    width: 30px;
    border-radius: 15px;
    border: none;
    opacity: .6;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;
