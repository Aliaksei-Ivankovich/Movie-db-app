import { Alert } from 'antd';

const ErrorMessage = () => {
    
    return (
        <Alert message="Error"
                description="Somthing went wrong"
                type="error"
                style={{width:'100%'}}/>
    )

}

export default ErrorMessage;