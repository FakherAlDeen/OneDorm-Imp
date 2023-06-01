export function ValidateEmpty(str,str2){
    if (str == '')
        return "- "+str2 + " cannot be empty!   ";
}
export function ValidateEmail(str){
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    if(!emailRegex.test(str)){
        return "Invalid email address";
    }
}
export function ValidatePassword(str){
    const passwordRegex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/);
    if(!passwordRegex.test(str)){
        return "Password must be at least 8 characters that contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
    }
}