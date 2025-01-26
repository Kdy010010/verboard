import { useState, useEffect } from 'react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 게시글 불러오기
  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 게시글 추가
  const addPost = async (e) => {
    e.preventDefault();
    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    setTitle('');
    setContent('');
    fetchPosts();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Bulletin Board</h1>
      <form onSubmit={addPost} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ marginRight: '10px' }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          style={{ marginRight: '10px', verticalAlign: 'top' }}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>: {post.content} <em>({new Date(post.createdAt).toLocaleString()})</em>
          </li>
        ))}
      </ul>
    </div>
  );
}
