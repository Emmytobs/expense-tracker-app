const changeCaseOfName = async function (name) {
   try { 
        const lowerCase = name.toLocaleLowerCase();
        if(!name) {
            // The momemt you throw an error in a try block, javascript runs the catch block and passes the error as the parameter of the catch block
            throw new Error('Name must be entered')
        }
        const upperCase = name.toLocaleUpperCase()
        return upperCase;
    } catch(error) {
        return error;
    }
}


// console.log(changeCaseOfName(''));
