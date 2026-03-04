const PaginationInfo = ({ from = 0, to = 0, total = 0 }) => {
  return (
    <div
      style={{
        marginTop: "10px",
        padding: "8px",
        border: "1px solid #999"
      }}
    >
      Hiển thị từ {from} đến {to} trên {total} nhân viên
      {" "} (Show from {from} to {to} of {total} employees)
    </div>
  );
};

export default PaginationInfo;
