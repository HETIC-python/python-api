import { redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Logout () {
    const { userId } = useParams();

    if (userId=== "") {
        return (
            <div>
                connectez-vous
            </div>
        )
    } 


    fetch(
        `http://localhost:3000/logout/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      return (
        <div>
            Vous êtes déconnecté, allez à l'<Link to="/">accueil</Link>
        </div>
      );

}