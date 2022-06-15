import axios from "axios";
import { useEffect, useState } from "react";
import "./Pets.css";
import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";
import { response } from "msw";

const Pets = () => {
  const [dogs, setDogs] = useState([]);
  const [filteredDogs, setFilteredDogs] = useState([]);
  const [filters, setFilters] = useState({ gender: "any", favoured: "any" });

  const fetchDogs = async () => {
    const r = await axios.get("http://localhost:4000/dogs");
    setDogs(r.data);
    setFilteredDogs(r.data);
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  useEffect(() => {
    let dogsFiltered = [...dogs];
    if (filters.gender !== "any") {
      dogsFiltered = dogsFiltered.filter((dog) => dog.gender === filters.gender);
    }
    if (filters.favoured !== "any") {
      dogsFiltered = dogsFiltered.filter((dog) => {
        return (
          dog.favoured === Boolean(filters.favoured === "favoured")
        );
      });
    }
    setFilteredDogs(dogsFiltered);
  }, [filters]);

  return (
    <div className="container">
      <div className="app-container">
        <Filter filters={ filters } setFilters={ setFilters } />
        <Cards dogs={ filteredDogs } setDogs={ setDogs } />
      </div>
    </div>);
};

export default Pets;