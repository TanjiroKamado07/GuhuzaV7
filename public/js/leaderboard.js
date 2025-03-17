// After completing level 1 with a score of 5 out of 10
document.addEventListener("DOMContentLoaded", async () => {
    const leaderboardTable = document.getElementById("leaderboard-data");

    try {
        // Fetch leaderboard data from the backend API
        const response = await fetch("http://localhost:5000/api/leaderboard/top");

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Convert the response to JSON
        const data = await response.json();

        // Log for debugging
        console.log("Fetched leaderboard data:", data);

        // Clear existing rows before adding new data
        leaderboardTable.innerHTML = "";

        // If no data exists
        if (data.length === 0) {
            const noDataMessage = `
                <tr>
                    <td colspan="3" style="text-align: center;">No leaderboard data available.</td>
                </tr>
            `;
            leaderboardTable.innerHTML = noDataMessage;
            return;
        }

        // Populate the table with data
        data.forEach(user => {
            const row = `
                <tr>
                    <td>${user.rank}</td>
                    <td>${user.username}</td>
                    <td>${user.score}</td>
                </tr>
            `;
            leaderboardTable.innerHTML += row;
        });
    } catch (error) {
        console.error("Error loading leaderboard:", error);
        const errorMessage = `
            <tr>
                <td colspan="3" style="text-align: center; color: red;">
                    Error loading leaderboard data. Please try again later.
                </td>
            </tr>
        `;
        leaderboardTable.innerHTML = errorMessage;
    }
});

// Example: when the user completes the quiz, send score to backend
async function submitScore(username, level, points) {
    try {
        const response = await fetch('/api/leaderboard/update-score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,  // Get the username dynamically
                level: level,  // For example, level 1
                points: points  // Number of points earned in this level (5 out of 10)
            })
        });

        const data = await response.json();
        console.log('Score updated:', data);
    } catch (error) {
        console.error('Error updating score:', error);
    }
}
