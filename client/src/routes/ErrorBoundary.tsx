import { useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error: any= useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
      <p className="text-lg text-gray-700 mb-2">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="text-sm text-gray-500">
        {error.statusText || error.message}
      </p>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={() => window.location.reload()}
      >
        Reload Page
      </button>
    </div>
  );
}

export default ErrorBoundary;