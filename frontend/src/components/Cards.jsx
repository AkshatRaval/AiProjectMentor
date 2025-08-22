import { Target, TrendingUp, Layers } from 'lucide-react';
import React from 'react';

// Custom element switcher
const CardElement = ({ type, value }) => {
    switch (type) {
        case 'progress':
            return (
                <div className="w-full mt-2">
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Progress</span>
                        <span className="font-semibold">{value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all"
                            style={{ width: `${value}%` }}
                        />
                    </div>
                </div>
            );
        case 'level':
            return (
                <div className="mt-2 flex items-center gap-2">
                    <div className="bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-lg px-2 py-1 flex items-center">
                        <Layers color="#cf8a04" size={16} />
                        <span className="ml-1 text-xs font-bold text-yellow-900">Level {value}</span>
                    </div>
                </div>
            );
        case 'growth':
            return (
                <div className="flex items-center gap-2 mt-2">
                    <TrendingUp color="green" size={20} />
                    <span className="text-sm font-semibold text-green-600">{value}% Growth</span>
                </div>
            );
        default:
            return null;
    }
};

const Cards = ({
    card
}) => {
    return (
        <div className="bg-white shadow-md border border-gray-100 rounded-xl p-5 flex flex-col gap-3 w-full min-w-[220px] relative group hover:shadow-xl transition-all duration-200 hover:-translate-y-1 hover:scale-[1.04]">
            <div className="absolute top-4 right-4 opacity-80 transition-opacity duration-200 group-hover:opacity-100">
                {card.icon}
            </div>
            <p className="text-base font-semibold text-gray-800 mb-1 transition-colors duration-200 group-hover:text-purple-600">
                {card.title}
            </p>
            <p className="text-3xl font-extrabold text-purple-500 mb-2 transition-colors duration-200 group-hover:text-pink-500">
                {card.value}
            </p>
            {card.elementType && <CardElement type={card.elementType} value={card.elementValue} />}
            <div className="absolute inset-0 rounded-xl pointer-events-none group-hover:ring-2 group-hover:ring-purple-400 transition-all duration-200"></div>
        </div>
    );
};

export default Cards;