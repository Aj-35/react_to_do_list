const apiRequest = async (url='' , optionObj=null, errMsg=null) => {
    try{
        const response = fetch(url,optionObj)
        if(!response.ok) return Error("Please Reload the App")
    }
    catch(err){
        errMsg = err.Message
    }
    finally{
        return errMsg
    }
}

export default apiRequest