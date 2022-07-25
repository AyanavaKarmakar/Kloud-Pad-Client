import AddNote from './AddNote.js';
import Notes from './Notes.js';

const Home = (props) => {

    const { handleSetAlert } = props;

    return (
        <div>
            <Notes handleSetAlert={handleSetAlert} />
        </div>
    )
}

export default Home