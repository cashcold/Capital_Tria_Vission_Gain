import React, { Component } from "react";
import Activities from "./Activities"; // adjust path accordingly

class ActivitiesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
    };
  }

  componentDidMount() {
    const activitiesInstance = new Activities();
    this.setState({ activities: activitiesInstance.activities });
  }

  render() {
    const { activities } = this.state;

    return (
      <div>
        <h2>Recent Activities</h2>
        <ul>
          {activities.map((activity, idx) => (
            <li key={idx}>{activity}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ActivitiesList;
