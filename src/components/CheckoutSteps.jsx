import React from 'react';

const CheckoutSteps = ({ currentStep }) => {
    const steps = ['Shipping', 'Payment', 'Place Order'];
    return (
        <div className="flex justify-evenly items-center mb-6">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className={`flex items-center ${index <= currentStep
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-400'
                        }`}
                >
                    <div
                        className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full ${index <= currentStep
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200'
                            }`}
                    >
                        {index + 1}
                    </div>
                    <span className="ml-2 text-sm md:text-base">{step}</span>
                    {index < steps.length - 1 && (
                        <div className="w-8 h-1 bg-gray-300 mx-2 md:mx-4"></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CheckoutSteps;
