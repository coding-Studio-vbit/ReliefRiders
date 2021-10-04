export const fetchLeaderBoard = async () => {
  try {
    const res = await fetch(
      process.env.REACT_APP_URL + "/leaderboard/showLeaderboard",
      {
        method: "GET",
      }
    );
    const data = await res.json();
    console.log(data);
    return { status: data.status === "success" ? 1 : -1, data: data.message };
  } catch (error) {
    return {error:"Unable to access server"}
  }
};
