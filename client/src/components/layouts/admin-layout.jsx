import { NavLink } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to={"/admin/users"}>users</NavLink>
              </li>
              <li>contacts</li>
              <li>services</li>
              <li>Home</li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
