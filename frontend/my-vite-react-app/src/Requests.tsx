import axios from "axios";
export const registerUser = async (apiurl : string, username : string, password: string) => {
    try {
        console.log("registering user");
        const response = await axios.post(apiurl,
            {
                "username" : username,
                "password" : password
            },
            {
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                }
            }
        );
        return response.data;
    }
    catch (error : any) {
        console.log("Registration failed", error);
        throw error;
    }
}

export const loginRequest = async (apiurl : string, username : string, password : string) => {
    try {
       const response = await axios.post(apiurl, {
            "username" : username,
            "password" : password
            },
            {
                 headers: {
                     "Accept": "application/json",
                     "Content-Type": "application/json"
                 }
        });

        return response.data;
    }
    catch(error : any) {
        console.error("login failed", error);
        throw error;
    }
}

export const friendRequest = async (apiurl : string) => {
    try {
        const response = await axios.post(apiurl);
        console.log(response.data);
        return response.data;
    }
    catch(err : any) {
        console.error("adding friend failed", err);
        throw err;
    }
}

export const getRequestGeneral = async (apiurl : string) => {
    try {
        const response = await axios.get(apiurl, 
            {
                headers : {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                }
            }
        );
        return response.data;
    }
    catch(err : unknown) {
        if (err instanceof Error)
            console.error("GET request failed", err.message);
        else
            console.error("GET request failed", err);
        throw err;
    }
}

