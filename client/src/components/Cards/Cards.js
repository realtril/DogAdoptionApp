import Card from "../Card/Card";
import "./Cards.css";

const Cards = ({ dogs, setDogs }) => {
  const updateFavourite = (index, favoured) => {
    const updatedDogs = [...dogs];
    updatedDogs[index].favoured = favoured;
    setDogs(updatedDogs);
  };


  return <div className="pet-cards-container">
    { dogs.map((dog, index) => {
      return <Card
        key={ dog.id }
        name={ dog.name }
        phone={ dog.phone }
        email={ dog.email }
        image={ dog.image }
        favoured={ dog.favoured }
        updateFavourite={ updateFavourite }
        index={ index }
      />;
    }) }
  </div>;
};

export default Cards;