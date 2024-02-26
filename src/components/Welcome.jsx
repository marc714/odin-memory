import picture from '/public/welcome.jpg'

export default function Welcome({ gameStatus }) {
    if(gameStatus == "off") {
        return (
            <div className='welcome'>
                <img src={picture}></img>
                <div className='message'>Let's Play!</div>
            </div>
            
        )
    }
}
