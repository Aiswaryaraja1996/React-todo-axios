import {useState} from 'react';

const TodoInput = ({submit}) =>{

    const [text,setText] = useState("");

    const handleChange = (e) =>{
        setText(e.target.value);
    }

    const handleSubmit = () =>{
        submit && submit(text);
        setText("");
    }

    return(
        <div>
            <input placeholder="Add Something.." onChange={handleChange}></input>
            <button onClick={handleSubmit}>ADD</button>
        </div>
    )
}

export default TodoInput;