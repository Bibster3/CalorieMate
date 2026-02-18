import React, { useEffect, useState } from "react";
import {
  getPersonalInfo, savePersonalInfo
} from "../../shared/db/personalInfo";
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

  const heightHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(event.target.value));
  };

  const weightHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(event.target.value));
  };

  const ageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(event.target.value));
  };

  const activityLevelHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setActivityLevel(event.target.value as keyof typeof ActivityLevel);
  };


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
      )}
    </div>
  </Layout>
  );
};

export default PersonalInfoForm;
