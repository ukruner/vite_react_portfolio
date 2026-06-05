
export default function CheckBox({ entry, isCheckedObject, setIsCheckedObject }) {
 
    
    function handleCheckBoxChange(event){
        {const stateName = event.target.id
        setIsCheckedObject(prevState =>  ({...prevState, [stateName]: !prevState[stateName]}))
    }
    }
    return (
        <div className="questionnaire-checkbox-card" key={entry.id}>
            <input
                type={entry.type}
                id={entry.id}
                data-testid={entry.id}
                name={entry.id}
                value={isCheckedObject[entry.id] ? 'Yes' : 'No'}
                onChange={(e) =>
                    handleCheckBoxChange(e)
                }
                checked={isCheckedObject[entry.id]}
            ></input>
            <label htmlFor={entry.id}>{entry.label}</label>
        </div>
    )
}
