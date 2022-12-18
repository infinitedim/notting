interface props {
  btnText: string;
}

function Button({ btnText }: props): JSX.Element {
  return (
    <button
      type="button"
      className="button"
    >
      {btnText}
    </button>
  );
}

export default Button;
