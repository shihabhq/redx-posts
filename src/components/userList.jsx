import { useSelector } from "react-redux";

function UserList() {
  const users = useSelector((state) => state.users);
  return users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });
}
export default UserList;
