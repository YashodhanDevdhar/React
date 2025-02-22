import { useState } from "react"
import { useSearchParams } from "react-router-dom";

const QueryParams = () => {
    const [inputValue, setInputValue] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const handleAddQuery = () => {
        if(inputValue.trim()){
            setSearchParams({query: inputValue});
        }
    }

    return (
        <div>
            <input 
            type="text" 
            value={inputValue}
            onChange={(e)=> setInputValue(e.target.value)}
            placeholder="Enter search text"
            />
            <button onClick={handleAddQuery}>
                Search
            </button>
            <p>Current query : {searchParams.get("query") || "None"}</p>
        </div>
    )
}

export default QueryParams