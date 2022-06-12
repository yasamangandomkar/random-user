import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaPhone,
  FaLock,
  FaCalendar,
  FaMap,
  FaEnvelopeOpen,
} from "react-icons/fa";
import "./App.css";
const App = () => {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("Random Person");
  const [value, setValue] = useState("name");
  const [image, setImage] = useState(null);

  const getApis = async () => {
    try {
      const { data } = await axios.get("https://randomuser.me/api/");
      const person = data.results[0];
      const { phone, email } = person;
      const { password } = person.login;
      const {
        street: { number, name },
      } = person.location;
      const { large: image } = person.picture;
      const {
        dob: { age },
      } = person;

      const { first, last } = person.name;
      const newPerson = {
        image,
        phone,
        street: `${number} ${name}`,
        age,
        email,
        password,
        name: `${first} ${last}`,
      };
      setUser(newPerson);
      setTitle("name");
      setValue(newPerson.name);
      setImage(newPerson.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApis();
  }, []);

  const handlerHover = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(user[newValue]);
    }
  };

  return (
    <div className="block ">
      <div className="bc-black block"></div>
      <div className="container ">
        <img className="user-img" src={image} alt="" />
        <p className="title">{title}</p>
        <p className="value">{value}</p>
        <div className="items">
          <button className="icon" data-label="name" onMouseOver={handlerHover}>
            <FaUser />
          </button>
          <button className="icon" data-label="age" onMouseOver={handlerHover}>
            <FaCalendar />
          </button>
          <button
            className="icon"
            data-label="street"
            onMouseOver={handlerHover}
          >
            <FaMap />
          </button>
          <button
            className="icon"
            data-label="phone"
            onMouseOver={handlerHover}
          >
            <FaPhone />
          </button>
          <button
            className="icon"
            data-label="email"
            onMouseOver={handlerHover}
          >
            <FaEnvelopeOpen />
          </button>
          <button
            className="icon"
            data-label="password"
            onMouseOver={handlerHover}
          >
            <FaLock />
          </button>
        </div>
        <button className="new-user" onClick={getApis}>
          New User
        </button>
      </div>
    </div>
  );
};

export default App;
