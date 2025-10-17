import HeroSection from '../../components/HeroSection';
import RecommendedDestinations from '../../components/RecommendedDestinations';
import TravelBlogSection from '../../components/TravelBlogSection';
import WhyChooseUs from '../../components/WhyChooseUs';
import CallToAction from '../../components/CallToAction';
import Main from '../../components/Main';
import { useEffect } from 'react';
// import Footer from '../../components/Footer';

export default function Home() {

    useEffect(() => {
        return () => {
            // Clear form data when component unmounts
            localStorage.removeItem('formData');
        };
    }, []);

    return (
        <>
            <HeroSection />
            <RecommendedDestinations />
            <TravelBlogSection />
            <WhyChooseUs />
            {/* <CallToAction /> */}
            {/* <Footer /> */}
        </>
    );
}
