import { useNavigate, useRouteError } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();
  const message = error as { data?: string; message?: string };

  return (
    <div className="text-center w-full h-full bg-blue-900 absolute text-slate-50  pt-44  space-y-6">
      <h1 className="text-2xl tracking-wider capitalize">
        Something went wrong 😢
      </h1>
      <p className="text-base tracking-wider capitalize">
        {message.data || message.message}
      </p>
      <button
        onClick={() => navigate(-1)}
        className="bg-slate-50 text-xl text-slate-900 rounded-full py-[9.5px] px-3 capitalize duration-150 hover:bg-slate-200 font-semibold  cursor-pointer"
      >
        &larr; Go back
      </button>
    </div>
  );
}

export default NotFound;
