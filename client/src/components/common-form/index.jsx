function CommonForm({
  handleSubmit,
  buttonText,
  formControls = [],
  formData,
  setFormData,
}) {
  return (
    <form onSubmit={handleSubmit}>
      {/* Form Controls */}
      <FormControls
        formControls={formControls}
        formData={formData}
        setFormData={setFormData}
      />

      {/* Additional Form Elements */}
      <div className="flex flex-col gap-3">
        {formControls.length > 0
          ? renderComponentByType()
          : "No controls to submit"}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-4">
        <button type="submit" className="btn btn-primary">
          {buttonText || "Submit"}
        </button>
      </div>
    </form>
  );
}
 