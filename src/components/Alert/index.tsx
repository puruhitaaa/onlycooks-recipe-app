import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface Props {
  type?: string;
  msg?: string;
}

const Alert = ({
  type = 'error',
  msg = 'There has been some problem.',
}: Props) => {
  const navigate = useNavigate();
  const logout = useAuth((state) => state.logout);

  const relogHandler = () => {
    logout();

    setTimeout(() => navigate('/login'), 1500);
  };

  if (msg === 'Invalid/expired token!') {
    return (
      <div
        className="p-2 bg-red-700 fixed right-0 bottom-0 items-center text-indigo-100 leading-none flex lg:inline-flex"
        role="alert"
      >
        <span className="flex rounded-full bg-base-content text-base-100 uppercase px-2 py-1 text-xs font-bold mr-3">
          {type}
        </span>
        <div className="flex flex-col space-y-2.5">
          <span className="font-semibold mr-2 text-left text-sm flex-auto">
            {msg}
          </span>
          <button className="btn btn-sm max-w-[100px]" onClick={relogHandler}>
            Re-login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-2 fixed right-0 bottom-0 items-center text-indigo-100 leading-none flex lg:inline-flex ${
        type === 'error' ? 'bg-red-700' : 'bg-green-700'
      }`}
      role="alert"
    >
      <span className="flex rounded-full bg-base-content text-base-100 uppercase px-2 py-1 text-xs font-bold mr-3">
        {type}
      </span>
      <span className="font-semibold mr-2 text-left flex-auto">{msg}</span>
    </div>
  );
};

export default Alert;
