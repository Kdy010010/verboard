let posts = []; // 메모리 저장 (실제 서비스에서는 DB를 사용해야 함)

export default function handler(req, res) {
  if (req.method === 'GET') {
    // 게시글 목록 조회
    res.status(200).json(posts);
  } else if (req.method === 'POST') {
    // 게시글 추가
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required' });
    }
    const newPost = { id: posts.length + 1, title, content, createdAt: new Date() };
    posts.push(newPost);
    res.status(201).json(newPost);
  } else if (req.method === 'DELETE') {
    // 게시글 삭제
    const { id } = req.body;
    posts = posts.filter((post) => post.id !== id);
    res.status(200).json({ message: 'Post deleted' });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
