import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto p-5 my-10 flex flex-col space-y-5 items-center bg-base-200">
      <h1 className="text-5xl font-semibold">Oops</h1>
      <h5 className="text-2xl">
        The page you were trying to visit was not found on our site.
      </h5>

      <button className="btn btn-ghost" onClick={() => navigate(-1)}>
        Go back
      </button>
    </div>
  );
};

export default NotFound;
