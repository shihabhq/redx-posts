import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "./PostCard";
import { addPost, fetchPosts } from "../features/posts/postsSlice";
import UserList from "./userList";

function Posts() {
  const postsData = useSelector((state) => state.posts);
  const { posts, error, status } = postsData;
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    userId: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.content.trim() ||
      !formData.userId.trim()
    ) {
      setMessage("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    setMessage("");
    // Simulate API call
    dispatch(addPost(formData.title, formData.content, formData.userId));
    setMessage("successfully Posted");
    setTimeout(() => {
      if (message) {
        setMessage("");
      }
    }, 2000);
    setFormData({ title: "", content: "", userId: "" });
    setIsSubmitting(false);
  };
  let content;
  if (status === "loading") {
    content = <h1>loading....</h1>;
  } else if (status === "succeeded") {
    content = posts.map((post) => {
      return <PostCard key={post.id} data={post} />;
    });
  } else if (status === "rejected") {
    content = <h1>{error}</h1>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Create New Post
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter post title"
              />
            </div>
            <div>
              <select
                value={formData.userId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    userId: e.target.value,
                  }))
                }>
                <option value=""></option>
                <UserList />
              </select>
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    content: e.target.value,
                  }))
                }
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                placeholder="Write your post content..."
              />
            </div>

            {message && (
              <p
                className={`text-sm ${
                  message.includes("error") || message.includes("Please")
                    ? "text-red-600"
                    : "text-green-600"
                }`}>
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2 border border-transparent rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors
                ${isSubmitting ? "opacity-75 cursor-not-allowed" : ""}
              `}>
              {isSubmitting ? "Posting..." : "Post"}
            </button>
          </form>
        </div>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default Posts;
