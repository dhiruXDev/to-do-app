// import Container from 'react-bootstrap/Container';
// import Navbar from 'react-bootstrap/Navbar';
// import Button from "react-bootstrap/Button";
// import { useNavigate } from 'react-router-dom';
// export default function Navigation() {
//     const navigate = useNavigate()
//     const Logout = () =>{
//         localStorage.clear();
//         navigate('/login')
//     }
//   return (
//     <>
//     <Navbar>
//       <Container>
//         <Navbar.Brand href="/">ASSESSMENT</Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
         
//           <Button className='mx-1' variant="primary" onClick={Logout} >
//             LOGOUT
//           </Button>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//     </>
//   );
// }

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
 import { useNavigate } from 'react-router-dom';

function NavbarPage() {

  const navigate = useNavigate()
    const Logout = () =>{
        localStorage.clear();
        navigate('/login')
    }
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">LN Webworks</Navbar.Brand>          
          <Nav className="justify-content-end">
            <Nav.Link href="#" onClick={Logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

    
    </>
  );
}

export default NavbarPage;