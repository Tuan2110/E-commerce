import React from 'react'
import {Carousel} from './Carousel';
import HomeProduct from './HomeProduct';
import TopProducts from './TopProducts';
import Banner from './Banner';
import Subscribe from './Subscribe';


export const HomePage = () => {
    return (
        <div>
            <Carousel/>
            <HomeProduct/>
            <TopProducts/>
            <Banner />
            <Subscribe />
        </div>
    );
}
