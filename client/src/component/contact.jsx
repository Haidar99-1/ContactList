import imgProfile from "../images/user.png" 

export default function Contact({imgSrc = imgProfile, name, telphone, email, company}) {
    return (
        <figure className="w-56 flex flex-col items-center bg-grey-50 rounded-xl space-y-2 shadow-lg">
            <div>
                <img
                    src={imgSrc}
                    alt="the contact's headshot"
                    className="w-24 h-24 rounded-full"
                />
            </div>
            <h1 className="text-lg font-semibold">{name}</h1>
            <p className="font-ligh text-gray-500">{telphone}</p>
            <p className="font-light text-gray-500">{email}</p>
            <p className="font-light text-gray-500">{company}</p>
        </figure>
    )
}


