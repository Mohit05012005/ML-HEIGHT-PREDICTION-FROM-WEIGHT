import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPrediction(null);

    try {
      if(!input){
        return setError("Input field cannot be empty");
      }
      const inputArray = input.split(",").map((val) => parseFloat(val.trim()));
      const response = await axios.post(
        "https://ml-flask-api-sv9o.onrender.com/predict",
        { input: inputArray }
      );
      setPrediction(response.data.prediction[0]);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800 drop-shadow-lg">
        ML Height Prediction App from Weight
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-3/4 lg:w-1/2 bg-white rounded-xl shadow-xl p-8 flex flex-col gap-5"
      >
        <label className="text-gray-700 font-medium">
          Enter your weight in kgs:
        </label>
        <input
          type="text"
          placeholder="Enter the height"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-gray-600 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Predict
        </button>
      </form>

      {prediction !== null && (
        <p className="mt-6 text-xl text-green-700 font-bold animate-pulse">
          Prediction: {Math.round(prediction)} cms
        </p>
      )}

      {error && (
        <p className="mt-6 text-red-600 font-semibold">{error}</p>
      )}
    </div>
  );
}

export default App;


