let players = document.querySelector("#players")

cars.addEventListener("click", async function(event){

    if(event.target.matches("button")){
        let clickedId = event.target.getAttribute("data-id")

        console.log(clickedId);

        const response = await fetch("/api/players/" + clickedId, {


            method: "POST",
               
        }); 
        
        await response.json();
        

        if (response.status === 200) {

             window.location.reload();

        } else {

            console.log("some error occurred!");

        }
       
        
        
    }

})