document.getElementById("userForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const service = document.getElementById("service").value;
    const comments = document.getElementById("comments").value;

    try {
        const response = await fetch("http://localhost:5000/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, service, comments })
        });

        if (response.ok) {
            alert("User data submitted successfully!");
            document.getElementById("userForm").reset();
        } else {
            alert("Failed to submit user data.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting user data.");
    }
});

