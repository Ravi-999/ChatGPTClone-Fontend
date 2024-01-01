const callAPI = async () => {
  const payload = {
    chatID: "123",
    question: "ugsdvusdv",
  };
  const response = await fetch("http://localhost:3001/c/answer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await response.json();
};
export default callAPI;
