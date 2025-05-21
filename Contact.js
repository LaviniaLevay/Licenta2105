import React from "react";

function Contact() {
    return (
        <div className="container mx-auto py-16 text-center">
            <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
            <form className="max-w-md mx-auto">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                />
                <textarea
                    placeholder="Message"
                    className="w-full mb-4 px-4 py-2 border rounded-lg"
                />
                <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Send
                </button>
            </form>
        </div>
    );
}

export default Contact;
