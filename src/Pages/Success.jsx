import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600">
        Order Placed Successfully 🎉
      </h1>
      <p className="mt-4 text-gray-600">
        Thank you for shopping with us.
      </p>

      <Link
        to="/"
        className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default Success;
