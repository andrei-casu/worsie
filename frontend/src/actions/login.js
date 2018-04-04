import * as types from '../constants/login';


export function startLogin(obj) {
  return dispatch => {

        
        dispatch({
          type: types.LOGIN_START
        });    


        console.log(obj);
        //here comes server call
        setTimeout(()=>{
                
            if (true){
                dispatch({
                    type: types.LOGIN_SUCCESS,
                    token: "45a6sdadasdad",
                    success: true
                });
            }
            else{
                dispatch({
                    type: types.LOGIN_FAILED,
                    success: false,
                    message: "Something went wrong! Please try again!"
                });  
            }
        }, 2000);
      };
}
