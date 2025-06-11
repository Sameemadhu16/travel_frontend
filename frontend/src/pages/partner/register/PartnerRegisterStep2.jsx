import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import Main from '../../../components/Main'

export default function PartnerRegisterStep2() {
    return (
        <AnimatePresence>
            <motion.div
                key={''}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="relative w-full overflow-x-hidden"
            >
                <Main>
                    
                </Main>
            </motion.div>
        </AnimatePresence>
    )
}
