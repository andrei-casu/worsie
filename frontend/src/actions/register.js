import * as types from '../constants/register';
import axios from 'axios';




const hostName="206.189.30.132:3000";
const apiLink = `http://${hostName}/register`;



export function startRegister(obj) {
    return dispatch => {
    
        dispatch({
          type: types.REGISTER_START
        });    


        axios.post(apiLink, obj)
            .then(function (response) {
               
               // console.log(response.data);
                if (response.data.success === true){
                dispatch({
                    type: types.REGISTER_SUCCESS,
                    success: true
                });
                }
                else{
                    dispatch({
                        type: types.REGISTER_FAILED,
                        success: false,
                        message: "failed because of"
                    });  
                }

            });
            // .catch(function (error) {
            //     console.log(error);
            // });
    };
}