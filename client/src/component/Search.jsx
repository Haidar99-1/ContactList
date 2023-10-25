import { useContext, useState } from "react";
import SearchBar from "../component/searchBar"
import Contact from "../component/contact"
import UseFetch from "../hooks/useFetch"
import { UserContext } from "../context/UserContext"
import { Link } from "react-router-dom";

export default function Search() {
    const [userSearch, setUserSearch] = useState("");
    const [userHasSearched, setUserHasSearched] = useState(false);
    const [searchResults, setsearchResults] = useState([]);
    const url = 'http://localhost:3001/getUsers'
    const [contactData, error] = UseFetch(url)
    const user = useContext(UserContext)


    function filterContactData(searchTerm) {
        setUserHasSearched(true);
        setUserSearch(searchTerm);

        let filteredResults;

        if (searchTerm == "") {
            filteredResults = [];
            setUserHasSearched(false);
        } else {
            filteredResults = contactData.filter((contact) => {
                return (
                    contact.firstName.includes(searchTerm) ||
                    contact.lastName.includes(searchTerm)
                );
            });
        }
        setsearchResults(filteredResults)
    }

    return (
        <div>
            <header className="flex flex-col md:flex-row justify-between">
                <p className="pl-14 mt-8 md:w-1/3 text-gray-700 font-semibold italic self-center">
                    Welcome, {user.userName}
                </p>
                <nav className="w-full flex justify-end mt-8">
                    <Link
                        to="/create"
                        className="w-11/12 m-auto lg:w-1/6 text-center text-lg py-4 px-6 rounded-full border-2 lg:mr-16 text-gray-100 border-green-600 bg-green-600 hover:bg-gray-50 hover:border-green-600 hover:text-green-600 hover:shadow-2xl"
                    >
                        Add Contact
                    </Link>

                </nav>
            </header>
            <SearchBar
                searchValue={userSearch}
                searchValueFunction={filterContactData} />
            <section className="flex justify-center my-4">
                {userHasSearched ? (
                    <>
                        <div className={
                            searchResults.length > 0
                                ? "hidden" :
                                "bg-red-100 border border-red-400 text bg-red-700 md:w-2/5 lg:max-w-md px-4 rounded-md"
                        } role="alert"
                        >
                            <p className="text-center">
                                <strong>Sorry!</strong> There are no contacts with the name of {""}
                                <strong>{userSearch}</strong>
                            </p>
                        </div>
                        <div className={searchResults.length > 0
                            ? "grid grid-cols-3 gap-2 place-items-center"
                            : "hidden"
                        }
                        >
                            {searchResults.map((contact) => {
                                return (
                                    <Link key={contact._id} to={`/getUsers/${contact._id}`}>
                                        <Contact
                                            name={`${contact.firstName} ${contact.lastName}`}
                                            telNumber={contact.telphone}
                                            company={contact.company}
                                            email={contact.email}
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </>

                ) : (
                    <div className="grid grid-cols-3 gap-2 place-items-center">
                        {
                            contactData.map((contact) => {
                                return (
                                    <Link key={contact._id} to={`/getUsers/${contact._id}`}>
                                        <Contact
                                            name={`${contact.firstName} ${contact.lastName}`}
                                            telNumber={contact.telphone}
                                            company={contact.company}
                                            email={contact.email}
                                        />
                                    </Link>
                                );
                            })}
                    </div>
                )}
            </section>
        </div>

    );
}