export default function Header({ title, image }) {
  return (
    <div className="header">
      <h1 className="header__title">{title}</h1>
      {image && <img className="header__image" src={image} alt="Header" />}
    </div>
  );
}
