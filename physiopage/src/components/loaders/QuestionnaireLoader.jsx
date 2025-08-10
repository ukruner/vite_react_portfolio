import { getAuthToken } from "../../utils/auth";


export async function QuestionnaireLoader() {

    const token = getAuthToken();

  const res = await fetch("http://localhost:8080/questionnaire", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Response("Unauthorized", { status: res.status });
  }

  const data = await res.json();
  return data;
}
