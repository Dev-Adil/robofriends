import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll"
import ErrorBoundary from "../components/ErrorBoundary";
import './App.css'

function App() {
    const [robots, setRobots] = useState([]);
    const [searchfield, setSearchField] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => { setRobots(users) });
            console.log(count);
    }, [count]) // only run if count changes

    const onSearchChange = (event) => {
        setSearchField(event.target.value);
    }

    const filterRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ?
        (
            <div className="tc v-mid">
                <h1 className="pa3 f1 loadText">Loading</h1>
                <div className="loader"></div>
            </div>
        )
        :
        (
            <div className="tc">
                <h1 className="f1">RoboFriends</h1>
                <button onClick={()=>setCount(count+1)}>Click Me!</button>
                <SearchBox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filterRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
}

export default App;