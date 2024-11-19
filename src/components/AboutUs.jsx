import { Component } from "react";
import { User } from "./User";
import { UserClass } from "./UserClass";

export class AboutUs extends Component {
  constructor(props) {
    super(props);
    //console.log("Parent constructor");
  }

  async componentDidMount() {
    //console.log("Parent Component did mount");
    //api calling
    
  }
  render() {

  
    //console.log("Parent render");
    return (
      <>
        <div>
          <h1 className="text-3xl">About us,parent Component</h1>
          <User name={"first"} location={"mumbai"} />
          {/* <UserClass name={"second"} location={"gujarat"} /> */}
          <UserClass/>
        </div>
      </>
    );
  }
}
