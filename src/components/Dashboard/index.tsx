import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { ActivityLog, MealLog, PersonalInfo } from "../../shared/types";
import { getPersonalInfo } from "../../shared/db/personalInfo";
import { getActivityLogs } from "../../shared/db/activity";
import { getMealLogs } from "../../shared/db/meals";
import { TableRow, getTableRows, getTotalCalories } from "./summary";
import { clearDatabase } from "../../shared/db";

const Dashboard: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>();
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [mealLogs, setMealLogs] = useState<MealLog[]>([]);
  const [tableRows, setTableRows] = useState<TableRow[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      const personalInfo = await getPersonalInfo();
      setPersonalInfo(personalInfo);

      const activityLogs = await getActivityLogs();
      setActivityLogs(activityLogs);

      const mealLogs = await getMealLogs();
      setMealLogs(mealLogs);
    };

    fetchAllData().then(() => {
      // console.table(personalInfo);
      // console.table(activityLogs);
      // console.table(mealLogs);
    });
  }, []);

  const handleClearDatabase = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await clearDatabase();
    window.location.reload();
  };

  useEffect(() => {
    if (!mealLogs || !activityLogs) return;
    const tableRows: TableRow[] = getTableRows(mealLogs, activityLogs);
    setTableRows(tableRows);
  }, [mealLogs, activityLogs]);

   // ← Compute derived values here, before return:
  const caloriesConsumed = tableRows
    .filter(r => r.entryType === 'meal')
    .reduce((sum, r) => sum + r.calories, 0);

  const caloriesBurned = tableRows
    .filter(r => r.entryType === 'activity')
    .reduce((sum, r) => sum + r.calories, 0);

  const netCalories = caloriesConsumed - caloriesBurned;

  const totalCalories = getTotalCalories(tableRows);

  if (!mealLogs || !activityLogs || !personalInfo) {
    return (
      <Layout>
        <div data-testid="home">Please go to "My Info" and fill it in to start.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4">
        <div className="text-3xl font-bold mb-6 text-center">Dashboard</div>

        <div className="bg-white shadow-md rounded-xl overflow-hidden mb-6 border border-gray-200">
          <table className="w-full table-auto">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">Log</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Time</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Calories</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="px-6 py-3 text-sm">
                    {row.entryType === "activity" ? "Did" : "Consumed"}{" "}
                    {row.name.toLowerCase()}
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">
                    {row.date.toLocaleString()}
                  </td>
                  <td
                    className={`px-6 py-3 text-sm font-medium ${
                      row.entryType === "activity"
                        ? "text-red-500"
                        : "text-green-600"
                    }`}
                  >
                    {row.entryType === "activity" ? "-" : "+"} {row.calories}
                  </td>
                </tr>
              ))}

<tr className="border-t">
  <td className="px-6 py-3 font-semibold">Net Calories Consumed</td>
  <td className="px-6 py-3"></td> {/* Empty cell for Time */}
  <td className="px-6 py-3 text-green-600 font-semibold">{totalCalories}</td>
</tr>
<tr>
  <td className="px-6 py-3 font-semibold">Daily Calories Required</td>
  <td className="px-6 py-3"></td>
  <td className="px-6 py-3 text-indigo-700 font-semibold">
    {personalInfo?.dailyCalorieRequirement}
  </td>
</tr>
<tr>
  <td className="px-6 py-3 font-semibold">Balance</td>
  <td className="px-6 py-3"></td>
  <td className="px-6 py-3 font-semibold">
    {(personalInfo?.dailyCalorieRequirement as number) - totalCalories}
  </td>
</tr>

            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleClearDatabase}
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition disabled:opacity-50"
          >
            Clear Dashboard
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
