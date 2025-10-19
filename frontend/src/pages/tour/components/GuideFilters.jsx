import { useState } from 'react';
import PropTypes from 'prop-types';

export default function GuideFilters({ onApply, noWrapper = false }) {
    const [filters, setFilters] = useState({
        search: '',
        rating: 'Any Rating',
        language: '',
        priceRange: 'Any Price',
        sortBy: 'Highest Rated',
        experience: 'Any Experience',
        specialty: 'All Specialties',
        availability: 'All Guides',
        gender: 'Any Gender',
        certification: 'Any Certification'
    });

    const handleFilterChange = (field, value) => {
        setFilters(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const inner = (
        <>
            {/* First Row - Search, Rating, Language, Price */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-content-primary mb-2">Search Guides</label>
                    <input
                        type="text"
                        placeholder="Search by name or location..."
                        value={filters.search}
                        onChange={(e) => handleFilterChange('search', e.target.value)}
                        className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-content-primary mb-2">Minimum Rating</label>
                    <select
                        value={filters.rating}
                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                        className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                    >
                        <option>Any Rating</option>
                        <option>4.5+ Stars</option>
                        <option>4.0+ Stars</option>
                        <option>3.5+ Stars</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-content-primary mb-2">Languages</label>
                    <select
                        value={filters.language}
                        onChange={(e) => handleFilterChange('language', e.target.value)}
                        className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                    >
                        <option value="">All Languages</option>
                        <option value="english">English</option>
                        <option value="sinhala">Sinhala</option>
                        <option value="tamil">Tamil</option>
                        <option value="german">German</option>
                        <option value="french">French</option>
                        <option value="spanish">Spanish</option>
                        <option value="italian">Italian</option>
                        <option value="japanese">Japanese</option>
                        <option value="chinese">Chinese</option>
                        <option value="hindi">Hindi</option>
                        <option value="arabic">Arabic</option>
                        <option value="russian">Russian</option>
                        <option value="korean">Korean</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-content-primary mb-2">Price Range</label>
                    <select
                        value={filters.priceRange}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                        className="w-full border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                    >
                        <option>Any Price</option>
                        <option>Under 5000</option>
                        <option>5000 - 7500</option>
                        <option>7500 - 10000</option>
                        <option>Over 10000</option>
                    </select>
                </div>
            </div>

            {/* Second Row - Sort By and Apply Button */}
            <div className="flex flex-col md:flex-row md:items-end gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-content-primary mb-2">Sort By:</label>
                    <select
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        className="w-full md:w-48 border border-border-light rounded px-3 py-2 text-sm focus:outline-none focus:border-brand-primary"
                    >
                        <option>Highest Rated</option>
                        <option>Lowest Price</option>
                        <option>Highest Price</option>
                        <option>Most Reviews</option>
                        <option>Most Experience</option>
                    </select>
                </div>
                <button
                    onClick={() => {
                        // Map UI values to backend query params
                        const params = {};
                        if (filters.search) params.search = filters.search;
                        if (filters.rating && filters.rating !== 'Any Rating') params.minRating = filters.rating.replace('+ Stars', '').trim();
                        // Only include language when a specific language is selected
                        if (filters.language && filters.language !== '') {
                            params.language = String(filters.language).toLowerCase().trim();
                        }
                        if (filters.priceRange && filters.priceRange !== 'Any Price') {
                            if (filters.priceRange === 'Under 5000') { params.maxPrice = '5000'; }
                            else if (filters.priceRange === 'Over 10000') { params.minPrice = '10000'; }
                            else {
                                const parts = filters.priceRange.split('-').map(p => p.trim());
                                if (parts.length === 2) { params.minPrice = parts[0]; params.maxPrice = parts[1]; }
                            }
                        }
                        if (filters.sortBy) params.sortBy = filters.sortBy;
                        if (onApply) onApply(params);
                    }}
                    className="bg-brand-primary text-white px-6 py-2 rounded font-semibold hover:bg-warning transition flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"/>
                    </svg>
                    Apply Filters
                </button>
            </div>
        </>
    );

    if (noWrapper) return inner;

    return (
        <div className="bg-white rounded-xl border-2 border-brand-primary p-8 mb-8">
            {inner}
        </div>
    );
}

GuideFilters.propTypes = {
    onApply: PropTypes.func
};

GuideFilters.defaultProps = {
    noWrapper: false
};

GuideFilters.propTypes = {
    onApply: PropTypes.func,
    noWrapper: PropTypes.bool
};
