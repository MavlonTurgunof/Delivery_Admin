import { useState, useEffect } from "react";
import { assets } from "../../admin_assets/assets";
import "./Add.css";
import axios from "axios";
import { url } from "./../../server/server.js";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function Add() {
  // const [image, setImage] = useState(false);
  // const [data, setData] = useState({
  //   name: "",
  //   description: "",
  //   price: "",
  //   category: "Salad",
  // });

  // const onChangeHandler = (event) => {
  //   const name = event.target.name;
  //   const value = event.target.value;
  //   setData((data) => ({ ...data, [name]: value }));
  // };

  // const onSubmitHandler = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData();
  //   formData.append("name", data.name);
  //   formData.append("description", data.description);
  //   formData.append("price", Number(data.price));
  //   formData.append("category", data.category);
  //   formData.append("image", image);
  //   const response = await axios.post(`${url}/api/food/add`, formData);
  //   if (response.data.success) {
  //     setData({
  //       name: "",
  //       description: "",
  //       price: "",
  //       category: "Salad",
  //     });
  //     setImage(false);
  //     toast.success(response.data.message);
  //   } else {
  //     throw new Error("Adding fail");
  //   }
  // };

  const location = useLocation();
  const navigate = useNavigate();
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  useEffect(() => {
    if (location.state && location.state.food) {
      setData({
        name: location.state.food.name,
        description: location.state.food.description,
        price: location.state.food.price,
        category: location.state.food.category,
      });
      setImage(location.state.food.image);
    }
  }, [location.state]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      let response;
      if (location.state && location.state.food) {
        response = await axios.put(
          `${url}/api/food/${location.state.food._id}`,
          formData
        );
      } else {
        response = await axios.post(`${url}/api/food/add`, formData);
      }

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(false);
        toast.success(response.data.message);
        navigate("/list");
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      toast.error("Error submitting form");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={
                image
                  ? typeof image === "string"
                    ? `${url}/images/${image}`
                    : URL.createObjectURL(image)
                  : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwiches">Sandwiches</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodeles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="0$"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          {location.state && location.state.food ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}

export default Add;
