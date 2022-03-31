import QuestionMark from '../images/question-mark.svg'

export const Header = (props) => (
    <div className="game-header">
        <div className="game-header_box left">
            <button className="icon-btn help" onClick={props.onClick}><img src={QuestionMark}/> </button>
        </div>
        <h2>Will's Wordle{/* status */}</h2>
        <div className="game-header_box right">
            <button className="icon-btn stats">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black"
                     className="bi bi-file-bar-graph-fill" viewBox="0 0 16 16">
                    <path
                        d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-2 11.5v-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-1z"/>
                </svg>
            </button>
            <button className="icon-btn about">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black"
                     className="bi bi-file-person-fill" viewBox="0 0 16 16">
                    <path
                        d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z"/>
                </svg>
            </button>
        </div>
    </div>
    )


