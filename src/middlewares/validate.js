
//  validation of login form
import { toast } from "react-hot-toast";

export async function loginformValidate(values){
    const errors = emailVerify({},values) && passwordVerify({},values)
    return errors;
}

export async function signupformValidation(values){
    const errors = usernameVerify({}, values) && emailVerify({},values) && passwordVerify({},values);
    return errors;
}

export async function userProfileValidation(values){
    const error = {}
    if(!values.intro || values.intro.length < 10){
        error.intro = toast.error("Intro is required")
    }else if(!values.gender){
        error.gender = toast.error("Gender not selected!")
    }else if(!values.age){
        error.age = toast.error("Age is required!")
    }else if(!values.country){
        error.country = toast.error("Please add your country!")
    }else if(!values.city){
        error.city = toast.error("Please add your city!")
    }

    return error;
}

export async function userAboutValidation(values){
    const error = {}
    if(!values.isTechnical || !values.haveIdea){
        error.isTechnical = toast.error("Field not selected!")
    }else if(!values.accomplishments || values.accomplishments.length < 10){
        error.haveIdea = toast.error("Please fill the accomplishments field")
    }else if(!values.education || values.education.length < 10){
        error.education = toast.error("Please fill the education field")
    }else if(!values.responsibilities.length){
        error.responsibilities = toast.error("Responsibilities not selected")
    }else if(!values.interests.length){
        error.interests = toast.error("Interests not slected")
    }

    return error;
}


export async function cofounderPreferenceValidation(values){
    const error = {}
    if(!values.activelySeeking || !values.cofounderTechnical || !values.cofounderHasIdea || !values.locationPreference || !values.cofounderResponsibilities.length){
        error.message = toast.error("Please add all the fields")
    }
    return error
}


function emailVerify(error = {}, values){
    if(!values.email){
        error.email = toast.error("Email required...!");
    }
    return error;
}

function passwordVerify(error = {}, values){
    if(!values.password){
        error.password = toast.error("Password required...!")
    }else if(values.password.includes(" ")){
        error.password = toast.error("Invalid password...!")
    }else if(values.password.length < 6 ){
        error.password = toast.error("Password should contain atleast 6 characters ..!")
    }
    return error;
}

function usernameVerify(error = {}, values){
    if(!values.userName){
        error.userName = toast.error("Full name is required...!")
    }else if(values.userName.length < 3){
        error.userName = toast.error("Full name should contain atleast 3 characters..!")
    }

    return error;
}