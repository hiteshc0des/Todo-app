import "./List.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const List = ({ todolist, handleToggle, handleDelete }) => {
  return (
    <ul className="list">
      {todolist.map((listItem) => (
        <li key={listItem.id} className={listItem.done ? "done" : ""}>
          <span>{listItem.item}</span>
          <span className="actions">
            {listItem.done ? (
              <CancelIcon onClick={() => handleToggle(listItem.id)} />
            ) : (
              <CheckCircleIcon onClick={() => handleToggle(listItem.id)} />
            )}

            <DeleteForeverIcon onClick={() => handleDelete(listItem.id)} />
          </span>
        </li>
      ))}
    </ul>
  );
};

export default List;
