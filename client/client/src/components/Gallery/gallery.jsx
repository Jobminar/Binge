// import './gallery.css'
// import { useNavigate } from 'react-router-dom'
// import grid from '../../assets/images/grid.png'
// import gallerymain from '../../assets/images/gallery-main.png'
// import g1 from '../../assets/images/Rectangle 50.png'
// import g2 from '../../assets/images/Rectangle 51.png'
// import g3 from '../../assets/images/Rectangle 56.png'
// import g4 from '../../assets/images/gallery-1.png'

// const Gallery =(()=>{
//     const navigate = useNavigate()
//     return(
//         <>
//             <div className="gallery-con">
//                 <div className='gallery-head'>
//                    <h1>GALLERY</h1>
//                    <img src={grid} alt='gridcontoller' onClick={()=>{navigate('/navbar')}}/>
//                 </div>
//                  <div className='main-image'>
//                      <img src={gallerymain} alt='main-img'/>
//                  </div>
//                  <div className='sub-images'>
//                        <img className='img1' src={g1} alt='g1'/>
//                        <img className='img1' src={g2} alt='g2'/>
//                        <img className='img1' src={g3} alt='g3'/>
//                        <img className='img1' src={g4} alt='g4'/>
//                  </div>
//             </div>

//         </>
//     )
// })
// export default Gallery

import { useState } from "react";
import "./gallery.css";
import { useNavigate } from "react-router-dom";
import grid from "../../assets/images/grid.png";
import gallerymain from "../../assets/images/gallery-main.png";
import g1 from "../../assets/images/Rectangle 50.png";
import g2 from "../../assets/images/Rectangle 51.png";
import g3 from "../../assets/images/Rectangle 56.png";
import g4 from "../../assets/images/gallery-1.png";

const Gallery = () => {
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState(gallerymain); // State to manage the main image

  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc); // Update main image source on click
  };

  return (
    <div className="gallery-con">
      <div className="gallery-head">
        <h1>GALLERY</h1>
        <img
          src={grid}
          alt="gridcontoller"
          onClick={() => {
            navigate("/navbar");
          }}
        />
      </div>
      <div className="main-image">
        <img src={mainImage} alt="main-img" />
      </div>
      <div className="sub-images">
        <img
          className="img1"
          src={g1}
          alt="g1"
          onClick={() => handleImageClick(g1)}
        />
        <img
          className="img1"
          src={g2}
          alt="g2"
          onClick={() => handleImageClick(g2)}
        />
        <img
          className="img1"
          src={g3}
          alt="g3"
          onClick={() => handleImageClick(g3)}
        />
        <img
          className="img1"
          src={g4}
          alt="g4"
          onClick={() => handleImageClick(g4)}
        />
      </div>
    </div>
  );
};

export default Gallery;
