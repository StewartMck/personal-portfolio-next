type Props = {
    color: string;
    message: string;
}

export default function Message(props: Props) {
    const { color, message } = props;
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