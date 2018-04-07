import * as types from '../constants/register';
import axios from 'axios';


const apiLink = 'http://0.0.0.0:3000/register';

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