import { crudClients } from "./views/clientscrud.js";
import { addClient } from "./views/addclient.js";
import { importCSV } from "./views/importcsv.js";

export let router = {
    "#/clients": crudClients,
    "#/addclient": addClient,
    "#/importcsv": importCSV
}