import ReactDOM from 'react-dom';

export const PortalHoc = (props) => {
    return (
        ReactDOM.createPortal(
            props.children,
            props.elementPlace
        )
    )
}