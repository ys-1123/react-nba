import React, {Component} from 'react';
import Profile from './Profile';
import DataViewContainer from "./DataViewContainer";
import SearchBar from './SearchBar';
import nba from 'nba';
import {DEFAULT_PLAYER_INFO} from "../constant";

console.log(nba);

class Main extends Component {
  state = {
    //playerId: nba.findPlayer('Stephen Curry').playerId,
    playerInfo: DEFAULT_PLAYER_INFO,
  }

  componentDidMount() {
    // nba.stats.playerInfo({PlayerID: this.state.playerId}).then((info) => {
    //   const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
    //   // console.log('playerInfo', playerInfo);
    //   this.setState({playerInfo: playerInfo});
    // }).catch((e) => console.log(e))
    this.loadPlayerInfo(this.state.playerInfo.fullName);
  }

  loadPlayerInfo = (playerName) => {
    nba.stats.playerInfo({PlayerID: nba.findPlayer(playerName).playerId}).then((info) => {
      const playerInfo = Object.assign(info.commonPlayerInfo[0], info.playerHeadlineStats[0]);
      this.setState({playerInfo: playerInfo});

      console.log(`set player ${playerName}`);

    }).catch((e) => console.log(e));
  }

  handleSelectPlayer = (playerName) => {
    console.log(playerName);
    this.loadPlayerInfo(playerName);
  }
  render() {
    // console.log(this.state.playerId)
    return (
        <div className="main">
          <SearchBar loadPlayerInfo={this.handleSelectPlayer}/>

          <div className="player">
            <Profile playerInfo={this.state.playerInfo}/>
            <DataViewContainer playerId={this.state.playerInfo.playerId}/>
          </div>
        </div>
    );
  }
}

export default Main;
