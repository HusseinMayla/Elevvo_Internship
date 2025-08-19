
user1={
    name:'support',
    email:'support@codesageamazon.nelify.app',
    password:'codeamazon2025',
}
user2={
    name:'jon',
    email:'jon@email.com',
    password:'12345678',
}
//data base users
users=[user1,user2];

function signUp(){
    const name=document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const cpassword = document.getElementById('signup-confirm-password').value;
    
    if(password==cpassword){
        alert('please confirm your password correctly')
        return //stop the function
    }
    // Simulate sign up
    for(i=0;i<users.length;i++){
        if(user[i].email==email){
            alert('user already exist');
            return
        }
    }
    if (name && email && password) {
        const user={
            name:name,
            email:email,
            password:password
        }
        users.push(user)
        //clear feilds
        email='';
        password='';
        alert("signed up successfully!")
        //UI login change pages
    }else{
        alert("PLease enter valid inputs")
    }
}
function logIn(){
    // const name=document.getElementById('login-name').value;
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Simulate login
    for(i=0;i<users.length;i++){
        if(user[i].email==email && user[i].password==password){
            alert('Welcome back ',user[i].name);
            email='';
            password='';
            // login login here

            break;
        }
    }
    alert('invalid email or password does not exist.')
}
console.log(users);

 // this compiles python to webassembly

let pyodideReady = false;
let pyodide;

async function loadPyodideEnv() {
    pyodide = await loadPyodide();
    pyodideReady = true;
}

loadPyodideEnv(); // preload

async function executeCode() {
    const code = document.getElementById('code-editor').textContent;
    const outputContainer = document.getElementById('output-container');
    outputContainer.innerHTML = '';

    if (!pyodideReady) {
        const div = document.createElement('div');
        div.className = 'output-line output-error';
        div.textContent = 'Pyodide is still loading...';
        outputContainer.appendChild(div);
        return;
    }

    try {
        // Redirect print() to output array
        let output = [];
        await pyodide.runPythonAsync(`
import sys
from js import console_output

class Capturer:
    def write(self, text):
        if text.strip():
            console_output(text)

    def flush(self):
        pass

sys.stdout = sys.stderr = Capturer()
        `);

        // Send output to JS
        globalThis.console_output = (text) => {
            const div = document.createElement('div');
            div.className = 'output-line';
            div.textContent = text;
            outputContainer.appendChild(div);
        };

        // Run the actual code
        await pyodide.runPythonAsync(code);

        // Success message
        const successDiv = document.createElement('div');
        successDiv.className = 'output-line output-success';
        successDiv.textContent = '✓ Program executed successfully';
        outputContainer.appendChild(successDiv);

    } catch (e) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'output-line output-error';
        errorDiv.textContent = 'Error: ' + e;
        outputContainer.appendChild(errorDiv);
    }
}
