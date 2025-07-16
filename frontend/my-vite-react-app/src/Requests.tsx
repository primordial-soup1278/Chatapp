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
    catch (error) {
        console.log("Registration failed", error);
        throw error;
    }
}