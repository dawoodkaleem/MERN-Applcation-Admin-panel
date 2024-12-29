import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
export const AdminContacts = () => {
  const { authorizationToken } = useAuth();
  const [contactsData, setcontactsData] = useState([]);
  const getContactsData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      // console.log("contacts Data", data);
      if (response.ok) {
        setcontactsData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Contact By ID Functionality
  const deleteContactById = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      if (response.ok) {
        getContactsData();
        // console.log("Deleted Contact data Successfully");
        toast.success("Delete successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Not Deleted");
      }
    } catch (error) {
      // const errorData = await response.json();
      toast.error(error || "Not Deleted");
    }
  };

  useEffect(() => {
    getContactsData();
  });
  return (
    <>
      <section className="admin-contacts-section">
        <h1>Admin Contact Data</h1>
        <div className="container admin-users">
          {contactsData.map((curContactData, index) => {
            const { username, email, message, _id } = curContactData;
            return (
              <div key={index}>
                <p>{username}</p>
                <p>{email}</p>
                <p>{message}</p>
                <button className="btn" onClick={() => deleteContactById(_id)}>
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
