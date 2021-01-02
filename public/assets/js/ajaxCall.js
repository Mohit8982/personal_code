function ajaxCall(url, data, method)
{
    let header = {
        method: method,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "same-origin",
    }

    if(method == "GET"){
        header = {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "same-origin",
            cache: "force-cache"
        }   
    }

    return new Promise((resolve, reject)=>{
        fetch(url, header)
        .then((res) => res.json())
        .then((resp) => {
            const status =  resp.status;
            switch (status.toString()) {
                case "1":
                    // toastr.success(resp.message,'Idea Bank');
                    resolve(resp)
                    break;
                case "0":
                    // toastr.error(resp.message,'Idea Bank');
                    break;
                case "2":
                    // toastr.warning(resp.message,'Idea Bank');
                    resolve(resp)
                    break;
                case "55":
                    const answer = window.confirm("Save data?");
                    if (answer) {
                        location.replace('/')
                    }
                    else {
                        return false;
                    }
                    break;         
                default:
                    alert('Session Timeout');
            }
        })
        .catch((error) => {
            toastr.error(error,'Idea Bank');
        });
    });
}

