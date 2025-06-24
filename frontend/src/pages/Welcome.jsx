import { handleFirebaseLogin } from "../core/Firebase/service"


export default function Welcome() {

    const login = () => {
        const user = handleFirebaseLogin();
    }
    return (
        <div>
            welcome
        </div>
    )
}
