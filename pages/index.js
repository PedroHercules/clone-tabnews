import { useEffect, useState } from "react";

const imageStyle = {
  width: '100%',
  height: '250px',
  objectFit: 'cover', // ou 'contain'
  borderRadius: '12px',
};



function Home() {
    const [gameState, setGameState] = useState("idle");
    const [obstacles, setObstacles] = useState([
    { id: 1, top: 150, left: 280, direction: 1, speed: 4.5, minTop: 170, maxTop: 300 },
    { id: 2, top: 210, left: 370, direction: -1, speed: 5.5, minTop: 170, maxTop: 300 },
    { id: 3, top: 160, left: 430, direction: 1, speed: 7.5, minTop: 170, maxTop: 300 },
    ]);

    const handleInit = () => {
        setGameState("playing");
    }

    const handleTrailLeave = (event) => {
        if (gameState !== "playing") return;

        const nextElement = event.relatedTarget;

        if (!nextElement) return;

        const stillInTrail = nextElement?.closest(".trail");

        if (!stillInTrail) {
            setGameState("lost");
        }
    }

    const handleFinishEnter = () => {
        if (gameState === "playing") {
            setGameState("won");
        }
    }

    const handleLose = () => {
        if (gameState === "playing") {
            setGameState("lost");
        }
    }

    useEffect(() => {
        if (gameState !== "playing") return;

        const interval = setInterval(() => {
            setObstacles((prev) =>
            prev.map((obstacle) => {
                let nextTop = obstacle.top + obstacle.speed * obstacle.direction;
                let nextDirection = obstacle.direction;

                if (nextTop <= obstacle.minTop) {
                nextTop = obstacle.minTop;
                nextDirection = 1;
                }

                if (nextTop >= obstacle.maxTop) {
                nextTop = obstacle.maxTop;
                nextDirection = -1;
                }

                return {
                ...obstacle,
                top: nextTop,
                direction: nextDirection,
                };
            })
            );
        }, 16);

        return () => clearInterval(interval);
    }, [gameState]);
    
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
                 {obstacles.map((obstacle) => (
                    <div
                        key={obstacle.id}
                        style={{
                        position: 'absolute',
                        top: obstacle.top,
                        left: obstacle.left,
                        width: 10,
                        height: 70,
                        backgroundColor: 'red',
                        zIndex: 10,
                        }}
                        onMouseEnter={handleLose}
                    />
                    ))}

                   
                    <div
                        style={{
                            position: 'absolute',
                            width: 100,
                            height: 50,
                            left: 20,
                            top: 20,
                            backgroundColor: 'green',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onMouseEnter={handleInit}
                        onMouseLeave={(event) => {
                            if (gameState !== "playing") return;

                            const nextElement = event.relatedTarget;

                            if (!nextElement) return;

                            const wentToTrail = nextElement?.closest(".trail");

                            if (!wentToTrail) {
                                setGameState("lost");
                            }
                        }}
                    >
                        INICIO
                    </div>
                <div
                        style={{
                            position: 'absolute',
                            width: 10,
                            height: 80,
                            left: 13,
                            top: 20,
                            backgroundColor: 'blue'
                        }}
                        onMouseLeave={handleTrailLeave}
                        className="trail"
                />

                <div
                        style={{
                            position: 'absolute',
                            width: 190,
                            height: 10,
                            left: 13,
                            top: 100,
                            backgroundColor: 'blue'
                        }}
                        onMouseLeave={handleTrailLeave}
                        className="trail"
                />
                <div
                        style={{
                            position: 'absolute',
                            width: 10,
                            height: 230,
                            left: 200,
                            top: 100,
                            backgroundColor: 'blue'
                        }}
                        onMouseLeave={handleTrailLeave}
                        className="trail"
                />
                <div
                        style={{
                            position: 'absolute',
                            width: 400,
                            height: 10,
                            left: 200,
                            top: 330,
                            backgroundColor: 'blue'
                        }}
                        onMouseLeave={handleTrailLeave}
                        className="trail"
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


