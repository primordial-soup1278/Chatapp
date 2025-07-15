import { inputValue, useEffect, useState } from "react";
import "./style/Sidebar.css";

const Sidebar = () => {
   const [inputValue, setInputValue] = useState<string>("");
   
   const handleInputValue = (e : React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value.trim()) 
   }
   useEffect(() => {
      console.log(inputValue);
   },[inputValue]);

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
      </div>
   );
}

export default Sidebar;