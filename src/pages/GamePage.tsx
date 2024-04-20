import GameComponent from "../components/GameComponent";

const GamePage = () => {

    return (
        <>
            <div className="gamePageHeader d-flex flex-column align-items-center">
                <div className="bg-dark ps-5 pe-5 pt-3 pb-2 w-50 d-flex flex-column align-items-center rounded">
                    <h1 className="display-1 text-light">F1 Reactions</h1>
                    <p className="fs-3 text-light">Stay focused</p>
                </div>
            </div>  

            <GameComponent/>
        </>
    );
};

export default GamePage;