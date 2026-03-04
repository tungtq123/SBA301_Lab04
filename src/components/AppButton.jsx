function AppButton({ children, type = 'button', ...props }) {
  return (
    <button type={type} {...props} className="btn btn-dark">
      {children}
    </button>
  );
}

export default AppButton;
