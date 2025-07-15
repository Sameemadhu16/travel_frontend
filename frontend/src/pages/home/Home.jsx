import React from 'react';
import HeroSection from '../../components/HeroSection';
import RecommendedDestinations from '../../components/RecommendedDestinations';
import TravelBlogSection from '../../components/TravelBlogSection';
import WhyChooseUs from '../../components/WhyChooseUs';
import CallToAction from '../../components/CallToAction';
import Main from '../../components/Main';
// import Footer from '../../components/Footer';

export default function Home() {
    return (
        <Main id="main-content-blur">
            <HeroSection />
            <RecommendedDestinations />
            <TravelBlogSection />
            <WhyChooseUs />
            {/* <CallToAction /> */}
            {/* <Footer /> */}
        </Main>
    );
}
