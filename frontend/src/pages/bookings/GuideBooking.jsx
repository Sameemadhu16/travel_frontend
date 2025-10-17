import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGuides } from '../../api/tourService';
import { API_BASE_URL } from '../../core/service';
import defaultGuideImg from '../../assets/users/user1.jpg';
import GuideFilters from '../tour/components/GuideFilters';
import GuideCard from '../tour/components/GuideCard';
import Spinner from '../../components/Spinner';
import Main from '../../components/Main';

const GuideBooking = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        location: '',
        date: '',
        duration: '',
        language: '',
        priceRange: [0, 15000],
        rating: '',
        specialization: ''
    });
    const [sortBy, setSortBy] = useState('recommended');
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedGuides, setSelectedGuides] = useState([]);
    const MAX_GUIDES = 3;

    useEffect(() => {
        const fetchGuides = async (params = {}) => {
            try {
                setLoading(true);
                const guidesData = await getAllGuides(params);
                if (!Array.isArray(guidesData)) {
                    setError('Invalid data format received from server');
                    setGuides([]);
                    return;
                }

                const normalized = guidesData.map(g => {
                    const rawImage = g.user?.profilePictures?.[0] || g.user?.profilePicture || g.image || defaultGuideImg;
                    const isAbsolute = /^(https?:\/\/|blob:|data:)/.test(rawImage) || rawImage.startsWith('/');
                    const image = isAbsolute ? rawImage : `${API_BASE_URL.replace(/\/$/, '')}/${rawImage.replace(/^\//, '')}`;
                    const name = g.user ? `${g.user.firstName || ''} ${g.user.lastName || ''}`.trim() : g.name || 'Unknown Guide';
                    // Normalize languages: backend may return a comma-separated string or an array
                    let languages = [];
                    if (Array.isArray(g.languages)) languages = g.languages.map(l => String(l).trim()).filter(Boolean);
                    else if (typeof g.languages === 'string') languages = g.languages.split(',').map(s => s.trim()).filter(Boolean);
                    else if (Array.isArray(g.user?.languages)) languages = g.user.languages.map(l => String(l).trim()).filter(Boolean);
                    else if (typeof g.user?.languages === 'string') languages = String(g.user.languages).split(',').map(s => s.trim()).filter(Boolean);

                    return { ...g, image, name, languages };
                });

                setGuides(normalized);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch guides:', err);
                setError(err.response?.data?.message || err.message || 'Failed to load guides.');
                setGuides([]);
            } finally {
                setLoading(false);
            }
        };

        fetchGuides();
        GuideBooking.fetchGuides = fetchGuides;
    }, []);

    const handleApplyFilters = (params) => {
        // keep local filter state in sync for UI
        setFilters(prev => ({ ...prev, ...params }));
        if (typeof GuideBooking.fetchGuides === 'function') {
            GuideBooking.fetchGuides(params);
        } else {
            getAllGuides(params).then(data => setGuides(Array.isArray(data) ? data : [])).catch(() => setError('Failed to load guides'));
        }
    };

    const handleGuideSelection = (guide) => {
        const exists = selectedGuides.some(g => g.id === guide.id);
        if (exists) {
            setSelectedGuides(prev => prev.filter(g => g.id !== guide.id));
        } else {
            if (selectedGuides.length < MAX_GUIDES) {
                setSelectedGuides(prev => [...prev, guide]);
            } else {
                // optional: show toast / small message - for now console
                console.warn(`You can select maximum ${MAX_GUIDES} guides`);
            }
        }
    };

    const isGuideSelected = (id) => selectedGuides.some(g => g.id === id);

    const handleBookGuide = (guideId) => {
        navigate(`/bookings/guide/${guideId}/confirm`);
    };

    const filteredGuides = guides.filter(guide => {
        if (filters.location && !guide.location?.toLowerCase().includes(filters.location.toLowerCase())) return false;
        if (filters.language && !guide.languages?.some(lang => lang.toLowerCase().includes(filters.language.toLowerCase()))) return false;
        if (filters.specialization && !guide.specializations?.some(spec => spec.toLowerCase().includes(filters.specialization.toLowerCase()))) return false;
        if (filters.rating && guide.rating < parseFloat(filters.rating)) return false;
        if (filters.priceRange && guide.price && guide.price > filters.priceRange[1]) return false;
        return true;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow text-center">
                    <p className="text-danger mb-4">{error}</p>
                    <button onClick={() => window.location.reload()} className="px-4 py-2 bg-brand-primary text-white rounded">Retry</button>
                </div>
            </div>
        );
    }

    return (
        <Main>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-brand-primary text-white py-6 rounded-t">
                    <div className="container mx-auto px-4">
                        <h1 className="text-3xl font-bold mb-4">Find Your Perfect Guide</h1>
                        <p className="text-sm">Search and book experienced local guides. Select multiple guides to request availability or book a single guide directly.</p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    {/* Full-width filters */}
                    <div className="mb-6">
                        <GuideFilters onApply={handleApplyFilters} noWrapper={false} />
                    </div>

                    {/* Header + Sort */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <h2 className="text-xl font-semibold">{filteredGuides.length} guides available</h2>
                        <div className="ml-auto">
                            <select className="p-2 border border-gray-300 rounded-lg" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="recommended">Recommended</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                                <option value="reviews">Most Reviews</option>
                            </select>
                        </div>
                    </div>

                    {/* Guides Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {filteredGuides.map((guide) => (
                            <GuideCard
                                key={guide.id}
                                guide={guide}
                                isSelected={isGuideSelected(guide.id)}
                                onSelect={() => handleGuideSelection(guide)}
                                disabled={selectedGuides.length >= MAX_GUIDES && !isGuideSelected(guide.id)}
                            >
                                <div className="mt-4 flex justify-between items-center">
                                    <div>
                                        <span className="text-2xl font-bold text-brand-primary">LKR {guide.price?.toLocaleString() || '—'}</span>
                                        <span className="text-gray-600"> per day</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleBookGuide(guide.id)} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">Book Now</button>
                                    </div>
                                </div>
                            </GuideCard>
                        ))}
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default GuideBooking;
