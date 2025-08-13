export async function crudClients(params) {

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
        <div style="width: 100%;">
            <form>
                <div style="text-align: center; padding-bottom: 2rem; padding-top: 2rem;">
                    <h1>Clients Section</h1>
                    <div style="padding: 1.3rem" id="postStatus">
                    </div>
            </form>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">identification</th>
                    <th scope="col">Email</th>
                    <th scope="col">Telephone</th>
                    <th scope="col">Address</th>
                    <th scope="col">Modify</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody id="loadClients">
            </tbody>
        </table>
    </div>
    </div>
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Confirm Delete</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Are you sure you want to delete this client?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" id="confirmDeleteBtn">Delete</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="staticBackdroptwo" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Modify Client</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="clientInfo">

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="confirmModify">Modify</button>
                </div>
            </div>
        </div>
    `

    window.location.hash = "#/clients"

    let clientsTable = document.getElementById("loadClients");
let postStatus = document.getElementById("postStatus");

async function loadClients() {
    try {
        const res = await fetch("http://localhost:3000/clients", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await res.json();
        data.forEach(client => {
            clientsTable.innerHTML += `
                <tr>
                    <th scope="row">${client.client_id}</th>
                    <td>${client.client_name}</td>
                    <td>${client.identification}</td>
                    <td>${client.email}</td>
                    <td>${client.telephone_number}</td>
                    <td>${client.address}</td>
                    <td><button type="button" class="btn btn-primary modify-btn" data-bs-toggle="modal" data-bs-target="#staticBackdroptwo" 
                    data-id="${client.client_id}" 
                    data-name="${client.client_name}" 
                    data-identification="${client.identification}" 
                    data-email="${client.email}" 
                    data-number="${client.telephone_number}"
                    data-address="${client.address}">Modify</button></td>
                    <td><button type="button" class="btn btn-danger delete-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="${client.client_id}">
                Delete
              </button></td>
                </tr>
            `
        });

    } catch(error) {
        console.error(`Your petition has a problem ${error}`);
    }
}

loadClients()

let clientId = null;
let clientName = null;
let clientIdentification = null;
let clientEmail = null;
let clientTelephone = null;
let clientAddress = null;

clientsTable.addEventListener("click", (e) => {
    const btn = e.target.closest(".delete-btn")
    if (btn) {
        clientId = btn.getAttribute("data-id")
    }
});

document.getElementById("confirmDeleteBtn").addEventListener("click", async () => {
    try {
        const res = await fetch(`http://localhost:3000/clients/${clientId}`, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            },
        });
        if (res.ok){
            postStatus.innerHTML = `
            <span style="text-align: center; color: red"> Client deleted succesfully. </span>`;
            clientsTable.innerHTML = "";
            const modal = bootstrap.Modal.getInstance(document.getElementById("staticBackdrop"));
            modal.hide();
            loadClients();
            setTimeout(() => {
                postStatus.innerHTML = "";
            }, 3000);
        } else {
            postStatus.innerHTML = `
            <span style="text-align: center; color: red"> Client hasn't been deleted. </span>`;
            const modal = bootstrap.Modal.getInstance(document.getElementById("staticBackdrop"));
            modal.hide();
            setTimeout(() => {
                postStatus.innerHTML = "";
            }, 3000);
        }
    } catch (error) {
        console.error(`There's a problem with your method: ${error}`);
    };
});

clientsTable.addEventListener("click", (e) => {
    const btn = e.target.closest(".modify-btn")
    if (btn) {
        clientId = btn.getAttribute("data-id");
        clientName = btn.getAttribute("data-name");
        clientIdentification = btn.getAttribute("data-identification");
        clientEmail = btn.getAttribute("data-email");
        clientTelephone = btn.getAttribute("data-number");
        clientAddress = btn.getAttribute("data-address");

    };

    modifyDoctor(clientId,clientName,clientIdentification,clientEmail,clientTelephone, clientAddress);
});

async function modifyDoctor(clientId,clientName,clientIdentification,clientEmail,clientTelephone, clientAddress) {
    document.getElementById("clientInfo").innerHTML = `
        <form>
  <div class="mb-3">
    <label for="clientID" class="form-label">Client ID</label><br>
    <label for="clientID">${clientId}</label>
  </div>
  <div class="mb-3">
    <label for="clientName" class="form-label">Full Name</label>
    <input type="text" class="form-control" id="modclientName" value="${clientName}" required>
  </div>
  <div class="mb-3">
    <label for="clientIdentification" class="form-label">Identification</label>
    <input type="number" class="form-control" id="modclientIdentification" value="${clientIdentification}" required>
  </div>
  <div class="mb-3">
    <label for="clientEmail class="form-label">Email</label>
    <input type="text" class="form-control" id="modclientEmail" value="${clientEmail}" required>
  </div>
  <div class="mb-3">
    <label for="clientTelephone" class="form-label">Telephone</label>
    <input type="text" class="form-control" id="modclientTelephone" value="${clientTelephone}" required>
  </div>
  <div class="mb-3">
    <label for="clientAddress" class="form-label">Address</label>
    <input type="text" class="form-control" id="modclientAddress" value="${clientAddress}" required>
  </div>
</form>
      </div>
    `

    
};

 document.getElementById("confirmModify").addEventListener("click", (e) => {
        e.preventDefault();

        let modClientName = document.getElementById("modclientName").value;
        let modclientIdentification = Number(document.getElementById("modclientIdentification").value);
        let modclientEmail = document.getElementById("modclientEmail").value;
        let modclientTelephone = document.getElementById("modclientTelephone").value;
        let modclientAddress = document.getElementById("modclientAddress").value;

        let body = {client_name: modClientName,
            identification: modclientIdentification, 
            email: modclientEmail,
            telephone_number: modclientTelephone,
            address: modclientAddress
        };
        updateDoctor(body, clientId);
    });

async function updateDoctor(body, clientId) {
        try {
            const res = await fetch(`http://localhost:3000/clients/${clientId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(body)
            });
            if (res.ok){
                postStatus.innerHTML = `
                    <span style="text-align: center; color: green"> Client modified succesfully! </span>`;
                clientsTable.innerHTML = "";
                await loadClients();
                setTimeout(() => {
                    postStatus.innerHTML = "";
                }, 3000);
            } else {
                postStatus.innerHTML = `
                    <span style="text-align: center; color: red"> Client hasn't been modified. </span>`;
                document.getElementById("addDoctor").innerHTML = "";
            }
        } catch (error) {
        console.error(`There's a problem with your method: ${error}`);
    }
    };

}