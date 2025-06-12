const Loading = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-purple-800 to-blue-800">
      <h2 className="text-6xl font-bold mb-8 animate-fade-in-scale text-[#caf0f8] duration-400">Elegant</h2>
      <div className="loader2 w-12 h-12"></div>
    </div>
  );
};

export default Loading;
