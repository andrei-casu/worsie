import * as types from '../constants/register';


export function startRegister(obj) {
  return dispatch => {

        

        dispatch({
          type: types.REGISTER_START
        });    


        console.log(obj);
        //here comes server call
        setTimeout(()=>{
                
            if (true){
                dispatch({
                    type: types.REGISTER_SUCCESS,
                    success: true
                });
            }
            else{
                dispatch({
                    type: types.REGISTER_FAILED,
                    success: false,
                    message: "failed"
                });  
            }
        }, 2000);
      };
}
