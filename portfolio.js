// Retrieve the player's level from localStorage
const playerLevel = parseInt(localStorage.getItem("playerLevel") || 1);

// Unlock portfolio sections based on the player's level
if (playerLevel >= 1) document.getElementById("aboutSection").classList.remove("hidden");
if (playerLevel >= 2) document.getElementById("educationSection").classList.remove("hidden");
if (playerLevel >= 3) document.getElementById("experienceSection").classList.remove("hidden");
if (playerLevel >= 4) document.getElementById("projectsSection").classList.remove("hidden");
if (playerLevel >= 5) document.getElementById("contactSection").classList.remove("hidden");
