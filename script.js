//SHA-256 HASH generator 

async function generateSHA256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const hashBuffer = await crypto.subtle.digest({ name:  "SHA-256"}, data);

    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const hashHex = hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

        return hashHex;
}

//SHA 256 UI

const hashInput = document.getElementById("hashInput");
const hashButton = document.getElementById("hashButton");
const hashOutput = document.getElementById("hashOutput");
const copyHash = document.getElementById("copyHash");

hashButton.addEventListener("click", async () => {
    const text = hashInput.value;

    if (text === "") {
        hashOutput.textContent = "Please enter some text.";
        return;
    }
    hashOutput.textContent = "Generating...";

    const hash = await generateSHA256(text);
    hashOutput.textContent = hash;
});

copyHash.addEventListener("click", async () => {
    const hash = hashOutput.textContent;

    if (
        hash === "Waiting for input..." ||
        hash === "Please enter some text." ||
        hash === "Generating..."
    ) {
        return;
    }
    await navigator.clipboard.writeText(hash);
    copyHash.textContent = "Copied";

    setTimeout(() => {
        copyHash.textContent = "copy";
    }, 1500);
})


//base 64 area
const base64Input = document.getElementById("base64Input");
const encodeBase64 = document.getElementById("encodeBase64");
const decodeBase64 = document.getElementById("decodeBase64");
const base64Output = document.getElementById("base64Output");
const copyBase64 = document.getElementById("copyBase64");

// encode
encodeBase64.addEventListener("click", () => {
    const text = base64Input.value;

    if (text === ""){
        base64Output.textContent = "Please enter some text";
        return;
    }
    const encode = btoa(text);
    base64Output.textContent = encode;
});

//DECODE

decodeBase64.addEventListener("click", () => {
    const encoded = base64Input.value;
    if (encoded === "") {
        base64Output.textContent = "Please enter some Base64 data.";
        return;
    }

    try {
        const decoded = atob(encoded);
        base64Output.textContent = decoded;
    } catch (error) {
        base64Output.textContent = "Invalid Base64 data";
    }
});

//base 64 copy

copyBase64.addEventListener("click", async () => {
    const result = base64Output.textContent;
    if (
        result === "Waiting for input..." ||
        result === "Please enter some text" ||
        result === "Please enter base 64 data" ||
        result === "Invalid base64 data."
    ) {
        return;
    }

    await navigator.clipboard.writeText(result);

    copyBase64.textContent = "COPIED";

    setTimeout(() => {
        copyBase64.textContent = "COPY";
    }, 1500);
})

// password security

// password security

const passwordInput = document.getElementById("passwordInput");
const checkPassword = document.getElementById("checkPassword");

const passwordStrength = document.getElementById("passwordStrength");
const passwordLength = document.getElementById("passwordLength");
const passwordCharacters = document.getElementById("passwordCharacters");
const breachStatus = document.getElementById("breachStatus");

checkPassword.addEventListener("click", async () => {

    const password = passwordInput.value;

    if (password === "") {
        passwordStrength.textContent = "Please enter a password.";
        passwordLength.textContent = "-";
        passwordCharacters.textContent = "-";
        breachStatus.textContent = "Not checked";
        return;
    }

    // length

    const length = password.length;
    passwordLength.textContent = length + " Characters";

    // character checks

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);

    let characterTypes = 0;

    if (hasUppercase) characterTypes++;
    if (hasLowercase) characterTypes++;
    if (hasNumber) characterTypes++;
    if (hasSymbol) characterTypes++;

    passwordCharacters.textContent =
        characterTypes + " / 4 character types";

    // strength

    let strength = "Very Weak";
    if (length >= 8 && characterTypes >= 2) {
        strength = "Weak";
    }
    if (length >= 10 && characterTypes >= 3) {
        strength = "Moderate";
    }
    if (length >= 12 && characterTypes >= 3) {
        strength = "Strong";
    }
    if (length >= 16 && characterTypes === 4) {
        strength = "Very Strong";
    }
    passwordStrength.textContent = strength;

    // breach check

    breachStatus.textContent = "Checking...";

    try {

        const breachCount = await checkPasswordBreach(password);

        if (breachCount > 0) {
            breachStatus.textContent =
                `FOUND - ${breachCount.toLocaleString()} times`;
        } else {
            breachStatus.textContent = "NOT FOUND";
        }
    } catch (error) {
        breachStatus.textContent =
            "Unable to check breach database.";
        console.error(error);
    }
});


// SHA-1 HASH

async function generateSHA1(text) {

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-1",
        data
    );
    const hashArray = Array.from(
        new Uint8Array(hashBuffer)
    );
    const hashHex = hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
    return hashHex.toUpperCase();
}


// PASSWORD BREACH CHECK

async function checkPasswordBreach(password) {

    const hash = await generateSHA1(password);
    const prefix = hash.substring(0, 5);
    const suffix = hash.substring(5);
    const response = await fetch(
        `https://api.pwnedpasswords.com/range/${prefix}`
    );

    if (!response.ok) {
        throw new Error("Breach API request failed.");
    }
    const data = await response.text();
    const lines = data.split("\r\n");
    for (const line of lines) {

        const [returnedSuffix, count] = line.split(":");

        if (returnedSuffix === suffix) {
            return Number(count);
        }
    }

    return 0;
}

// JWT Decoder

const jwtInput = document.getElementById("jwtInput");
const decodeJWT = document.getElementById("decodeJWT");

const jwtHeader = document.getElementById("jwtHeader");
const jwtPayload = document.getElementById("jwtPayload");
const jwtSignature = document.getElementById("jwtSignature");

decodeJWT.addEventListener("click", () => {
    const token = jwtInput.value.trim();

    if (token === "") {
        jwtHeader.textContent = "Please enter a JWT";
        jwtPayload.textContent = "-";
        jwtSignature.textContent = "-";
        return;
    }

    const parts = token.split(".");

    if (parts.length !== 3) {
        jwtHeader.textContent = "Invalid JWT.";
        jwtPayload.textContent = "-";
        jwtSignature.textContent = "-";
        return;
    }
    try {
        const header = JSON.parse(
            decodeBase64URL(parts[0])
        );
        const payload = JSON.parse(
            decodeBase64URL(parts[1])
        );

        jwtHeader.textContent = 
            JSON.stringify(header, null, 2);
        
        jwtPayload.textContent = 
            JSON.stringify(payload, null, 2);
        
        jwtSignature.textContent = parts[2];
    } catch (error) {
        jwtHeader.textContent = "invalid JWT data.";
        jwtPayload.textContent = "-";
        jwtSignature.textContent = "-";

        console.error(error);
    }
});

function decodeBase64URL(value) {
    value = value
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    while (value.length % 4 !== 0) {
        value += "=";
    }
    return atob(value);
}

