import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <p>Sorry, the page you visited does not exist!</p>
      <button>
        <Link to='/'>Go back</Link>
      </button>
    </div>
  );
};

export default NotFoundPage;