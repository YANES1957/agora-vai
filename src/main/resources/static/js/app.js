function checkStatus() {
    const name = document.getElementById("name").value;

    fetch("/api/status/" + name)
        .then(response => response.json())
        .then(data => {
            document.getElementById("result").innerText =
                data.name + " está " + data.status;
        });
}
