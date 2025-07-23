import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Skeleton } from "../components/loader";
import { useProductDetailsQuery } from "../redux/api/productAPI";
import { server } from "../redux/store";

const Productinfo = () => {
  const params = useParams();

  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);

  const { price, photo, name, stock, category } = data?.product || {
    photo: "",
    category: "",
    name: "",
    stock: 0,
    price: 0,
  };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
    }
  }, [data]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="product-info-container">
      <main className="product-info">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section className="product-image">
              <img src={`${server}/${photo}`} alt="Product" />
            </section>
            <section className="product-details">
              <h1>{name}</h1>
              <p>
                <strong>ID - {data?.product._id}</strong>
              </p>
              <p>
                {stock > 0 ? (
                  <span className="green">{stock} Available</span>
                ) : (
                  <span className="red">Not Available</span>
                )}
              </p>
              <h3>₹{price}</h3>
            </section>
            <section className="product-specs">
              <h2>Product Specifications</h2>
              <ul>
                <li>
                  <label>Name:</label>
                  <span>{nameUpdate}</span>
                </li>
                <li>
                  <label>Price:</label>
                  <span>{priceUpdate}</span>
                </li>
                <li>
                  <label>Stock:</label>
                  <span>{stockUpdate}</span>
                </li>
                <li>
                  <label>Category:</label>
                  <span>{categoryUpdate}</span>
                </li>
              </ul>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Productinfo;
