import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <Navbar bg="light" expand="md" className="shadow-sm">
      <Link to="/" className="navbar-brand">
        Custom Video Player
      </Link>
    </Navbar>
  );
};
