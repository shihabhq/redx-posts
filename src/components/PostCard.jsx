import { useSelector } from "react-redux";

function PostCard({ data }) {
  const users = useSelector((state) => state.users);
  console.log(users);
  const userName =
    users?.find((user) => user.id === data.userId) || "No username";
  return (
    <div className="p-4 border">
      <h1 className="text-4xl font-semibold mb-4">{data?.title}</h1>
      <h2 className="text-xl">
        by {userName.firstname} {userName.lastname}
      </h2>
      <p>{data?.content.slice(0, 100)}</p>
    </div>
  );
}

export default PostCard;
