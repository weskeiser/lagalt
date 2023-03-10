import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { fetchUsers } from "src/api/v1/users/users";
import { useAuth } from "src/auth/AuthProvider";
import "./style.scss";

const user = {
  firstName: "Wes",
  lastName: "Keiser",
  username: "weskeiser",
  email: "post@weskeiser.no",
  dob: "1994-11-03",
  country: "Norway",
  city: "Oslo",
  bio: "Wes is a Wes from Wes.",
  skills: ["programming", "sleeping"],
  history: [
    {
      seenProjects: [],
      clickedProjects: [],
    },
  ],
  projects: [],
  projectsContributingTo: [],
};

const ProfilSide = () => {
  const { authState } = useAuth();

  const nav = useNavigate();

  useEffect(() => {
    if (authState.type === "anon") nav({ to: "/logg-inn" });
  }, [authState]);

  const { data } = useQuery({
    queryKey: [`/users`, "users", authState],
    queryFn: () => {
      const { token } = authState;

      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      return authState.username
        ? fetchUsers(headers, `?username=${authState.username}`)
        : null;
    },
  });
  console.log(data);

  return (
    <div className="profile">
      <header className="profile__header">
        <h1>{user.username}</h1>
        <Link to="melding" className="profile__header__message-btn">
          Send melding
        </Link>
      </header>

      <section className="profile__info">
        <table>
          <tbody>
            <tr>
              <th>Navn</th>
              <td>
                {user.firstName} {user.lastName}
              </td>
            </tr>
            <tr>
              <th>Alder</th>
              <td>28</td>
            </tr>
            <tr>
              <th>Land</th>
              <td>Norge</td>
            </tr>
            <tr>
              <th>By</th>
              <td>Oslo</td>
            </tr>
          </tbody>
        </table>

        <div className="profile__info_photo">photo</div>
      </section>

      <section className="profile__projects">
        <h2>{user.username} sine prosjekter</h2>

        <ul>
          <li>Project1</li>
          <li>Project2</li>
        </ul>
      </section>

      <section className="profile__projects-contributing">
        <h2>{user.username} bidrar til disse prosjektene:</h2>

        <ul>
          <li>Project1</li>
          <li>Project2</li>
        </ul>
      </section>
    </div>
  );
};

export default ProfilSide;