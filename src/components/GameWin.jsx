export default function GameWin({ gameStatus }) {
    if(gameStatus == "win") {
        return (
            <div className="game-end-screen">
                YOU WIN!
            </div>
        )
    }
}