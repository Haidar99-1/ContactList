function SearchBar({searchValue, searchValueFunction}) {
    return (
        <main className="w-full mt-6 md:w-1/2 lg:max-w-md m-auto">
            <form 
            className="flex px-4 border-2 border-grey-300 rounded-md justify-between hover:shadow-lg" 
            onSubmit={(e)=> e.preventDefault()}>
                <label htmlFor="searchBar" className="sr-only">
                    Search Bar
                    </label>
                <input
                    id="searchBar"
                    type="text"
                    name="searchBar"
                    placeholder="Search Contacts"
                    className="py-2 flex-auto focus:outline-none"
                    value={searchValue}
                    onChange={(e) => searchValueFunction(e.target.value)}

                />
                <button
                    id="searchSubmit"
                    aria-label="click to submit search"
                    type='submit'
                    >

                    {" "}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        eight="100"
                        viewBox="0 0 50 50"
                        className="w-8 h-8 text-gray-500 h-4 w-4 fill-current">
                        <path 
                            d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                    </svg>

                </button>
            </form>
        </main>
    )
}
export default SearchBar;