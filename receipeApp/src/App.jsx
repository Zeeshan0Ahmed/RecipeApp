import { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe";

function App() {
  const APP_ID = "816575fb";
  const APP_KEY = "0e73ab65d20eef320d77db9f9f29f3f9";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const reponse = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await reponse.json();
    setRecipes(data.hits);
    console.log(data);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
    console.log(search);
  };
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  return (
    <>
      <div className="app">
        <form className="search-form" onSubmit={getSearch}>
          <input
            type="text"
            className="search-bar"
            value={search}
            onChange={updateSearch}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        <div className="recipe">
          {recipes.map((elem) => {
            return (
              <Recipe
                key={elem.recipe.label}
                title={elem.recipe.label}
                calories={elem.recipe.calories}
                image={elem.recipe.image}
                ingredients={elem.recipe.ingredients}
              />
            );
          })}
          {/* {recipes.map((recipe) => 
          return ({
            <Recipe
             key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
             image={recipe.recipe.image}
             ingredients={recipe.recipe.ingredients} 
            />;
          })
          )}  */}
        </div>
      </div>
    </>
  );
}

export default App;
