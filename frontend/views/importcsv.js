export async function importCSV() {
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

        <div style="display: flex; align-items: center; margin-left: auto; margin-right: auto; border: 1px solid gray; margin-top: 10rem; margin-bottom: 10rem; padding: 5rem; border-radius: 25px">
                <form>
                    <h1 style="margin-bottom: 2rem">Import CSV File</h1>
                    <div class="mb-3">
                        <div>
                        <label for="formFileLg" class="form-label">Load a clients CSV file</label>
                        <input class="form-control form-control-lg" id="csv" type="file" name="csv" accept=".csv">
                        </div>
                    </div>
                    
                    <button type="submit" id="sendCSV" class="btn btn-primary" style="width: 100%;">Add Client</button>

                    <div style="padding: 1.3rem" id="postStatus">
                    </div>
                </form>

            </div>
    `

window.location.hash = "#/importcsv"

let postStatus = document.getElementById("postStatus");
let inputFile = document.getElementById("csv");
let send = document.getElementById("sendCSV");

send.addEventListener("click", (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        formData.append("file", inputFile.files[0]);
        console.log(formData);
        
        sendCSV(formData)

})

async function sendCSV(formData) {
    try{
        const res = await fetch("http://localhost:3000/loadClients", {
            method: "POST",
            body: formData
        })
        if (res.ok){
            postStatus.innerHTML = `
                <label style="color: greenyellow;">Clients post went succesfully!</label>            
            `
        } else {
            postStatus.innerHTML = `
                <label style="color: red;">Something went wrong!</label>            
            `
        }
    } catch (error) {
        console.error(`Your post has a problem ${error}`);
    }
}
}