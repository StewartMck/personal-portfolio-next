export default function Message(props){
    const {color, message} = props;
    return (
        <p
        style={{
        background: color,
        borderRadius: "0.5em",
        textAlign: 'center',
        paddingTop: "2px",
        height: "30px",
        fontWeight: "bold"
        }}> 
        {message}</p>
    )
}