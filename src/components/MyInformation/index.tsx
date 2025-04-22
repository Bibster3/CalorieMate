import React, { useEffect, useState, forwardRef } from "react";
import {
  getPersonalInfo, savePersonalInfo
} from "../../shared/db/personalInfo";
import { calorieCalculator, printActivityLevel } from "../../shared/functions";
import { ActivityLevel, Gender, PersonalInfo } from "../../shared/types";
import Layout from "../Layout";



const PersonalInfoForm = forwardRef<HTMLDivElement>((props, ref) => {
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [age, setAge] = useState<number>(0);
  const [gender, setGender] = useState<Gender>("female");
  const [activityLevel, setActivityLevel] =
    useState<keyof typeof ActivityLevel>("lightExercise");
  const [dailyCalorieRequirement, setDailyCalorieRequirement] = useState<
    number | undefined
  >();
  

  useEffect(() => {
    getPersonalInfo().then((personal) => {
      if (personal) {
        setHeight(personal.heightCm);
        setWeight(personal.weightKg);
        setAge(personal.age);
        setGender(personal.gender);
        setDailyCalorieRequirement(personal.dailyCalorieRequirement);
      } else {
        // console.log("No PersonalInfo found");
      }
    });
  }, []);

  const heightHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(event.target.value));
  };

  const weightHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(event.target.value));
  };

  const ageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(event.target.value));
  };

  const genderHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value as Gender);
  };

  const activityLevelHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setActivityLevel(event.target.value as keyof typeof ActivityLevel);
  };

  const cancelHandler = () => {
      setHeight(0);
  setWeight(0);
  setAge(0);
  setGender("female");
  setActivityLevel("lightExercise"); // Optional: reset to default
  setDailyCalorieRequirement(undefined);
  };

  const saveHandler = async () => {
    const dailyCalorieRequirement = calorieCalculator({
      heightCm: height,
      weightKg: weight,
      age: age,
      gender: gender,
      activityLevel: activityLevel,
    });
    setDailyCalorieRequirement(dailyCalorieRequirement);

    const personalInfo = {
    heightCm: height,
    weightKg: weight,
    age: age,
    gender: gender,
    activityLevel: activityLevel,
    dailyCalorieRequirement: dailyCalorieRequirement,
   
    } as PersonalInfo;

    await savePersonalInfo(personalInfo);
  };

  const enableSave = (): boolean => {
    return height > 0 && weight > 0 && age > 0;
  };
  return (
    <Layout>
    <div 
     id="personal-info-form"
     className="flex flex-col items-center justify-center min-h-screen bg-white py-12 px-4">
      <div className="text-4xl font-bold text-center mb-4">
        Ideal Body Weight Calculator
      </div>
  
      <p className="text-gray-500 text-center max-w-2xl mb-12">
        By inputting some basic information into this ideal body weight calculator,
        you’ll be able to see your ideal body weight recommendation, and use that to
        move forward with your goals!
      </p>
  
      {/* Step Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full max-w-6xl mb-10 overflow-x-auto">
  {/* Step 1 - Sex */}
  <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center min-w-[200px]">
    <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2">
      1
    </div>
    <p className="font-semibold mb-4 text-center">What is your sex?</p>
    <div className="flex gap-4">
      <button
        onClick={() => setGender("male")}
        className={`px-4 py-2 rounded-lg border ${
          gender === "male" ? "bg-blue-100 border-blue-400" : "bg-white"
        }`}
      >
        👨 Male
      </button>
      <button
        onClick={() => setGender("female")}
        className={`px-4 py-2 rounded-lg border ${
          gender === "female" ? "bg-blue-100 border-blue-400" : "bg-white"
        }`}
      >
        👩 Female
      </button>
    </div>
  </div>

  {/* Step 2 - Age */}
  <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center min-w-[200px]">
    <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2">
      2
    </div>
    <p className="font-semibold mb-4 text-center">How old are you?</p>
    <input
      type="number"
      value={age}
      onChange={ageHandler}
      className="w-24 px-3 py-2 border rounded text-center"
    />
    <span className="text-gray-500 text-sm mt-2">Years</span>
  </div>

  {/* Step 3 - Height */}
  <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center min-w-[200px]">
    <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2">
      3
    </div>
    <p className="font-semibold mb-4 text-center">How tall are you?</p>
    <input
      type="number"
      value={height}
      onChange={heightHandler}
      className="w-24 px-3 py-2 border rounded text-center"
    />
    <span className="text-gray-500 text-sm mt-2">cm</span>
  </div>

  {/* Step 4 - Activity Level */}
  <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center min-w-[200px]">
    <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2">
      4
    </div>
    <p className="font-semibold mb-4 text-center">Activity level?</p>
    <select
      value={activityLevel}
      onChange={activityLevelHandler}
      className="w-48 px-3 py-2 border rounded text-center"
    >
      {Object.keys(ActivityLevel).map((level) => (
        <option key={level} value={level}>
          {printActivityLevel(level as keyof typeof ActivityLevel)}
        </option>
      ))}
    </select>
  </div>

  {/* Step 5 - Weight */}
  <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center min-w-[200px]">
    <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-2">
      5
    </div>
    <p className="font-semibold mb-4 text-center">What is your weight?</p>
    <input
      type="number"
      value={weight}
      onChange={weightHandler}
      className="w-24 px-3 py-2 border rounded text-center"
    />
    <span className="text-gray-500 text-sm mt-2">kg</span>
  </div>
</div>


  
      {/* Button */}
      <button
        onClick={saveHandler}
        disabled={!enableSave()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition disabled:opacity-50"
      >
        Calculate your ideal weight
      </button>
  
      {/* Result */}
      {dailyCalorieRequirement && (
        <div className="mt-6 bg-yellow-50 text-center px-6 py-4 rounded-lg shadow text-gray-800 font-medium">
          Your daily calorie requirement is {dailyCalorieRequirement}
        </div>
      )}
    </div>
  </Layout>
  );
});


export default PersonalInfoForm;
