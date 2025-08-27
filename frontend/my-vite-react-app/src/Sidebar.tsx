import { useEffect, useState } from "react";
import "./style/Sidebar.css";
import { useAuth } from "./useAuth";
import { friendRequest, getRequestGeneral } from "./Requests";
import { useNavigate } from "react-router-dom";

// make the friends list clickable to open chat with that friend
const Sidebar = () => {
   const navigate = useNavigate();
   const [inputValue, setInputValue] = useState<string>("");
   const [addUserInput, setAddUserInput] = useState<string>("");
   const [friendsList, setFriendsList] = useState<Array<any>>([]);
   const {user, setUser} = useAuth();
   const [error, setError] = useState<string | null>(null);

   const getFriends = async (apiURL : string) => {
      try {
         const response = await getRequestGeneral(apiURL);
         return response;
      }
      catch (err : unknown) {
         if (err instanceof Error)
            console.error("error fetching friends", err.message);
         else 
            console.error("error fetching friends", err);
      }
   }
   const fetchFriends = async () => {
         let arrayOfFriends : Array<any> = [];
         for (const friend of user?.friends || []) {
            const apiurl = import.meta.env.VITE_USER_URL + `/${friend}`;
            const friendData = await getFriends(apiurl);
            if (friendData)
               arrayOfFriends.push(friendData);
         }
         setFriendsList(arrayOfFriends);
      }
   // For fetching friend list
   useEffect(() => {
      // fetching friends when user data changes
      fetchFriends();
   }, [user]);
   const handleInputValue = (e : React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value.trim()) 
   }
   const handleAddUserInput = (input : React.ChangeEvent<HTMLInputElement>) => {
      setAddUserInput(input.target.value.trim());
   }

   const addFriend = async () => {
      console.log("adding friend");
      try {
         const apiurl = import.meta.env.VITE_USER_URL + `/by-username/${user?.username}/friends/${addUserInput.trim()}`;
         const userApiUrl = import.meta.env.VITE_USER_URL + `/${user?.id}`;
         console.log("link: ", apiurl)
         await friendRequest(apiurl);
         const updatedUser = await getRequestGeneral(userApiUrl);
         setUser(updatedUser);

         //await fetchFriends(); // Refresh the friends list after adding a new friend

      }
      catch (err : unknown) {
         setError("failed to add friend");
         if (err instanceof Error)
            console.error("error adding friend", err.message);
         else 
            console.error("error adding friend", err);
      }
   }
   useEffect(() => {
      console.log(inputValue);
   },[inputValue]);

   useEffect(() => {
      console.log(addUserInput);
   },[addUserInput]);

   const navigateFriendChat = (friend : any) => {
      console.log("clicked on friend: ", friend);
      navigate("/chat", {state: {friend}});
   }
   return (
      <div className="sidebar-container">
         <div className="sidebar-title">
            <h1>Conversations</h1>
         </div>

         <div className="sidebar-search">
            <input
            placeholder="&#128269; Seach user or chat"
            value = {inputValue}
            onChange = {handleInputValue}
            className = "input-text"
            />
         </div>
         <div className="friend-chats">
            <h2>Friends</h2>
            <div className="friend-list">
               {friendsList.map((friend) => (
                  <div key={friend.id} 
                  className="friend-item"
                  onClick={() => navigateFriendChat(friend)}>
                     <p>{friend.username}</p>
                  </div>
               ))}
               {friendsList.length === 0 && (
                  <p>No friends to display</p>
               )}
               
            </div>
         </div>

         <div className = "add-friend-container">
            <h2>Add friends</h2>
            <div className="add-friend-search-bar">
               <input 
               placeholder="Search User"
               className="input-text"
               onChange={(handleAddUserInput)}
               />
               <button 
               className="add-friend-btn"
               onClick={(addFriend)}>Add Friend</button>
            </div>
         </div>
      </div>
   );
}

export default Sidebar;