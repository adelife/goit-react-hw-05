import css from "./ErrorMessage.module.css";

const ErrorMessage = ({ message = "" }) => {
  return (
    <b className={css.errorText}>
      {message.length > 0
        ? message
        : "❌ Whoops, something went wrong! Please try reloading this page!"}
    </b>
  );
};

export default ErrorMessage;