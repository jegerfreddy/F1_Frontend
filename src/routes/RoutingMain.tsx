import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { HomePage, DriversPage, LeaderboardPage, GamePage } from "../pages";
import F1Provider from "../contexts/F1Context";

const RoutingMain = () => {
    return (
        <>
            <BrowserRouter>
                <F1Provider>
                    <nav className="d-flex bg-dark p-3">
                        
                        <Link to="/">
                            <button className="btn navButton fs-3 ps-5 pe-5 m-3">Home</button>
                        </Link>

                        <Link to="driver-page">
                            <button className="btn navButton fs-3 ps-5 pe-5 m-3">Drivers</button>
                        </Link> 

                        <Link to="game-page">
                            <button className="btn navButton fs-3 ps-5 pe-5 m-3 text-nowrap">Play F1</button>
                        </Link>

                        <Link to="leaderboard-page">
                            <button className="btn navButton fs-3 ps-5 pe-5 m-3">Leaderboard</button>
                        </Link>
                    </nav>

                    <main>
                            <Routes>
                                <Route path="/" element={<HomePage/>}></Route>
                                <Route path="driver-page" element={<DriversPage/>}></Route>
                                <Route path="leaderboard-page" element={<LeaderboardPage/>}></Route>
                                <Route path="game-page" element={<GamePage/>}></Route>
                            </Routes>
                    </main>
                </F1Provider>
            </BrowserRouter>
        </>
    );
};

export default RoutingMain;