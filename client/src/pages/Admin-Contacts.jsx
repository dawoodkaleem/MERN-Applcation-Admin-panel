import { useEffect } from "react";
import { useAuth } from "../store/auth";
export const AdminContacts = () => {
  const { authorizationToken } = useAuth();

  const getContactsData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("contacts Data", data);
      if (response.ok) {
        console.log("contact data", response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getContactsData();
  });
  return <h1>Hello thapaContacts Contact panel</h1>;
};
