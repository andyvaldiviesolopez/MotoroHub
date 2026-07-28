import Spinner from "react-bootstrap/Spinner";
import "../styles/loadingSpinner.css";

export default function LoadingSpinner({
    text = "Caricamento...",
    fullScreen = false,
    size = "md",
}) {

    return (
        <div
            className={`loading-container ${
                fullScreen ? "fullscreen" : ""
            }`}
        >
            <Spinner
                animation="border"
                variant="danger"
                size={size === "sm" ? "sm" : undefined}
            />

            {text && <p>{text}</p>}
        </div>
    );
}