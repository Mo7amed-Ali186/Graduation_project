import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


export function HomeSlider() {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "0",
        slidesToShow: 6,
        speed: 500,
        arrows:true,
      };

    return (
        <>
        <div  style={{paddingTop:'100px'}}>
        <Slider {...settings}>
          <div>
            <img style={{width:'100%',height:' 50vh'}} src={require('../images/1681511964020.jpeg')} alt="slider" />
          </div>
          <div>
            <img style={{width:'100%',height:' 50vh'}} src={require('../images/1681511865180.jpeg')} alt="slider" />
          </div>
          <div>
            <img style={{width:'100%',height:' 50vh'}} src={require('../images/1681511818071.jpeg')} alt="slider" />
          </div>
          <div>
            <img style={{width:'100%',height:' 50vh'}} src={require('../images/1681511452254.png')} alt="slider" />
          </div>
          <div>
            <img style={{width:'100%',height:' 50vh'}} src={require('../images/1681511427130.png')} alt="slider" />
          </div>
          <div>
            <img style={{width:'100%',height:' 50vh'}} src={require('../images/1681511392672.png')} alt="slider" />
          </div>
          <div>
            <img style={{width:'100%',height:' 50vh'}} src={require('../images/1681511368164.png')} alt="slider" />
          </div>          
          <div>
            <img style={{width:'100%',height:' 50vh'}} src={require('../images/1681511179514.png')} alt="slider" />
          </div>
          <div>
            <img style={{width:'100%',height:' 50vh'}}  src={require('../images/1681511156008.png')} alt="slider" />
          </div>          
          <div>
            <img style={{width:'100%',height:' 50vh'}}  src={require('../images/1681511121316.png')} alt="slider" />
          </div>
        </Slider>
      </div>
   
            
        </>
    )
}
