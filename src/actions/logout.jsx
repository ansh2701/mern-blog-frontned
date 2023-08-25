import { redirect } from "react-router-dom";

export async function logoutAction(){
    try{
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST',
          });
    }catch(err){
        
    }
    
    return redirect('/')
}