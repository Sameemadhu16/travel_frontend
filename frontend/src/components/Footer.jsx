import { 
    Mail, 
    Phone, 
    MapPin, 
    Facebook, 
    Twitter, 
    Instagram, 
    Linkedin, 
    Youtube,
    ArrowRight,
    Heart
} from 'lucide-react';

    const Footer = () => {
        const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-brand-accent text-content-primary mt-10">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Company Info */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">TravelBlog</h3>
                            <p className="text-content-secondary leading-relaxed">
                                Your ultimate companion for discovering amazing destinations, 
                                travel tips, and unforgettable experiences around the world.
                            </p>
                        </div>
                        
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-5 h-5 text-info" />
                                <span className="text-content-secondary">123 Travel Street, Adventure City, AC 12345</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-info" />
                                <span className="text-content-secondary">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-info" />
                                <span className="text-content-secondary">hello@travelblog.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                        {[
                            'Home',
                            'About Us',
                            'Blog',
                            'Destinations',
                            'Travel Tips',
                            'Contact'
                        ].map((link) => (
                            <li key={link}>
                            <a 
                                href="#" 
                                className="text-content-secondary hover:text-content-primary transition-colors duration-200 flex items-center group"
                            >
                                <ArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                                {link}
                            </a>
                            </li>
                        ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-xl font-semibold mb-6">Categories</h4>
                        <ul className="space-y-3">
                        {[
                            'Adventure Travel',
                            'City Guides',
                            'Food & Culture',
                            'Budget Travel',
                            'Luxury Escapes',
                            'Solo Travel'
                        ].map((category) => (
                            <li key={category}>
                            <a 
                                href="#" 
                                className="text-content-secondary hover:text-content-primary transition-colors duration-200 flex items-center group"
                            >
                                <ArrowRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-200" />
                                    {category}
                            </a>
                            </li>
                        ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-xl font-semibold mb-6">Stay Connected</h4>
                        <p className="text-content-secondary mb-6">
                            Subscribe to our newsletter for the latest travel tips and destination guides.
                        </p>
                        
                        <div className="space-y-4">
                            <div className="flex">
                                <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 bg-background-muted border border-border-medium rounded-l-lg focus:outline-none focus:border-info text-content-primary placeholder-content-tertiary"
                                />
                                <button className="px-6 py-3 bg-brand-primary hover:bg-brand-secondary rounded-r-lg transition-colors duration-200">
                                <ArrowRight className="w-5 h-5 text-white" />
                                </button>
                            </div>

                            {/* Social Media */}
                            <div>
                                <p className="text-content-tertiary mb-3">Follow us on social media</p>
                                <div className="flex space-x-4">
                                {[
                                    { icon: Facebook, href: '#' },
                                    { icon: Twitter, href: '#' },
                                    { icon: Instagram, href: '#' },
                                    { icon: Linkedin, href: '#' },
                                    { icon: Youtube, href: '#' }
                                ].map(({ icon: Icon, href }, index) => (
                                    <a
                                    key={index}
                                    href={href}
                                    className="w-10 h-10 bg-background-hover rounded-full flex items-center justify-center hover:bg-info transition-colors duration-200 group"
                                    >
                                    <Icon className="w-5 h-5 text-content-tertiary group-hover:text-white" />
                                    </a>
                                ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                {/* Bottom Footer */}
            <div className="border-t border-border-medium">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-content-tertiary text-sm">
                        © {currentYear} TravelBlog. All rights reserved.
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
                            <div className="flex items-center space-x-6 text-sm">
                                <a href="#" className="text-content-tertiary hover:text-content-primary transition-colors duration-200">
                                Privacy Policy
                                </a>
                                <a href="#" className="text-content-tertiary hover:text-content-primary transition-colors duration-200">
                                Terms of Service
                                </a>
                                <a href="#" className="text-content-tertiary hover:text-content-primary transition-colors duration-200">
                                Cookie Policy
                                </a>
                            </div>
                        
                            <div className="flex items-center space-x-1 text-sm text-content-tertiary">
                                <span>Made with</span>
                                <Heart className="w-4 h-4 text-danger fill-current" />
                                <span>by TravelBlog Team</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;