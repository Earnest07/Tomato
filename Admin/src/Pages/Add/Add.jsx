import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "Salad",
  });

  const onChangeHandle = async (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    // const url = "http://localhost:4000";
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: 0,
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p className="lable">
            Upload Image{" "}
            <i
              style={{ paddingLeft: "20px", color: "black" }}
              className="fa-solid fa-upload"
            ></i>
          </p>

          <lable htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </lable>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            //   hidden
            required
          />
        </div>

        <div className="name-desc">
          <div className="add-product-name flex-col">
            <p className="lable">
              Product name{" "}
              <i
                style={{ paddingLeft: "20px", color: "black" }}
                className="fa-solid fa-user"
              ></i>
            </p>
            <input
              onChange={onChangeHandle}
              value={data.name}
              type="text"
              name="name"
              placeholder="Type here"
            />
          </div>

          <div className="add-product-description flex-col">
            <p className="lable">
              Product Description{" "}
              <i
                style={{ paddingLeft: "20px", color: "black" }}
                className="fa-solid fa-comment"
              ></i>
            </p>
            <textarea
              onChange={onChangeHandle}
              value={data.description}
              name="description"
              rows={6}
              placeholder="Write content here"
              required
            ></textarea>
          </div>
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p className="lable">Product Category</p>
            <select name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desert">Desert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="add-price flex-col">
            <p className="lable">Product Price</p>
            <input
              onChange={onChangeHandle}
              value={data.price}
              type="Number"
              name="price"
              placeholder={`${data.price ? "" : "$20"}`}
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default Add;
