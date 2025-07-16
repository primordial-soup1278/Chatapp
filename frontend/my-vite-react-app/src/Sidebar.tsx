import { useEffect, useState } from "react";
import "./style/Sidebar.css";

const Sidebar = () => {
   const [inputValue, setInputValue] = useState<string>("");
   const [addUserInput, setAddUserInput] = useState<string>("");
   const handleInputValue = (e : React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value.trim()) 
   }
   const handleAddUserInput = (input : React.ChangeEvent<HTMLInputElement>) => {
      setAddUserInput(input.target.value.trim());
   }

   const addFriend = () => {
      console.log("adding friend");
   }
   useEffect(() => {
      console.log(inputValue);
   },[inputValue]);

   useEffect(() => {
      console.log(addUserInput);
   },[addUserInput]);

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