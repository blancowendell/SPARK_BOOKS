import React from 'react';

const SearchForm = ({ searchTerm, handleSearch, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className="flex items-center w-full max-w-sm">
            <label htmlFor="simple-search" className="sr-only">
                Search
            </label>
            <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    id="simple-search"
                    placeholder="What are you looking for ?..."
                    value={searchTerm}
                    onChange={handleSearch}
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[var(--main-color)] focus:border-[var(--main-color)] block w-full ps-10 p-2.5"
                />
            </div>
            <button
                type="submit"
                className="ms-2 p-2.5 text-sm font-medium text-[var(--main-text-color)] bg-[var(--main-color)] border border-[var(--main-color)] rounded-lg hover:bg-[var(--main-hover-color)] focus:outline-none focus:ring-4 focus:ring-[var(--main-color)]"
            >
                <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                </svg>
                <span className="sr-only">Search</span>
            </button>
        </form>
    );
};

export default SearchForm;
