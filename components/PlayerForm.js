import { useState } from "react";
import { motion } from "framer-motion";

export default function PlayerForm() {
  const [playerData, setPlayerData] = useState({
    minutes: "",
    goals_scored: "",
    assists: "",
    clean_sheets: "",
    yellow_cards: "",
    red_cards: "",
    bonus: "",
    saves: "",
    price: "",
    element_type: 1,
  });

  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerData({ ...playerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const numericPlayerData = Object.keys(playerData).reduce((acc, key) => {
      acc[key] = key === 'element_type' ? Number(playerData[key]) : 
                 playerData[key] === '' ? 0 : Number(playerData[key]);
      return acc;
    }, {});

    try {
      const res = await fetch("/api/predict_rating", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(numericPlayerData),
      });
      const result = await res.json();
      setResponse(result.predicted_rating || result.error);
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    { key: "minutes", label: "Minutes Played" },
    { key: "goals_scored", label: "Goals Scored" },
    { key: "assists", label: "Assists" },
    { key: "clean_sheets", label: "Clean Sheets" },
    { key: "yellow_cards", label: "Yellow Cards" },
    { key: "red_cards", label: "Red Cards" },
    { key: "bonus", label: "Bonus Points" },
    { key: "saves", label: "Saves" },
    { key: "price", label: "Price" },
  ];

  return (
    <motion.div
      className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-8 sm:p-12">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map(({ key, label }) => (
              <motion.div
                key={key}
                className="flex flex-col space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="text-sm font-medium text-gray-700">
                  {label}
                </label>
                <input
                  type="number"
                  name={key}
                  value={playerData[key]}
                  onChange={handleChange}
                  className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  min="0"
                  step={key === "price" ? "0.1" : "1"}
                />
              </motion.div>
            ))}

            <motion.div
              className="flex flex-col space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label className="text-sm font-medium text-gray-700">
                Player Position
              </label>
              <select
                name="element_type"
                value={playerData.element_type}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value={1}>Goalkeeper</option>
                <option value={2}>Defender</option>
                <option value={3}>Midfielder</option>
                <option value={4}>Forward</option>
              </select>
            </motion.div>
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 px-6 bg-green-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? "Calculating..." : "Predict Rating"}
          </motion.button>
        </form>

        {response && (
          <motion.div
            className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-green-800 text-center">
              Predicted Rating
            </h3>
            <p className="mt-2 text-3xl font-bold text-green-600 text-center">
              {response.toFixed(2)}
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}