import React, { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const Search = ({ isDesktop }) => {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <>
            {isDesktop ? (
                <div className="flex basis-2/4 border border-slate-300 rounded-2xl group mr-auto">
                    <button type="submit" className="px-2">
                        <SearchOutlinedIcon className="text-slate-700" />
                    </button>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="rounded-2xl p-2 outline-none flex-1"
                    />
                </div>
            ) : (
                <div className="relative flex items-center group">
                    <button
                        type="button"
                        className="px-0"
                        onClick={() => setSearchOpen(!searchOpen)}
                    >
                        <SearchOutlinedIcon className="text-slate-800 font-bold" />
                    </button>
                    {searchOpen && (
                        <div className="fixed left-0 top-14 w-full">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full p-2 outline-none rounded-2xl shadow-md"
                                autoFocus
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-700"
                                onClick={() => setSearchOpen(false)}
                            >
                                <CloseOutlinedIcon />
                            </button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default Search;
