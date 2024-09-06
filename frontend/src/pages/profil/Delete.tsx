import { redirect, useParams } from "react-router-dom";

export default function Delete () {

    const { userId } = useParams();

    if (userId=== "") {
        return (
            <div>
                connectez-vous
            </div>
        )
    } 
    fetch(
        `http://localhost:3000/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
    return redirect("/logout/"+userId);

}