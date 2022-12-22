const validation = (user) => {
    if(!user) return false;
    if(user.id == 1) return true;
    return false
}

export default validation;