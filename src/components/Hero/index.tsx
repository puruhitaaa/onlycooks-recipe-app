const Hero = () => {
  return (
    <div className="hero h-screen md:h-[40vh] bg-gradient-to-t from-base-200 to-base-500">
      <div className="p-4 justify-between items-center flex flex-col space-y-10 w-full max-w-5xl md:space-y-0 md:flex-row-reverse">
        <img
          alt="random-pic"
          src="https://api.lorem.space/image/face?w=150&h=150"
          className="w-40 rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold">Delicious American Burger!</h1>
          <p className="py-6">
            Discover how Alex Sandra made the most delicious meal of this
            century.
          </p>
          <button className="btn btn-primary">Cook</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
