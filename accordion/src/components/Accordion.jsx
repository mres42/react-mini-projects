import {useState} from 'react'
import data from './data';
import "./styles.css";


const Accordion = () => {

    const [selected, setSelected] = useState(null);
    const [multiSelectionEnabled, setMultiSelectionEnabled] = useState(false);
    const [multipleSelected, setMultipleSelected] = useState([]);

    const handleSingleSelection = (currentId) => {
        if (currentId === selected) {
            setSelected(null);
        console.log("if equal " + currentId);
            return;
        }
        setSelected(currentId);
        console.log(currentId);
    }

    const handleMultiSelection = (currentId) => {
        let copyMultiple = [...multipleSelected];
        const findIndexOfCurrentId = copyMultiple.indexOf(currentId);

        if (findIndexOfCurrentId === -1) {
            copyMultiple.push(currentId);
        } else {
            copyMultiple.splice(findIndexOfCurrentId, 1);
        }
        
        setMultipleSelected(copyMultiple);
    }


    return (
    <div className='wrapper'>
        <button onClick={() =>setMultiSelectionEnabled(!multiSelectionEnabled)}>
            Enable Multiselection
        </button>
        <span>Multiselection enabled: {multiSelectionEnabled.toString()}</span>
        <div className='accordion'>
            {
                data && data.length > 0 ?
                data.map((dataItem) => (
                    <div key={dataItem.id} className='item'>
                        <div onClick={
                                multiSelectionEnabled
                                ? () => handleMultiSelection(dataItem.id)
                                : () => handleSingleSelection(dataItem.id)
                            }
                            className='title'
                        >
                            <h3>{dataItem.question}</h3>
                            <span className='open'>+</span>
                        </div>
                        {
                            selected === dataItem.id || multipleSelected.indexOf(dataItem.id) !== -1 ?
                            <div className='content'>{dataItem.answer}</div>
                            : null
                        }
                    </div>
                ))
                : (<div>No data found.</div>
            )}
        </div>
    </div>
    );
}

export default Accordion;