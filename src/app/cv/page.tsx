import React from "react";

const Portfolio = () => {
  return (
    <>
      <header className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-semibold">John Doe</h1>
          <p className="text-lg">Front-End Mobile Developer</p>
        </div>
      </header>

      <section id="experience" className="py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Experience</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold">
                Company A - Front-End Developer
              </h3>
              <p className="text-gray-600">Duration: 2019 - 2022</p>
              <p className="text-gray-600">
                Description of responsibilities and achievements...
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold">
                Company B - Mobile App Developer
              </h3>
              <p className="text-gray-600">Duration: 2017 - 2019</p>
              <p className="text-gray-600">
                Description of responsibilities and achievements...
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold">
                Company C - Web Developer
              </h3>
              <p className="text-gray-600">Duration: 2015 - 2017</p>
              <p className="text-gray-600">
                Description of responsibilities and achievements...
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-8 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold">Project 1</h3>
              <p className="text-gray-600">Description of Project 1...</p>
              <a href="#" className="text-blue-500 hover:underline">
                Project Link
              </a>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold">Project 2</h3>
              <p className="text-gray-600">Description of Project 2...</p>
              <a href="#" className="text-blue-500 hover:underline">
                Project Link
              </a>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-semibold">Project 3</h3>
              <p className="text-gray-600">Description of Project 3...</p>
              <a href="#" className="text-blue-500 hover:underline">
                Project Link
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 John Doe - All rights reserved</p>
        </div>
      </footer>
    </>
  );
};

export default Portfolio;
