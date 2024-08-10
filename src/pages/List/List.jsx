import { useEffect, useState } from "react";
import "./List.css";
import { url } from "./../../server/server.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function List() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const edit = (food) => {
    navigate("/add", { state: { food } });
  };

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };
  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    const response = await axios.delete(`${url}/api/food/${foodId}`, {
      id: foodId,
    });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
          <b>Edit</b>
        </div>
        {list.length === 0 ? (
          <p>No items to display</p>
        ) : (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className="cursor">
                X
              </p>
              <p onClick={() => edit(item)} className="pen">
                🖊
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default List;
