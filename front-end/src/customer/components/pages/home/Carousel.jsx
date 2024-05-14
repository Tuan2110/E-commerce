import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const mainCaroselData = [
    {
        image:"https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/1/0/10_5.jpg",
    },
    {
        image:"https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/1/2/12_4.jpg",
    },
    {
        image:"https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/9/_/9_8.jpg",
    },
    {
        image:"https://www.ethnicplus.in/media/mageplaza/bannerslider/banner/image/1/1/11_4.jpg",
    }
]

const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

const items = mainCaroselData.map((item) => <img className='cursor-pointer' 
    role='presentation' src={item.image} alt=""/>)

export const Carousel = () => (
    <div>
        <AliceCarousel
        items={items}
        disableButtonsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
    />
    </div>
);