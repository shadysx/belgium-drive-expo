import { Question } from "~/models/question";
import humps from "humps";

const API_URL = "http://localhost:3000/api";

export async function fetchQuestions(): Promise<Question[]> {
  const response = await fetch(`${API_URL}/questions`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  // TODO: Rename the fields to camelCase directly in the tables
  return humps.camelizeKeys(data) as Question[];
}
