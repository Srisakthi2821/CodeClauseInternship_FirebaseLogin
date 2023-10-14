const firebaseConfig = {
    apiKey: "AIzaSyCGbxNAPjmyRfNO1wbbHPrRAqKqI1yeIIs",
    authDomain: "loginsystem-17e67.firebaseapp.com",
    projectId: "loginsystem-17e67",
    storageBucket: "loginsystem-17e67.appspot.com",
    messagingSenderId: "712897824848",
    appId: "1:712897824848:web:8d5db2cf4da3ff70e4e955"
};
firebase.initializeApp(firebaseConfig);
let first_container = document.getElementById("login_container");
let userName_txtx_html = document.getElementById("username");
let userEmail_txt_html = document.getElementById("userEmail");
let userContainer = document.getElementById("userContainer");
// Rest of your JavaScript code for Google and phone authentication
// ...


// Get references to the login buttons and phone authentication elements
const googleLoginBtn = document.getElementById("google-login");
const phoneAuthDiv = document.getElementById("phone-auth");
const phoneNumberInput = document.getElementById("phone-number");
const sendOtpBtn = document.getElementById("send-otp");
const verificationCodeInput = document.getElementById("verification-code");
const verifyOtpBtn = document.getElementById("verify-otp");

// Google Sign-In
googleLoginBtn.addEventListener("click", () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    signInWithPopup(provider);
});

function signInWithPopup(provider) {
    firebase.auth().signInWithPopup(provider)
        .then((result) => {
            // Handle successful Google login
            first_container.style.display = 'none';
            userContainer.style.display = "block";
            userName_txtx_html.textContent = result.user.displayName;
            userEmail_txt_html.textContent = result.user.email;
            console.log(result.user);
        })
        .catch((error) => {
            // Handle Google login errors
            console.error(error);
        });
}

// Phone Authentication
document.addEventListener("DOMContentLoaded", function() {
    const sendOtpBtn = document.getElementById("send-otp");
    sendOtpBtn.addEventListener("click", () => {
        const phoneNumber = phoneNumberInput.value;
        const appVerifier = new firebase.auth.RecaptchaVerifier('phone-auth');
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
            })
            .catch((error) => {
                console.error(error);
            });
    });

    // The rest of your code for Google authentication and other event listeners
});


verifyOtpBtn.addEventListener("click", () => {
    const verificationCode = verificationCodeInput.value;
    const confirmationResult = window.confirmationResult;
    confirmationResult.confirm(verificationCode)
        .then((result) => {
            // Handle successful phone verification
            console.log(result.user);
        })
        .catch((error) => {
            console.error(error);
        });
});