import React, { useEffect, useState } from "react";
import "./personalProfile.css";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import AuthService from "../../utils/auth";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";

// Personal Profile component - Displays user's profile
const PersonalProfile = () => {
  const [user, setUser] = useState({});

  const { loading, data } = useQuery(GET_ME, {
    variables: { id: AuthService.getProfile().data._id },
  });

  useEffect(() => {
    if (data) {
      setUser(data.getMe);
    }
  }, [data]);

  if (loading) {
    return <p>Patience, mate...</p>;
  }

  const handleFindMates = (e) => {
    e.preventDefault();
    window.location.assign("/search");
  };

  const followers = user?.followers || [];
  const following = user?.following || [];

  return (
    <>
      <div class="outer-div">
        <div class="inner-div">
          <div class="front">
            <div class="front__bkg-photo"></div>
            <div class="front__face-photo"></div>
            <div class="front__text">
              <div className="cardTop">
                <h3 class="matesHeader">
                  {user.firstName} {user.lastName}
                </h3>
                <p class="front__text-para">
                  <i class="fas fa-map-marker-alt front-icons"></i>
                </p>
              </div>
              <div className="cardBottom">
                <div className="followerBox">
                  <div className="peopleRow">
                    <IoIcons.IoIosPeople className="mr-3" />
                    <Link to="/followers">Followers</Link>
                  </div>
                  <div className="peopleRow">
                    <MdIcons.MdOutlinePersonSearch className="mr-3" />
                    <Link to="/following">Following</Link>
                  </div>
                </div>
                <button class="matesBtn pt-7" onClick={handleFindMates}>Search for Mates</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalProfile;
