const GradientSpinner = () => {
  return (
    <div className="flex w-full items-center justify-center border-t-transparent">
      <div className="flex w-full items-center justify-center border-t-transparent">
        <div className="flex h-8 w-8 animate-spin items-center justify-center rounded-full border-t-transparent bg-gradient-to-tr from-indigo-500 to-pink-500">
          <div className="h-6 w-6 rounded-full bg-gray-900"></div>
        </div>
      </div>
    </div>
  );
};

export default GradientSpinner;
