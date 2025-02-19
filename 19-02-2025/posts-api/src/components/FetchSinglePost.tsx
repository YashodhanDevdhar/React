import { useEffect, useState } from "react";

type PostType = {
    userId: number;
    id: number;
    title: string;
    body: string;
  };

const FetchSinglePost = () => {
    const [post, setPost] = useState<PostType | null>(null);
    const [postId, setPostId] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    const fetchPost = async () => {
        if (!postId) return;
        setLoading(true);
        setPost(null);
        setError(null);
    
        try {
          const res = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${postId}`
          );
          if (!res.ok) {
            throw new Error("Post not found");
          }
          const data = await res.json();
          setPost(data);
        } catch (error) {
          setError((error as Error).message);
        } finally {
          setLoading(false);
        }
    };
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
          fetchPost();
        }, 2000);
    
        return () => clearTimeout(timeoutId);
    
        
    }, [postId]);
    
    return (
    <>
        <div className="container mt-4 p-4 border rounded bg-secondary">
          <h2 className="text-light">Fetch Post -{postId}</h2>
          <input
            type="number"
            placeholder="Enter a post ID"
            value={postId}
            className="form-control mt-3"
            onChange={(e) => {
              setPostId(e.target.value);
              setPost(null);
            }}
          />
          
          {loading && <p>Loading</p>}
          {error && <p>{error}</p>}
          {post && postId && (
            <div className="container mt-4 p-4 border rounded bg-secondary text-light">
              <p>Title : {post.title}</p>
              <p>{post.body}</p>
            </div>
          )}
        </div>
    </>
    );
}

export default FetchSinglePost