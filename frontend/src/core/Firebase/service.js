import { app, provider} from '../../config/firebase';
import {
    createUserWithEmailAndPassword,
    getAuth,
    sendEmailVerification,
    signInWithEmailAndPassword,
    signInWithPopup
} from 'firebase/auth';

export const handleFirebaseRegister = async (email, password) => {
    const auth = getAuth(app);
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);

        if (!user.emailVerified) {
            await sendEmailVerification(user)
                .then(() => {
                    
                })
                .catch((error) => {
                    console.error("Error sending verification email:", error);
                });
        }
        return user;
    } catch (error) {
        return error;
    }
};

export const handleFirebaseLogin = async (email, password) => {
    const auth = getAuth(app);
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        if (user) {
            await user.reload();
        }
        if (!user.emailVerified) {
            showToastMessage("success","Please check your inbox to verify your email.");
            return;
        }
        return user;
    } catch (error) {
        const errorMessage = getFirebaseErrorMessage(error.code);
        showToastMessage("error",errorMessage);
        throw error;
    }
};

export const signInWithGoogle = async () => {
    const auth = getAuth(app);
    try{
        const { user } = await signInWithPopup(auth,provider);
        return user;
    }catch(e){
        const errorMessage = getFirebaseErrorMessage(e.code);
        showToastMessage("error",errorMessage);
    }
}