import { useState } from 'react';
import {FaStar} from 'react-icons/fa'
import './styles.css'

const StarRating = ({numStars = 5}) => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleStarClick = (currentIndex) => {
        console.log("click:\n" + currentIndex)
        setRating(currentIndex);
    }

    const handleMouseEnter = (currentIndex) => {
        console.log("mouse enter:\n" + currentIndex)
        setHover(currentIndex);
    }

    const handleMouseLeave = () => {
        console.log("mouse leave:\n" + currentIndex)
        setHover(rating);
    }

    return (
        <div className="star-rating">
            {
                [...Array(numStars)].map((_, index) => {
                    index += 1

                    return <FaStar
                        className={index <= (hover || rating) ? 'active' : 'inactive'}
                        key={index}
                        onClick={() => handleStarClick(index)}
                        onMouseMove={() => handleMouseEnter(index)}
                        onMouseLeave={() => handleMouseLeave()}
                        size={40}
                    />
                })
            }
        </div>
    );
}

export default StarRating;