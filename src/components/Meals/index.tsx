import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import { getMealLogs, saveMealLog } from "../../shared/db/meals";
import { MealLog } from "../../shared/types";

const Meals: React.FC = () => {
  const [mealName, setMealName] = useState("");
  const [calories, setCalories] = useState("");
  const [isSaveEnabled, setIsSaveEnabled] = useState(false);
  const [mealLogs, setMealLogs] = useState<MealLog[]>([]);

  useEffect(() => {
 // Load meal logs from the database on component mount
    getMealLogs().then((meals) => {
      if (meals.length > 0) {
        setMealLogs(meals);
      }
    });  }, []);

  const handleMealNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMealName(event.target.value);
    setIsSaveEnabled(event.target.value !== "" && calories !== "");
  };

  const handleCaloriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCalories(event.target.value);
    setIsSaveEnabled(mealName !== "" && event.target.value !== "");
  };

  const handleSave = async () => {
    await saveMealLog({
      meal: mealName,
      calories: Number(calories),
      date: new Date(),
    });
    await getMealLogs().then((meals) => {
      setMealLogs(meals);
    });

    resetForm();
  };

  const resetForm = () => {
    setMealName("");
    setCalories("");
    setIsSaveEnabled(false);
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {mealLogs.length > 0 && <DisplayMealLogs mealLogs={mealLogs} />}

        <div
          className="bg-white shadow-md rounded-xl border border-gray-200 p-8"
          data-testid="meals"
        >
          <h1 className="text-2xl font-bold mb-6">Add Meal</h1>
          <form className="space-y-6">
            <div>
              <label htmlFor="mealName" className="block font-semibold mb-1">
                Meal Name
              </label>
              <input
                type="text"
                id="mealName"
                value={mealName}
                onChange={handleMealNameChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                data-testid="meal-name"
              />
            </div>

            <div>
              <label htmlFor="calories" className="block font-semibold mb-1">
                Calories
              </label>
              <input
                type="number"
                id="calories"
                value={calories}
                onChange={handleCaloriesChange}
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                data-testid="calories"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!isSaveEnabled}
                className={`${
                  !isSaveEnabled
                    ? "bg-blue-200 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white font-semibold py-2 px-4 rounded`}
                data-testid="save-meal"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

const DisplayMealLogs = ({ mealLogs }: { mealLogs: MealLog[] }) => {
  return (
    <div className="bg-yellow-50 p-14 rounded-md" data-testid="meal-logs-table">
      <div className="text-2xl font-bold mb-4">Meal Logs</div>
      <div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="text-left border-b border-gray-300 py-2 px-4">
                Meal
              </th>
              <th className="text-left border-b border-gray-300 py-2 px-4">
                Calories
              </th>
              <th className="text-left border-b border-gray-300 py-2 px-4">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {mealLogs.map((mealLog, idx) => (
              <tr key={idx}>
                <td className="border-b border-gray-300 py-2 px-4">
                  {mealLog.meal}
                </td>
                <td className="border-b border-gray-300 py-2 px-4">
                  {mealLog.calories}
                </td>
                <td className="border-b border-gray-300 py-2 px-4">
                  {mealLog.date.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Meals;
