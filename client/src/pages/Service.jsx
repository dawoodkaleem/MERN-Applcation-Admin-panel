// import React from "react";
import { useAuth } from "../store/auth";

const Service = () => {
  const { services } = useAuth();
  const { isLoggedIn } = useAuth();

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>
      <div className="container grid grid-three-cols">
        {services && services.length > 0 && isLoggedIn ? (
          services.map((curElem) => {
            const { id, price, description, provider, service } = curElem; // Assuming each service has a unique `id`
            return (
              <div className="card" key={id}>
                <div className="card-img">
                  <img
                    src="/images/design.png"
                    alt={`Service provided by ${provider}`}
                    width="300"
                    height="300"
                  />
                </div>
                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p>{provider}</p>
                    <p>{price}</p>
                  </div>
                  <h2>{service}</h2>
                  <p>{description}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-services-message">
            No services available at the moment. Please check back later.
          </p>
        )}
      </div>
    </section>
  );
};

export default Service;
