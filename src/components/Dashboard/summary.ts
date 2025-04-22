import { ActivityLog, MealLog } from "../../shared/types";

 export type TableRow = {
  name: string;
  calories: number;
  entryType: "meal" | "activity";
  date: Date;
}; 

export const mealLogsToTableRows = (mealLogs: MealLog[]): TableRow[] => {
  return mealLogs.map((mealLog) => ({
    name: mealLog.meal,
    calories: mealLog.calories,
    entryType: "meal",
    date: mealLog.date,
  }));
};

export const activityLogsToTableRows = (activityLogs: ActivityLog[]): TableRow[] => {
  const activityRows = activityLogs.map((activityLog) => ({
    name: activityLog.activity,
    calories: activityLog.calories,
    entryType: "activity" as const,
    date: activityLog.date,
  }));

  return activityRows;
};

/* "activity" is a string literal.

TypeScript widens it to string by default in object literals.

"activity" as const forces it to be treated as the exact string literal "activity" — making it compatible with TableRow. */

export const getTableRows = (
  mealLogs: MealLog[],
  activityLogs: ActivityLog[]
): TableRow[] => {
  const mealRows = mealLogsToTableRows(mealLogs);
  const activityRows = activityLogsToTableRows(activityLogs);

  console.log("meal rows length: ", mealRows.length);
  console.log("activity rows length: ", activityRows.length);

  // Task 5.2
  return [...mealRows, ...activityRows].sort(
  (a, b) => b.date.getTime() - a.date.getTime()
);
};

/* [...] merges the two arrays.

.sort() arranges by date in descending order (most recent first).

getTime() converts the Date to a numeric timestamp for easy comparison. */

export const getTotalCalories = (tableRows: TableRow[]) => {
  console.log("table rows length: ", tableRows.length);

return tableRows.reduce((total, row) => {
  return row.entryType === "activity"
    ? total - row.calories
    : total + row.calories;
}, 0);
};
/*.reduce() loops through all the TableRow entries.

If it's an activity, subtract the calories.

If it's a meal, add the calories.

It returns the net calories. */ 
