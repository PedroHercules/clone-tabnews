import { useState } from "react";

const imageStyle = {
  width: '100%',
  height: '250px',
  objectFit: 'cover', // ou 'contain'
  borderRadius: '12px',
};



function Home() {
    const [gameState, setGameState] = useState("idle");

    const handleInit = () => {
        setGameState("playing");
    }

    const handleTrailLeave = (event) => {
        if (gameState === "playing" && event.target.id === "trail" && event.relatedTarget?.id !== "trail") {
            setGameState("lost");
        }
    }

    const handleFinishEnter = () => {
        if (gameState === "playing") {
            setGameState("won");
        }
    }
    
    return (
        <>
            <h1>Chegue ao final do labirinto</h1>
            <div
                style={{
                    display: 'flex',
                    gap: '20px',
                }}
            >
                <div 
                    style={{
                        position: 'relative',
                        width: '600px',
                        height: '400px',
                        backgroundColor: '#e5e5e5',
                    }}
                >
                   
                    <div
                        style={{
                            position: 'absolute',
                            width: 100,
                            height: 50,
                            left: 25,
                            top: 20,
                            backgroundColor: 'green',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onMouseEnter={handleInit}
                        onMouseLeave={(event) => {
                            if (gameState === "playing" && event.relatedTarget?.id !== "trail") {
                                setGameState("lost");
                            }
                        }}
                    >
                        INICIO
                    </div>
                <div
                        style={{
                            position: 'absolute',
                            width: 20,
                            height: 80,
                            left: 13,
                            top: 20,
                            backgroundColor: 'blue'
                        }}
                        onMouseLeave={handleTrailLeave}
                        id="trail"
                />

                <div
                        style={{
                            position: 'absolute',
                            width: 200,
                            height: 20,
                            left: 13,
                            top: 100,
                            backgroundColor: 'blue'
                        }}
                        onMouseLeave={handleTrailLeave}
                        id="trail"
                />
                <div
                        style={{
                            position: 'absolute',
                            width: 20,
                            height: 230,
                            left: 200,
                            top: 100,
                            backgroundColor: 'blue'
                        }}
                        onMouseLeave={handleTrailLeave}
                        id="trail"
                />
                <div
                        style={{
                            position: 'absolute',
                            width: 400,
                            height: 20,
                            left: 200,
                            top: 330,
                            backgroundColor: 'blue'
                        }}
                        onMouseLeave={handleTrailLeave}
                        id="trail"
                />
                    <div
                        style={{
                            position: 'absolute',
                            width: 100,
                            height: 50,
                            right: 0,
                            bottom: 20,
                            backgroundColor: 'green',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onMouseEnter={handleFinishEnter}
                    >
                        FIM
                    </div>
                </div>

                <div>
                    {
                        gameState === "idle" && <p>Posicione o mouse sobre o botão "INICIO" para começar</p>
                    }
                    {
                        gameState === "playing" && <div>
                            <p>Que comece os jogos...</p>
                            <img style={imageStyle} src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdTVoaXM4MzRjc2s5endxa3R2dWZkNnB6YzVxem1wcjd0anRzN3UzbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xLlw6GHVfokaNW/giphy.gif" alt="Jogando" />
                        </div>
                    }
                    {
                        gameState === "lost" && <div>
                            <p>Tu né nada! PERDEU!</p>
                            <img style={imageStyle} src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjVsNTJjaWs5ODc3aTlheTQ1N3M5ajgxYW8yZmxvaDAxamRkMGptayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pJnsdD3Q8MVo86EKN8/giphy.gif" alt="Perdeu" />
                        </div>
                    }
                    {
                        gameState === "won" && <div>
                            <p>Parabéns man, venceu!</p>
                            <img style={imageStyle} src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnMya3ZtMnJmMDN0Z3M5azdnN2Y4bmZ5dGpwdndpM3p2bjZ1N285eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/eRP24XjBvKwqk/giphy.gif" alt="Venceu" />
                        </div>

                    }
                </div>
            </div>
        </>
    )
}

export default Home;


