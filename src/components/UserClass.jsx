import { Component } from "react";

export class UserClass extends Component {
  constructor(props) {
    super(props);
    //console.log("User class constructor");
  this.state = {
    userInfo:{
      name:"dummy",
      location:"default",
    },
    count:0,
  }
}

async componentDidMount() {
  //console.log("Parent Component did mount");
  //api calling
  const data = await fetch("https://api.github.com/users/smit");
  const json = await data.json();

  this.setState({
    userInfo:json
  })

  console.log(json);
}
  render() {
    //console.log("user class render")
    const {name,location} = this.state.userInfo;
    const {count} = this.state;
    return (
      <>
        <div>
            <h1>user class component</h1>
            <h1>{name + location}</h1>
            <h1>Count:{count}</h1>
        </div>
        <button onClick={ () =>{
            this.setState ({
                count: this.state.count + 1,
        })}
        }>Count increase</button>
      </>
    );
  }
}

/*
constructor(dummy)
render(dummy)
<HTML Dummy>

componentDidMount(renders) used for API call
<this.setState> ->state variable updated

renders API data
<HTML (new API data called)>
 
*/