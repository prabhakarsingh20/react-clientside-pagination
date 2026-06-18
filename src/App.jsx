import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* For API Call*/
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=100")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log("API Error", error);
        setLoading(false);
      });
  }, []);

  /*for hande pagination */
  const selectPageHander = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(filteredProducts.length / 10)
    )
      setPage(selectedPage);
  };

  const filteredProducts = products.filter(
    (prod) =>
      prod.title.toLowerCase().includes(search.toLowerCase()) ||
      prod.category.toLowerCase().includes(search.toLowerCase()),
  );

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="mainDiv">
      {/* search bar */}
      <input
        className="searchBox"
        placeholder="Search Product By Name & Category"
        value={search}
        onChange={searchHandler}
      />

      {loading ? (
        <div className="loader">Loading Products...</div>
      ) : filteredProducts.length > 0 ? (
        <div className="products">
          {filteredProducts.slice(page * 10 - 10, page * 10).map((prod) => (
            <span key={prod.id} className="products__single">
              <img src={prod.thumbnail} alt={prod.title} />
              <span>{prod.title}</span>
              <p className="category">
                Category:
                {prod.category}
              </p>
              <p className="description">{prod.description}</p>
            </span>
          ))}
        </div>
      ) : (
        <h2 className="noProduct">No Product Found</h2>
      )}

      {/* pagination Logic*/}
      {filteredProducts.length > 0 && (
        <div className="pagination">
          {/* For Previous Button*/}
          <span
            className={page > 1 ? "" : "pagination_disabled"}
            onClick={() => selectPageHander(page - 1)}
          >
            Prev
          </span>

          {/* For Page Listing 1,2,... Button*/}
          {[...Array(Math.ceil(filteredProducts.length / 10))].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectPageHander(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}

          {/* For Next Button*/}
          <span
            className={
              page < Math.ceil(filteredProducts.length / 10)
                ? ""
                : "pagination_disabled"
            }
            onClick={() => selectPageHander(page + 1)}
          >
            Next
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
