import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Alert.css'

const Alert = ({ message, type }) => {
    if (!message) return null;

    const alertClasses = `alert alert-${type}`;
    const alertVariants = {
        hidden: { opacity: 0, y: 50 }, // Initial state
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } }, // Animated state
        exit: { opacity: 0, y: 50, transition: { duration: 0.3, ease: 'easeInOut' } }, //State when exiting
    };

    return (
        <motion.div
            className={alertClasses}
            variants={alertVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {message}
        </motion.div>
    );
};

export default Alert;