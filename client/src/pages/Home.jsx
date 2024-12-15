// import React from "react";

const Home = () => {
  return (
    <>
      <main>
        <section className="selection-hero">
          <div className="container grid grid-two-cols">
            <div className="hero">
              <p> We are the World Best IT Company </p>
              <h1>Welocme to the Thapa Technical</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
                ipsa incidunt necessitatibus architecto unde totam voluptatem
                quibusdam hic tempora voluptates, obcaecati quisquam nostrum!
                Adipisci necessitatibus blanditiis veniam laborum nulla aliquam?
              </p>
              <div className="btn btn-group">
                <a href="/contact">
                  <button className="btn">connect now</button>
                </a>
                <a href="/services">
                  <button className="btn secondary-btn">learn more</button>
                </a>
              </div>
            </div>
            {/* Hero images */}
            <div className="hero-image">
              <img src="/images/home.png" alt="" width="400" height="500" />
            </div>
          </div>
        </section>
      </main>
      {/* Section 2nd */}
      <section className="section-analytics">
        <div className="container grid grid-four-cols">
          <div className="div1">
            <h2>50+</h2>
            <p>registred companies</p>
          </div>
          <div className="div1">
            <h2>100,00+</h2>
            <p>Happy Clients</p>
          </div>
          <div className="div1">
            <h2>500+</h2>
            <p>Well known Developers</p>
          </div>
          <div className="div1">
            <h2>24/7</h2>
            <p>services</p>
          </div>
        </div>
      </section>
      {/* 3rd Section */}
      <section className="selection-hero">
        <div className="container grid grid-two-cols">
          {/* hero Section */}
          {/* Hero images */}
          <div className="hero-image">
            <img src="/images/home.png" alt="" width="400" height="500" />
          </div>
          <div className="hero">
            <p> We are the World Best IT Company </p>
            <h1>Welocme to the Thapa Technical</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              ipsa incidunt necessitatibus architecto unde totam voluptatem
              quibusdam hic tempora voluptates, obcaecati quisquam nostrum!
              Adipisci necessitatibus blanditiis veniam laborum nulla aliquam?
            </p>
            <div className="btn btn-group">
              <a href="/contact">
                <button className="btn">connect now</button>
              </a>
              <a href="/services">
                <button className="btn secondary-btn">learn more</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
