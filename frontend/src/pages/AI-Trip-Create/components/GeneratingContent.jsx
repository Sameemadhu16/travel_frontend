import { FaRobot } from 'react-icons/fa'
import Main from '../../../components/Main'

export default function GeneratingContent() {
    return (
        <Main>
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-brand-accent rounded-full mb-6 animate-pulse">
                    <FaRobot className="text-brand-primary text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-content-primary mb-4">Creating Your Perfect Trip...</h2>
                <p className="text-content-secondary mb-8">Our AI is analyzing your preferences and matching them with the best local experiences</p>
                <div className="max-w-md mx-auto bg-surface-secondary rounded-lg p-6">
                    <div className="space-y-3">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-brand-primary rounded-full animate-pulse mr-3"></div>
                            <span className="text-content-secondary">Analyzing destination and preferences...</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-brand-primary rounded-full animate-pulse mr-3" style={{animationDelay: '0.5s'}}></div>
                            <span className="text-content-secondary">Finding best guides and activities...</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-brand-primary rounded-full animate-pulse mr-3" style={{animationDelay: '1s'}}></div>
                            <span className="text-content-secondary">Matching hotels and transportation...</span>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}
