import { useState } from "react"

type PostForm = {
    title : string;
    body : string;
    userId : number | null;
}

const PostForm = () => {
    const [PostData, setPostData] = useState<PostForm>({
        title : "",
        body : "",
        userId : null
    });

    const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
        event?.preventDefault();

        fetch("https://jsonplaceholder.typicode.com/posts",{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(PostData)
        })
        .then(response => {
            if(!response.ok){
                throw new Error(`HTTP error! Status : ${response.status}`);
            }
            return response.json().then(data => ({data, status: response.status}))
        })
        .then(({data,status}) => {
            console.log("Data: ",data)
            alert(`Post successful ! Status : ${status}`)
            setPostData({ title: "", body: "", userId: null });
        })
        .catch(error => {
            console.log("Error: ",error)
            alert(`Failed to post! Status : ${error.message}`)
        })
    }

  return (
    <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded bg-secondary">
        <h2 className="text-light">Post Form</h2>
        <input 
            type="text"
            placeholder="Enter Title"
            name="title"
            value={PostData.title}
            onChange={(e)=>setPostData(prev=>({...prev,title:e.target.value}))}
            className="form-control mt-3"
            required
        >
        </ input>
        <textarea
            placeholder="Enter Body" 
            name="body"
            value={PostData.body}
            onChange={(e)=>setPostData(prev=>({...prev, body:e.target.value}))}
            className="form-control mt-2"
            required
        >
        </textarea>
        <input 
            type="number"
            placeholder="Enter UserId"
            name="userId"
            value={PostData.userId ?? ""}
            onChange={(e)=>setPostData(prev=>({...prev, userId : Number(e.target.value)}))}
            className="form-control mt-2"
            required
        >
        </ input>
        <button
            type="submit"
            className="btn btn-primary mt-4"
        >
            Submit
        </button>
        
    </form>
    
  )
}

export default PostForm