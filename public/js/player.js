let playerContainer = document.querySelector("section")

playerContainer.addEventListener("click", async function (event) {
    // event.stopPropagation()
    console.log("clicked", event.target)
    if (event.target.matches(".addBtn")) {
        let clickedId = event.target.getAttribute("data-id")

        console.log(clickedId,"jrtdjjrdtext");

        const response = await fetch("/api/players/" + clickedId, {

            method: "PUT",
            body: JSON.stringify({}),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        await response.json();

        if (response.status === 200) {

            window.location.reload();

        } else {

            console.log("some error occurred!");

        }

    }

});