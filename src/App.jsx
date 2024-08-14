import React, { useState, useEffect } from "react";
import Card from "../src/components/card";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [brandFilter, setBrandFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("a-z");

  useEffect(() => {
    fetch("http://localhost:3000/0")
      .then((resp) => resp.json())
      .then((data) => {
        setProducts(data.All);
        setFilteredProducts(data.All);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let filtered = products;

    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (brandFilter !== "All") {
      filtered = filtered.filter((product) => product.brand === brandFilter);
    }

    if (sortOrder === "a-z") {
      filtered.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (sortOrder === "z-a") {
      filtered.sort((a, b) => (a.name < b.name ? 1 : -1));
    } else if (sortOrder === "high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "low") {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(filtered);
  }, [categoryFilter, brandFilter, sortOrder, products]);

  return (
    <>
      <div className="container">
        <div className="pageFilter">
          <div className="form">
            <div className="formInput">
              <label>Search product</label>
              <input type="text" />
            </div>

            <div className="formInput">
              <label>Select category</label>
              <select onChange={(e) => setCategoryFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Tables">Tables</option>
                <option value="Chairs">Chairs</option>
                <option value="Kids">Kids</option>
                <option value="Sofas">Sofas</option>
                <option value="Beds">Beds</option>
              </select>
            </div>

            <div className="formInput">
              <label>Select brand</label>
              <select onChange={(e) => setBrandFilter(e.target.value)}>
                <option value="All">All</option>
                <option value="Modenza">Modenza</option>
                <option value="Luxora">Luxora</option>
                <option value="Kids">Kids</option>
                <option value="Artifex">Artifex</option>
                <option value="Comfora">Comfora</option>
                <option value="Homestead">Homestead</option>
              </select>
            </div>

            <div className="formInput">
              <label>Sort by</label>
              <select onChange={(e) => setSortOrder(e.target.value)}>
                <option value="a-z">a-z</option>
                <option value="z-a">z-a</option>
                <option value="high">high</option>
                <option value="low">low</option>
              </select>
            </div>
          </div>

          <div className="form">
            <div className="formInput">
              <label>
                Select Price <span className="spanone">$520.00</span>
              </label>
              <input type="range" />
              <label>
                0 <span className="spantwo">Max $1,000.00</span>
              </label>
            </div>

            <div className="formInput">
              <label className="free">Free shipping</label>
              <input type="checkbox" />
            </div>

            <div className="formInput">
              <button className="search">Search</button>
            </div>

            <div className="formInput">
              <button className="reset">Reset</button>
            </div>
          </div>
        </div>

        <div className="card">
          {filteredProducts.map((product, index) => (
            <Card key={index} data={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
