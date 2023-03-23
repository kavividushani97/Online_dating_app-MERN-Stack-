import React from "react";
import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user", {
        params: { userId },
      });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/gendered-users", {
        params: { gender: user?.gender_interest },
      });
      setGenderedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getGenderedUsers();
  }, [user, genderedUsers]);

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put("http://localhost:8000/addmatch", {
        userId,
        matchedUserId,
      });
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(user);
  //console.log("gendered users", genderedUsers);

  const swiped = (direction, swipedUserdId) => {
    //console.log("removing: " + nameToDelete);
    if (direction === "right") {
      updateMatches(swipedUserdId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + "left the screen!");
  };

  return (
    <>
      {user && (
        <div className="dashboard">
          <ChatContainer user={user} />
          <div className="swipe-container">
            <div className="card-container">
              {genderedUsers?.map((genderedUsers) => (
                <TinderCard
                  className="swipe"
                  key={genderedUsers.first_name}
                  onSwipe={(dir) => swiped(dir, genderedUsers.user_id)}
                  onCardLeftScreen={() => outOfFrame(genderedUsers.first_name)}
                >
                  <div
                    style={{
                      backgroundImage: "url(" + genderedUsers.url + ")",
                    }}
                    className="card"
                  >
                    <h3>{genderedUsers.first_name}</h3>
                  </div>
                </TinderCard>
              ))}
              <div className="swipe-info">
                {lastDirection ? <p>You swiped {lastDirection}</p> : <p />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
