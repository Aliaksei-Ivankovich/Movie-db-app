import { Component } from "react";

import { Alert } from 'antd';


class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)
        this.setState({
            error: true
        })
    }

    render() {
        const { error } = this.state
        if (error) {
            return <Alert  type='error'
                            showIcon 
                            message='Somthing went wrong...'
                            style={{'width': '100%'}}/>
        }
        return this.props.children
    }
}

export default ErrorBoundary