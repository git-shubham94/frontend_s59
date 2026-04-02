export const BACKENDURL = "https://backend-km7e.onrender.com/crud/";

export function callApi(reqMethod, url, data, responseHandler)
{
    let options;

    if(reqMethod === "GET" || reqMethod === "DELETE")
        options = {method: reqMethod, headers:{'Content-Type': 'application/json'}};
    else
        options = {method: reqMethod, headers:{'Content-Type': 'application/json'}, body: data};

    fetch(url, options)
        .then((response)=>{
            if(!response.ok)
                throw new Error(response.status + " " + response.statusText);
            return response.text();
        })
        .then((data)=>responseHandler(data))
        .catch((err)=>alert(err));
}