import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import contactImgUrl from "../images/user.png" 

export default function ContactDetails() {
    let { id } = useParams();
    const navigate = useNavigate();
    const url = `http://localhost:3001/getUsers/${id}`;
    const [data, error] = useFetch(url)
    const [updateContactData, setUpdateContactData] = useState(data);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        setUpdateContactData(data); // This will update updateContactData when data changes
    }, [data]);

    function handleUpdateValue(e) {
        setUpdateContactData({
            ...updateContactData,
            [e.target.id]:e.target.value,
        })
    }

    function updateContact() {
        if (editing === true) {
            setEditing(!editing);
            fetch(`http://localhost:3001/updateUser/${id}`, {
                method: "PUT",
                headers: {
                   "Content-Type": "application/json"
                },
                body: JSON.stringify(updateContactData),
            });
        } else {
            setEditing(!editing);
        }
    }

    async function deleteContact() {
        await fetch(`http://localhost:3001/deleteUser/${id}`, {
            method: "DELETE",
        });
        navigate("/")
    }


    return (
        <>
            <nav className="md:w-3/4 m-auto mt-8">
                <button
                    aria-label="Navigates back to the home page"
                    onClick={() => navigate("/")}
                >

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="48px"
                        viewBox="0 0 24 24"
                        width="48px"
                        fill="#000000"
                    >
                        <path d="M0 0h24v24H0v0z" fill="none" />
                        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                    </svg>
                </button>
            </nav>

            {error !== null ? (
                <div className="bg-red-100 border border-red-400 text-red-700 md:2/5 lg:max-w-md px-4 py-3 rounded-md m-auto mt-24"
                    role="alert"
                >
                    <p className="text-xl text-center">
                        <strong>Sorry</strong>It seems that htis contact is missing or has been deleted
                    </p>

                </div>
            ) : (
                <div className="flex flex-col items-center my-16 mx-2 md:w-1/2 lg:w-2/5 md:mx-auto shadow-xl bg-gray-50 rounded pt-8 p-4 px-8">
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col justify-center w-64 h-64 bg-gray-300 border-gray-300 rounded-full border-2 shadow-xl text-center p-8 -m-32">
                            <figure>
                                <img
                                    className="m-auto"
                                    src={updateContactData.imgSrc || contactImgUrl}
                                    alt="the content's head shot" />
                            </figure>


                            {!editing ? (
                                <h1 className="text-2xl font-semibold">{`${updateContactData.firstName} ${updateContactData.lastName}`}</h1>

                            ) : (
                                <form className="flex justify-around">
                                    <label className="sr-only" htmlFor="firstName">
                                        First Name
                                    </label>

                                    <input
                                        type="text"
                                        id="firstName"
                                        placeholder={updateContactData.firstName}
                                        onChange={handleUpdateValue}
                                        className="font-light text-xl w-24 mr-2 p-1 rounded"

                                    />

                                    <label className="sr-only" htmlFor="lastName">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        placeholder={updateContactData.lastName}
                                        onChange={handleUpdateValue}
                                        className="font-light text-xl w-24 mr-2 p-1 rounded"
                                    />
                                </form>
                            )}
                        </div>
                        {/* End of head shot and name */}

                        {!editing ? (
                            <div className="grid grid-cols-2 gap-3 item-center justify-items-center mt-32 pt-8">
                                <h2 className="font-bold text-xl">Company:</h2>
                                <p className="font-light text-xl p-1 rounded">
                                    {updateContactData.company}
                                </p>

                                <h2 className="font-bold text-xl">Phone:</h2>
                                <p className="font-light text-xl p-1 rounded">
                                    {updateContactData.telphone}
                                </p>


                                <h2 className="font-bold text-xl">Email:</h2>
                                <p className="font-light text-xl p-1 rounded">
                                    {updateContactData.email}
                                </p>
                            </div>
                        ) : (
                            <form className="grid grid-cols-2 gap-3 item-center justify-items-center mt-32 pt-8">
                                <label htmlFor="company" className="font-bold text-xl">
                                    Company:
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    placeholder={updateContactData.company}
                                    onChange={handleUpdateValue}
                                    className="font-light text-xl"
                                />

                                <label htmlFor="company" className="font-bold text-xl">
                                    Phone:
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    placeholder={updateContactData.telphone}
                                    onChange={handleUpdateValue}
                                    className="font-light text-xl"

                                />

                                <label htmlFor="company" className="font-bold text-xl">
                                    Email:
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    placeholder={updateContactData.email}
                                    onChange={handleUpdateValue}
                                    className="font-light text-xl"
                                />
                            </form>
                        )}
                        <div className="flex justify-around my-6 w-2/5 mx-auto pt-2 space-x-4">
                            <button 
                            className="bg-blue-600 rounded-full py-4 px-8 text-white hover:bg-grey-50 hover:border-blue-400 hover:text-blue-400  hover:shadow-2xl border-2"
                            onClick={updateContact}
                            >
                                {!editing ? "Edit" : "Save"}
                            </button>

                            <button 
                            className="bg-blue-600 rounded-full py-4 px-8 text-white hover:bg-grey-50 hover:border-blue-400 hover:text-blue-400  hover:shadow-2xl border-2"
                            onClick={deleteContact}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>

    )

}