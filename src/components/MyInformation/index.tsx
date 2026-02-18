import React, { useEffect, useState } from 'react'
import { getPersonalInfo, savePersonalInfo } from '../../shared/db/personalInfo'
import { calorieCalculator, printActivityLevel } from '../../shared/functions'
import { ActivityLevel, Gender, PersonalInfo } from '../../shared/types'
import Layout from '../Layout'

const PersonalInfoForm: React.FC = () => {
  const [height, setHeight] = useState<number>(0)
  const [weight, setWeight] = useState<number>(0)
  const [age, setAge] = useState<number>(0)
  const [gender, setGender] = useState<Gender>('female')
  const [activityLevel, setActivityLevel] =
    useState<keyof typeof ActivityLevel>('lightExercise')
  const [dailyCalorieRequirement, setDailyCalorieRequirement] =
    useState<number>()

  useEffect(() => {
    getPersonalInfo().then((personal) => {
      if (!personal) {
        return
      }

      setHeight(personal.heightCm)
      setWeight(personal.weightKg)
      setAge(personal.age)
      setGender(personal.gender)
      setActivityLevel(personal.activityLevel)
      setDailyCalorieRequirement(personal.dailyCalorieRequirement)
    })
  }, [])

  const heightHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(event.target.value))
  }

  const weightHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(event.target.value))
  }

  const ageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAge(Number(event.target.value))
  }

  const activityLevelHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setActivityLevel(event.target.value as keyof typeof ActivityLevel)
  }

  const saveHandler = async () => {
    const requirement = calorieCalculator({
      heightCm: height,
      weightKg: weight,
      age,
      gender,
      activityLevel,
    })

    setDailyCalorieRequirement(requirement)

    const personalInfo: PersonalInfo = {
      heightCm: height,
      weightKg: weight,
      age,
      gender,
      activityLevel,
      dailyCalorieRequirement: requirement,
    }

    await savePersonalInfo(personalInfo)
    window.dispatchEvent(new Event('personalInfoUpdated'))
  }

  const canSave = height > 0 && weight > 0 && age > 0

  return (
    <Layout>
      <div
        id="personal-info-form"
        className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12"
      >
        <div className="mb-4 text-center text-4xl font-bold">
          Ideal Body Weight Calculator
        </div>

        <div className="w-full max-w-md space-y-6">
          <div>
            <label htmlFor="height" className="block font-semibold mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              value={height || ''}
              onChange={heightHandler}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="weight" className="block font-semibold mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              value={weight || ''}
              onChange={weightHandler}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="age" className="block font-semibold mb-1">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={age || ''}
              onChange={ageHandler}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block font-semibold mb-1">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as Gender)}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="activityLevel" className="block font-semibold mb-1">
              Activity Level
            </label>
            <select
              id="activityLevel"
              value={activityLevel}
              onChange={activityLevelHandler}
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            >
              <option value="sedentary">Sedentary</option>
              <option value="lightExercise">Light Exercise</option>
              <option value="moderateExercise">Moderate Exercise</option>
              <option value="heavyExercise">Heavy Exercise</option>
              <option value="athlete">Athlete</option>
            </select>
          </div>

          {dailyCalorieRequirement && (
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-lg font-semibold">
                Daily Calorie Requirement: {dailyCalorieRequirement} kcal
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Activity Level: {printActivityLevel(activityLevel)}
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={saveHandler}
            disabled={!canSave}
            className={`w-full py-3 rounded-md font-semibold ${
              canSave
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Calculate & Save
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default PersonalInfoForm
