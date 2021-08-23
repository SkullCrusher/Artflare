import React       from 'react';

// Link to give credit to jackbox for the idea.
const link = "https://store.steampowered.com/app/434170/The_Jackbox_Party_Pack_3"

class AboutUs extends React.Component {

  state = {};

  render(){
    return (
        <div className="about-us">
            <div className="item">
                <div className="title">
                    What is Artflare?
                </div>
                <div className="text">
                    <p>Artflare is a group drawing game inspired by the party game <a href={link}> Jackbox </a></p>
                    <p>Each player draws some art and writes some captions for the art at random. Then they are shuffled and given to players at random and players use what they are given to try to make the most funny combination. The winner is voted on by everyone based on what they thought as the most funny.</p>
                </div>
            </div>
            <div className="item">
                <div className="title">
                    Why was this made?
                </div>
                <div className="text">
                    <p>I built this for fun to enter the 2021 Cloudflare summer developer challenge and hopefully get some swag. I had very little time to build this so it's super rough, it's just prototype to show a concept.</p>
                </div>
            </div>
        </div>
    )
  };
}

export default AboutUs;