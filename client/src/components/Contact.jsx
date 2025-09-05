import React from "react";
import {
  UilGithubAlt,
  UilLinkedin,
  UilTwitter,
  UilMessage,
} from "@iconscout/react-unicons";

const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-gray-900 text-white py-16 px-6 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mb-6 tracking-tight">
          Contact Me
        </h2>
        <span className="text-gray-400 flex justify-center items-center mb-12 text-lg sm:text-xl space-x-2">
          <UilMessage className="text-blue-500 text-2xl sm:text-3xl" />
          <span>Get in touch</span>
        </span>

        {/* Intro */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed">
            Hi 👋, I'm Aman Kumar, a Full-Stack Developer passionate about
            building modern web applications. Feel free to reach out for
            opportunities or collaborations.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Contact Form */}
          <div className="lg:flex-1 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              className="space-y-6"
            >
              <input
                type="hidden"
                name="access_key"
                value="b45454fb-6dd6-419e-99d3-cb670e7bd880"
              />
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full p-4 rounded-xl bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 outline-none text-base sm:text-lg"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full p-4 rounded-xl bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 outline-none text-base sm:text-lg"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Your Message"
                  required
                  className="w-full p-4 rounded-xl bg-gray-700 border border-gray-600 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 outline-none text-base sm:text-lg resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-2xl text-lg sm:text-xl"
              >
                Send Message <UilMessage />
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="lg:flex-1 flex flex-col justify-center items-center space-y-8 mt-10 lg:mt-0">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-8">
              Connect with me
            </h3>
            <div className="flex gap-8 sm:gap-10 text-4xl sm:text-5xl">
              <a
                href="https://github.com/Amanc77"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-all duration-300 transform hover:scale-125 shadow-md hover:shadow-xl rounded-full p-2"
                aria-label="GitHub"
              >
                <UilGithubAlt />
              </a>
              <a
                href="https://www.linkedin.com/in/amanc77/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-500 transition-all duration-300 transform hover:scale-125 shadow-md hover:shadow-xl rounded-full p-2"
                aria-label="LinkedIn"
              >
                <UilLinkedin />
              </a>
              <a
                href="https://twitter.com/Amanc77"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-all duration-300 transform hover:scale-125 shadow-md hover:shadow-xl rounded-full p-2"
                aria-label="Twitter"
              >
                <UilTwitter />
              </a>
            </div>
            <p className="text-gray-400 text-center mt-8 text-base sm:text-lg max-w-md">
              Reach out for collaborations, freelance work, or just to say hi!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
