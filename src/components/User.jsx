import { useState } from "react";

export const User = (props) =>
{
    const[count,setCount] = useState(0);
    const{name,location} = props;
    return(
        <div>
            <h1>user Component</h1>
            <h1>count:{count}</h1>
            <h1>{name}</h1>
            <h3>{location}</h3>
        </div>
    )
}