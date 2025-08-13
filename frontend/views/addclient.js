export async function addClient() {
    document.getElementById("outPut").innerHTML = `
        <div style="display: flex;">
        <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style="width: 280px; height: 100vh;  position: sticky; top: 0; z-index: 999;">
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <span class="fs-4">ExpertSoft</span>
            </a>
            <hr>
            <ul class="nav nav-pills flex-column mb-auto">
                <li>
                    <a href="#/clients" class="nav-link text-white">
                        Clients
                    </a>
                </li>
                <li>
                    <a href="#/addclient" class="nav-link text-white">
                        Add Clients
                    </a>
                </li>
                <li>
                    <a href="#/importcsv" class="nav-link text-white">
                        Import csv
                    </a>
                </li>
            </ul>
            <hr>
        </div>


            <div style="display: flex; align-items: center; margin-left: auto; margin-right: auto; border: 1px solid gray; margin-top: 3rem; margin-bottom: 3rem; padding: 5rem; border-radius: 25px">
                <form>
                    <h1>Add Client</h1>
                    <div class="mb-3">
                        <label for="clientName" class="form-label" style="text-align: center">Client Name</label>
                        <input id="clientName" type="text" class="form-control"  aria-describedby="textHelp" required>
                    </div>
                    <div class="mb-3">
                        <label for="clientIdentification" class="form-label">identification</label>
                        <input id="identification" type="text" class="form-control" style="font-size: 16px;" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input id="clientEmail" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="number" class="form-label">Telephone Number</label>
                        <input id="clientNumber" type="text" class="form-control" required>
                    </div>
                    <div class="mb-3">
                        <label for="clientAddress" class="form-label">Address</label>
                        <input id="clientAddress" type="text" class="form-control"  aria-describedby="emailHelp" required>
                    </div>
                    
                    <button type="submit" id="newClient" class="btn btn-primary" style="width: 100%;">Add Client</button>

                    <div style="padding: 1.3rem" id="postStatus">
                    </div>
                </form>

            </div>

    `

    window.location.hash = `#/addclient`

    let newClient = document.getElementById("newClient");
    let postStatus = document.getElementById("postStatus");
    newClient.addEventListener("click", (e) => {
    e.preventDefault();
    let name = document.getElementById("clientName").value;
    let identification = document.getElementById("identification").value;
    let email = document.getElementById("clientEmail").value;
    let number = document.getElementById("clientNumber").value;
    let address = document.getElementById("clientAddress").value;
    
    

    if (!name || !identification|| !email || !number || !address) {
        postStatus.innerHTML = `
            <span style="text-align: center; color: red"> You need to complete all the fields </span>
        `
    } else {
        let body = {client_name: name,
            identification: identification, 
            email: email,
            telephone_number: number,
            address: address
        };
        postClient(body)
    }
})

async function postClient(body) {
    postStatus.innerHTML = "";
    try {
        const res = await fetch("http://localhost:3000/clients", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(body)
        });
        if (res.ok){
            postStatus.innerHTML = `
            <span style="text-align: center; color: green"> Client added succesfully! </span>`;
            setTimeout(() => {
                postStatus.innerHTML = "";
            }, 3000);
        }
    } catch (error) {
        console.error(`There's a problem with your post!: ${error}`);
    }
}

}