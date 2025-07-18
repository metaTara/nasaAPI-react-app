export default function Footer({ data, toggleModal }) {
    return (
        <footer>
            <div className="bgGradient"></div>
            <div>
        
        <h2>APOD project</h2>
        <h1>{data.title} </h1>
        </div>
        <button onClick={toggleModal}>  
            <i className="fa-solid fa-circle-info"></i>
            </button>
        </footer>
    );
    }