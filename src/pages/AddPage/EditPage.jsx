//CREATE SURVEY FUNCTION
import React, { useState, useContext } from "react";
import { QuestionsContext } from "../../contexts/QuestionsContext";

// ✅ Dummy createSurvey function
const createSurvey = (questions, status) => {
  const surveys = JSON.parse(localStorage.getItem("surveys") || "[]");
  const newSurvey = {
    s_id: Date.now(),
    status,
    questions,
    createdAt: new Date().toISOString(),
  };
  surveys.push(newSurvey);
  localStorage.setItem("surveys", JSON.stringify(surveys));
  return newSurvey;
};

// ✅ Proper React component with correct JSX usage
function FCreateSurveyForm() {
  const [status, setStatus] = useState("Active");

  const handleRefresh = () => {
    window.location.reload();
  };

  const { questions, setQuestions } = useContext(QuestionsContext);
  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleChoiceChange = (qIndex, cIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].choice[cIndex] = value;
    setQuestions(newQuestions);
  };

  const addChoice = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].choice.push("");
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", choice: [""], type: "multiple_choice" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedQuestions = questions.map((q) => ({
      ...q,
      choice:
        q.type === "fill_answer" ? "" : q.choice.filter((c) => c.trim() !== ""),
    }));

    const newSurvey = createSurvey(cleanedQuestions, status);
    if (newSurvey) {
      alert(`Survey created with ID: ${newSurvey.s_id}`);
    } else {
      alert("Failed to create survey");
    }
  };

  return (
    <div className="p-6 w-full h-full overflow-y-scroll  bg-white space-y-6">
      <h1 className="text-2xl font-bold">Edit Survey</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Survey Status:</label>
          <select
            className="border rounded p-2"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="border rounded p-4 bg-gray-50 space-y-2">
            <label className="block font-semibold mb-1">
              Question {qIndex + 1}
            </label>
            <input
              type="text"
              className="w-full border p-2 mb-2"
              placeholder="Enter your question"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(qIndex, "question", e.target.value)
              }
            />

            <div>
              <label className="block font-semibold mb-1">Type:</label>
              <select
                className="border p-2"
                value={q.type}
                onChange={(e) =>
                  handleQuestionChange(qIndex, "type", e.target.value)
                }
              >
                <option value="multiple_choice">Multiple Choice</option>
                <option value="fill_answer">Fill in the Blank</option>
              </select>
            </div>

            {q.type === "multiple_choice" && (
              <div className="space-y-2">
                {q.choice.map((c, cIndex) => (
                  <input
                    key={cIndex}
                    type="text"
                    className="w-full border p-2"
                    placeholder={`Choice ${cIndex + 1}`}
                    value={c}
                    onChange={(e) =>
                      handleChoiceChange(qIndex, cIndex, e.target.value)
                    }
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addChoice(qIndex)}
                  className="mt-2 text-green-600 hover:underline"
                >
                  + Add Choice
                </button>
              </div>
            )}

            {q.type === "fill_answer" && (
              <div className="mt-2">
                <label className="block font-medium text-sm mb-1">
                  Answer Field Preview:
                </label>
                <input
                  type="text"
                  disabled
                  className="w-full border p-2 bg-gray-200 text-gray-600"
                  placeholder="User will type their answer here"
                />
              </div>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="text-green-600 font-semibold hover:underline"
        >
          + Add Another Question
        </button>

        <button
          type="submit"
          className="block mt-6 bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600"
          onClick={handleRefresh}
        >
          Create Survey
        </button>
      </form>
    </div>
  );
}

// ✅ Exported page-level component
export default function EditPage({ questions, setQuestions }) {
  return (
    <>
      <FCreateSurveyForm />
    </>
  );
}
