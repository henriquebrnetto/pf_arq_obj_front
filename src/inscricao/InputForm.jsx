function InputForm({label, valor, setValor}) {

    return (
        <>
            {label} <br/> <input type='text' id='nome' value={valor} onChange={setValor}></input><br/>
        </>
    )

}

export default InputForm