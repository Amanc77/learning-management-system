function CommonForm({ handleSubmit, buttonText }) {
  return (
    <form onSubmit={handleSubmit}>
      <button>{buttonText || "Submit"}</button>
    </form>
  );
}
