import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";

export default function CustomerDetail() {
  const navigate = useNavigate();

  const [food, setFood] = useState({});
  const { id } = useParams();

  async function fetchFood() {
    await axiosClient.get(`v1/customers/${id}`).then(res => setFood(res.data));
  }

  useEffect(() => {
    fetchFood();
  }, [])

  return (
    <div>
      <h3>Thông Tin Chi Tiết</h3>
      
      <p>Tên: {food.name}</p>
      <p>Email: {food.email}</p>
      <p>Địa chỉ: {food.address}</p>
      <p>Điện thoại: {food.mobileNo}</p>
      <p>Doanh thu (VND): {food.revenue}</p>

      <button onClick={() => navigate(-1)}>Quay Lại</button>
    </div>
  );
}
