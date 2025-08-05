function FormControls({ formControls = [], formData, setFormData }) {
  function renderComponentByType() {
    return formControls.map((control, index) => {
      const { type, ...props } = control;
      const Component = type;

      if (typeof Component !== "function") {
        console.error(`Invalid component type: ${type}`);
        return null;
      }

      return (
        <Component
          key={index}
          {...props}
          formData={formData}
          setFormData={setFormData}
        />
      );
    });

    if (formControls.length === 0) {
      return <div className="text-gray-500">No form controls available</div>;
    }
  }
  return <div className=" flex flex-col gap-3">{formControls.map()}</div>;
}
