import { FiSend } from 'react-icons/fi'

export default function InputField({
    inputMessage, 
    handleSendMessage, 
    setInputMessage, 
    error,
}) {
    return (
        <div className='border-t border-border-light p-3 sm:p-4 bg-background-muted'>
            <div className='flex items-center gap-2'>
                <input
                    type='text'
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder='Type your message here...'
                    className='flex-1 border border-gray-200 rounded-full px-3 sm:px-4 py-2 sm:py-3 
                        text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-brand-primary 
                        focus:border-transparent transition-all duration-200'
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                    onClick={handleSendMessage}
                    className='bg-brand-primary text-white p-2 sm:p-3 rounded-full hover:bg-brand-primary-dark 
                        transition-colors min-w-[40px] sm:min-w-[48px] h-[40px] sm:h-[48px] flex items-center 
                        justify-center'
                >
                    <FiSend className='w-4 h-4 sm:w-5 sm:h-5'/>
                </button>
            </div>
            { error && (
                <p className="text-danger text-sm sm:text-[16px] font-medium mt-2 px-2">{error}</p>
            )}
        </div>
    )
}