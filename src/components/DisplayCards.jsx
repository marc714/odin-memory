export default function DisplayCard({ gameStatus, gameArray, onClick }) {
    function randomize() {
        // add flip all cards to pokemon-back.png, randomize, and re-display

    }
    
    if(gameStatus == "on") {        
        return (
            <div className="gamecard-container">
            {
                gameArray.map((obj) => 
                    <div className="gamecard" onClick={onClick} data-identity={obj.id} key={obj.id}>
                        <span className="loadSpan"></span>
                        <img src={obj.picture} />
                    </div>    
                )       
            }
            </div>
        )
    };

    if(gameStatus == "win") {
        return (
            <div className="game-end-screen">You Win!</div>
        )
    };

    if(gameStatus == "lose") {
        return (
            <div className="game-end-screen">You Lose!</div>
        )
    };


    
}