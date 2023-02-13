import { Alert } from 'antd'

const ErrorMessage = (props) => {
  const { message } = props
  const description = 
  <div>
    <h2>Somthing went wrong...</h2>
    <h3>{message}</h3>
  </div>

  return (
    <Alert
      showIcon
      message="Error"
      description={description}
      type="error"
      style={{ width: '100%' }}
    />
  )
}

export default ErrorMessage
