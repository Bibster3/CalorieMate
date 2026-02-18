import React, { useEffect, useState } from "react";
import { getPersonalInfo, savePersonalInfo } from "../../shared/db/personalInfo";
import { calorieCalculator, printActivityLevel } from "../../shared/functions";
import { ActivityLevel, Gender, PersonalInfo } from "../../shared/types";
import Layout from "../Layout";

const PersonalInfoForm: React.FC = () => {
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<Gender>("female");
  const [activityLevel, setActivityLevel] =
    useState<keyof typeof ActivityLevel>("lightExercise");
  const [dailyCalorieRequirement, setDailyCalorieRequirement] =
    useState<number>();

  useEffect(() => {
    getPersonalInfo().then((personal) => {
      if (!personal) {
        return;
      }

      setHeight(personal.heightCm);
      setWeight(personal.weightKg);
      setAge(personal.age);
      setGender(personal.gender);
      setActivityLevel(personal.activityLevel);
      setDailyCalorieRequirement(personal.dailyCalorieRequirement);
    });
  }, []);

  const saveHandler = async () => {
    const requirement = calorieCalculator({
      heightCm: height,
      weightKg: weight,
      age,
      gender,
      activityLevel,
    });

    setDailyCalorieRequirement(requirement);

    const personalInfo: PersonalInfo = {
      heightCm: height,
      weightKg: weight,
      age,
      gender,
      activityLevel,
      dailyCalorieRequirement: requirement,
    };

    await savePersonalInfo(personalInfo);
    window.dispatchEvent(new Event("personalInfoUpdated"));
  };

  const canSave = height > 0 && weight > 0 && age > 0;

  return (
    <Layout>
      <div
        id="personal-info-form"
        className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12"
      >
        <div className="mb-4 text-center text-4xl font-bold">
          Ideal Body Weight Calculator
        </div>

        <p className="mb-12 max-w-2xl text-center text-gray-500">
          By inputting some basic information into this ideal body weight calculator,
          you’ll be able to see your ideal body weight recommendation, and use that to
          move forward with your goals!
        </p>

        <div className="mb-10 grid w-full max-w-6xl grid-cols-1 gap-6 overflow-x-auto md:grid-cols-5">
          <div className="flex min-w-[200px] flex-col items-center rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
              1
            </div>
            <p className="mb-4 text-center font-semibold">What is your sex?</p>
            <div className="flex gap-4">
              <button
                onClick={() => setGender("male")}
                className={`rounded-lg border px-4 py-2 ${
                  gender === "male" ? "border-blue-400 bg-blue-100" : "bg-white"
                }`}
              >
                👨 Male
              </button>
              <button
                onClick={() => setGender("female")}
                className={`rounded-lg border px-4 py-2 ${
                  gender === "female" ? "border-blue-400 bg-blue-100" : "bg-white"
                }`}
              >
                👩 Female
              </button>
            </div>
          </div>

          <div className="flex min-w-[200px] flex-col items-center rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
              2
            </div>
            <p className="mb-4 text-center font-semibold">How old are you?</p>
            <input
              type="number"
              value={age}
              onChange={(event) => setAge(Number(event.target.value))}
              className="w-24 rounded border px-3 py-2 text-center"
            />
            <span className="mt-2 text-sm text-gray-500">Years</span>
          </div>

          <div className="flex min-w-[200px] flex-col items-center rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
              3
            </div>
            <p className="mb-4 text-center font-semibold">How tall are you?</p>
            <input
              type="number"
              value={height}
              onChange={(event) => setHeight(Number(event.target.value))}
              className="w-24 rounded border px-3 py-2 text-center"
            />
            <span className="mt-2 text-sm text-gray-500">cm</span>
          </div>

          <div className="flex min-w-[200px] flex-col items-center rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
              4
            </div>
            <p className="mb-4 text-center font-semibold">Activity level?</p>
            <select
              value={activityLevel}
              onChange={(event) =>
                setActivityLevel(event.target.value as keyof typeof ActivityLevel)
              }
              className="w-48 rounded border px-3 py-2 text-center"
            >
              {Object.keys(ActivityLevel).map((level) => (
                <option key={level} value={level}>
                  {printActivityLevel(level as keyof typeof ActivityLevel)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex min-w-[200px] flex-col items-center rounded-xl bg-white p-6 shadow-lg">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
              5
            </div>
            <p className="mb-4 text-center font-semibold">What is your weight?</p>
            <input
              type="number"
              value={weight}
              onChange={(event) => setWeight(Number(event.target.value))}
              className="w-24 rounded border px-3 py-2 text-center"
            />
            <span className="mt-2 text-sm text-gray-500">kg</span>
          </div>
        </div>

        <button
          onClick={saveHandler}
          disabled={!canSave}
          className="rounded-lg bg-blue-500 px-8 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          Calculate your ideal weight
        </button>

        {dailyCalorieRequirement && (
          <div className="mt-6 rounded-lg bg-yellow-50 px-6 py-4 text-center font-medium text-gray-800 shadow">
            Your daily calorie requirement is {dailyCalorieRequirement}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PersonalInfoForm;
