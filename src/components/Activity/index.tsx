import React, { useEffect, useState } from "react";
import { getActivityLogs, saveActivityLog } from "../../shared/db/activity";
import { getPersonalInfo } from "../../shared/db/personalInfo";
import {
  getActivity, estimatedCalorieBurnCalculator 
} from "../../shared/functions";
import { ActivityLog, ActivityType, PersonalInfo } from "../../shared/types";
import Layout from "../Layout";
import { Play, Square } from "lucide-react"


const Activity: React.FC = () => {
  const [activityType, setActivityType] = useState("Running");
  const [time, setTime] = useState<number | undefined>(undefined);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const [timer, setTimer] = useState<number | undefined>(undefined);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  useEffect(() => {
    getActivityLogs().then((activities) => {
      if (activities.length > 0) {
        setActivityLogs(activities);
      }
    });
  }, []);

  const handleActivityTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setActivityType(event.target.value);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(Number(event.target.value));
  };

  const handleStartTimer = () => {
    let seconds = 0;
    
    const intervalId = setInterval(() => {
      seconds++;
      setSecondsElapsed(seconds);
    }, 1000);
    setTimer(intervalId as unknown as number);
    // console.log(intervalId, "is set");
  };

  const handleStopTimer = () => {
    setTime(secondsElapsed ? secondsElapsed / 60 : undefined);
    setTimer(undefined);
    // console.log(timer, "is cleared");
    clearInterval(timer as number);
  };

  const resetForm = () => {
    setTime(0);
    setSecondsElapsed(0);
    setActivityType("Running");
    setTimer(undefined);
  };

  const handleCancel = () => {
    resetForm();
  };

  const isSaveDisabled = () => {
    return !time || time === 0;
  }

  const handleSave = async () => {
    const activity = getActivity(activityType) as ActivityType;
    const personalInfo = await getPersonalInfo();
    if (!personalInfo) {
      alert("Please fill out your personal info before saving activity.");
      return;
    }
    console.log(personalInfo);
    
  const activityTimeInMin = time !== undefined ? time : 0;

    const estimatedCaloriesBurned = estimatedCalorieBurnCalculator(activity, personalInfo.weightKg, activityTimeInMin);

    await saveActivityLog({
      activity,
      date: new Date(),
      calories: estimatedCaloriesBurned,
    });
    resetForm();

      // Fetch updated activity logs and update state

    getActivityLogs().then((activities) => {
    setActivityLogs(activities);
  });
    
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {activityLogs.length > 0 && (
          <DisplayActivityLogs activityLogs={activityLogs} />
        )}

        <div className="bg-white shadow-md p-8 rounded-xl border border-gray-200" data-testid="activity">
          <h1 className="text-2xl font-bold mb-6">Add Activity</h1>
          <form className="space-y-6">
            <div>
              <label htmlFor="activityType" className="block font-semibold mb-1">
                Activity Type
              </label>
              <select
                id="activityType"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={activityType}
                onChange={handleActivityTypeChange}
              >
                <option value="Running">Running</option>
                <option value="Swimming">Swimming</option>
                <option value="Walking">Walking</option>
              </select>
            </div>

            <div>
              <label htmlFor="time" className="block font-semibold mb-1">
                Time (min)
              </label>
              <input
                type="number"
                id="time"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={time}
                onChange={handleTimeChange}
                data-testid="activity-time-min"
              />
            </div>

            <div>
  <label htmlFor="timer" className="block font-semibold mb-1">
    Timer
  </label>
  <div className="flex items-center space-x-3">
    {timer ? (
      <button
        type="button"
        onClick={handleStopTimer}
        className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        <Square size={16} />
        <span>Stop</span>
      </button>
    ) : (
      <button
        type="button"
        onClick={handleStartTimer}
        className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        <Play size={16} />
        <span>Start Timer</span>
      </button>
    )}
    <div className="text-sm font-medium text-gray-600">
  Elapsed Time: {Math.floor(secondsElapsed / 60)} min {secondsElapsed % 60} sec
</div>
  </div>
</div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSaveDisabled()}
                className={`${
                  isSaveDisabled()
                    ? "bg-blue-200 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white font-semibold py-2 px-4 rounded`}
                onClick={handleSave}
                data-testid="save-activity"
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

const DisplayActivityLogs = ({ activityLogs }: { activityLogs: ActivityLog[] }) => {
  return (
    <div className="bg-yellow-50 shadow-md border border-yellow-200 p-8 rounded-xl" data-testid="activity-log-table">
      <div className="text-2xl font-bold mb-4">Activity Logs</div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-yellow-100">
            <tr>
              <th className="text-left px-4 py-2 border-b border-yellow-300">Activity</th>
              <th className="text-left px-4 py-2 border-b border-yellow-300">Calories</th>
              <th className="text-left px-4 py-2 border-b border-yellow-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {activityLogs.map((log, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-yellow-50"}>
                <td className="px-4 py-2 border-b border-yellow-200">{log.activity}</td>
                <td className="px-4 py-2 border-b border-yellow-200 text-red-600">{log.calories}</td>
                <td className="px-4 py-2 border-b border-yellow-200 text-gray-600">{log.date.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Activity;