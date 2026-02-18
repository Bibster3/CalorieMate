import {
  calorieCalculator,
  estimatedCalorieBurnCalculator,
  getActivity,
  printActivityLevel,
} from "./functions";

const assertEqual = <T>(actual: T, expected: T, label: string) => {
  if (actual !== expected) {
    throw new Error(`${label} failed: expected ${String(expected)}, got ${String(actual)}`);
  }
};

const run = () => {
  const maleCalories = calorieCalculator({
    heightCm: 180,
    weightKg: 75,
    age: 30,
    gender: "male",
    activityLevel: "moderateExercise",
  });
  assertEqual(maleCalories, 2682, "male calorieCalculator");

  const femaleCalories = calorieCalculator({
    heightCm: 165,
    weightKg: 60,
    age: 28,
    gender: "female",
    activityLevel: "lightExercise",
  });
  assertEqual(femaleCalories, 1829, "female calorieCalculator");

  assertEqual(printActivityLevel("sedentary"), "Sedentary", "printActivityLevel sedentary");
  assertEqual(printActivityLevel("lightExercise"), "Light Exercise", "printActivityLevel light");
  assertEqual(
    printActivityLevel("moderateExercise"),
    "Moderate Exercise",
    "printActivityLevel moderate"
  );
  assertEqual(printActivityLevel("heavyExercise"), "Heavy Exercise", "printActivityLevel heavy");
  assertEqual(printActivityLevel("superHeavyExercise"), "Athlete", "printActivityLevel athlete");

  assertEqual(getActivity("Running"), "running", "getActivity running");
  assertEqual(getActivity("Swimming"), "swimming", "getActivity swimming");
  assertEqual(getActivity("Walking"), "walking", "getActivity walking");
  assertEqual(getActivity("Cycling"), undefined, "getActivity unknown");

  assertEqual(estimatedCalorieBurnCalculator("running", 70, 30), 199.5, "burn running");
  assertEqual(estimatedCalorieBurnCalculator("swimming", 70, 30), 138.6, "burn swimming");
  assertEqual(
    estimatedCalorieBurnCalculator("walking", 70, 30),
    75.6,
    "burn walking"
  );

  console.log("All function tests passed.");
};

run();
